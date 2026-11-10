<?php
/**
 * Transbank Controller
 * Integración con WebPay Plus
 */

namespace App\Controllers;

use App\Response;
use App\Validator;
use App\Mailer;
use App\Models\Order;
use Transbank\Webpay\WebpayPlus\Transaction;
use Transbank\Webpay\Options;

class TransbankController
{
    private Order $orderModel;
    private array $config;

    public function __construct()
    {
        $this->orderModel = new Order();
        $this->config = require __DIR__ . '/../config/config.php';
        
        // Nota: La configuración de Transbank ahora se hace al instanciar Transaction
        // En SDK v5.x ya no existen los métodos estáticos configureForIntegration/configureForProduction
    }

    /**
     * Crear instancia de Transaction configurada según ambiente
     */
    private function createTransaction(): Transaction
    {
        if ($this->config['transbank']['environment'] === 'production') {
            // Producción: usar credenciales reales
            // SDK 4.0: Options($apiKey, $commerceCode, $integrationType)
            $options = new Options(
                trim($this->config['transbank']['api_key']),      // apiKey primero
                trim($this->config['transbank']['commerce_code']), // commerceCode segundo
                Options::ENVIRONMENT_PRODUCTION
            );
            return new Transaction($options);
        }
        
        // Integración: usar credenciales de prueba (sin options = integración por defecto)
        return new Transaction();
    }

    /**
     * POST /api/transbank/init - Iniciar transacción
     */
    public function init(): void
    {
        $data = json_decode(file_get_contents('php://input'), true) ?? [];
        
        $validator = new Validator($data);
        $validator
            ->required('orderId')
            ->validate();
        
        $order = $this->orderModel->findById($data['orderId']);
        
        if (!$order) {
            Response::notFound('Orden no encontrada');
        }
        
        if ($order['status'] !== 'PENDIENTE') {
            Response::error('Esta orden ya fue procesada');
        }
        
        try {
            $buyOrder = $order['order_number'];
            $sessionId = 'S-' . $order['id'];
            $amount = (int) $order['total'];
            $returnUrl = $this->config['app']['api_url'] . '/transbank/confirm';
            
            $transaction = $this->createTransaction();
            $response = $transaction->create($buyOrder, $sessionId, $amount, $returnUrl);
            
            // DEBUG LOGGING START (SUCCESS)
            $logFile = __DIR__ . '/../transbank_debug.txt';
            $debugData = [
                'timestamp' => date('Y-m-d H:i:s'),
                'status' => 'SUCCESS',
                'environment' => $this->config['transbank']['environment'],
                'request' => [
                    'url' => 'create',
                    'buyOrder' => $buyOrder,
                    'sessionId' => $sessionId,
                    'amount' => $amount,
                    'returnUrl' => $returnUrl
                ],
                'response' => [
                    'token' => $response->getToken(),
                    'url' => $response->getUrl()
                ]
            ];
            file_put_contents($logFile, print_r($debugData, true) . "\n\n", FILE_APPEND);
            // DEBUG LOGGING END
            
            // Guardar token en la orden
            $this->orderModel->update($order['id'], [
                'transaction_id' => $response->getToken()
            ]);
            
            Response::success([
                'token' => $response->getToken(),
                'url' => $response->getUrl()
            ]);
            
        } catch (\Exception $e) {
            // DEBUG LOGGING START (ERROR)
            $logFile = __DIR__ . '/../transbank_debug.txt';
            $debugData = [
                'timestamp' => date('Y-m-d H:i:s'),
                'status' => 'ERROR',
                'environment' => $this->config['transbank']['environment'],
                'request' => [
                    'buyOrder' => $buyOrder,
                    'sessionId' => $sessionId,
                    'amount' => $amount,
                    'returnUrl' => $returnUrl
                ],
                'error' => [
                    'class' => get_class($e),
                    'message' => $e->getMessage(),
                    'trace' => $e->getTraceAsString()
                ]
            ];
            
            if (method_exists($e, 'getTransbankError')) {
                $debugData['error']['transbank_details'] = $e->getTransbankError();
            }
             if (method_exists($e, 'getResponse')) {
                $debugData['error']['http_body'] = (string) $e->getResponse()->getBody();
            }

            file_put_contents($logFile, print_r($debugData, true) . "\n\n", FILE_APPEND);
            // DEBUG LOGGING END

            error_log('Transbank init error: ' . $e->getMessage());
            Response::serverError('Error al iniciar transacción con Transbank');
        }
    }

    /**
     * POST/GET /api/transbank/confirm - Confirmar transacción (return de Transbank)
     */
    public function confirm(): void
    {
        $logFile = __DIR__ . '/../transbank_debug.txt';
        
        // Log de entrada
        $entryLog = [
            'timestamp' => date('Y-m-d H:i:s'),
            'action' => 'CONFIRM_ENTRY',
            'method' => $_SERVER['REQUEST_METHOD'] ?? 'UNKNOWN',
            'POST' => $_POST,
            'GET' => $_GET
        ];
        file_put_contents($logFile, print_r($entryLog, true) . "\n\n", FILE_APPEND);
        
        // Obtener token del POST o GET
        $token = $_POST['token_ws'] ?? $_GET['token_ws'] ?? null;
        $tbkToken = $_POST['TBK_TOKEN'] ?? $_GET['TBK_TOKEN'] ?? null;
        $tbkOrdenCompra = $_POST['TBK_ORDEN_COMPRA'] ?? $_GET['TBK_ORDEN_COMPRA'] ?? null;
        $tbkIdSesion = $_POST['TBK_ID_SESION'] ?? $_GET['TBK_ID_SESION'] ?? null;
        
        $baseUrl = $this->config['app']['url'];
        
        // CASO ESPECIAL: Error en formulario de pago (producción)
        // Cuando llegan TODOS los parámetros juntos (token_ws + TBK_TOKEN + TBK_ID_SESION + TBK_ORDEN_COMPRA)
        // Esto ocurre cuando el usuario cierra el tab, lo recupera y hace clic en "intentar nuevamente"
        // NO se debe llamar a commit() en este caso
        if ($token && $tbkToken) {
            $errorFormLog = [
                'timestamp' => date('Y-m-d H:i:s'),
                'action' => 'PAYMENT_FORM_ERROR_RECOVERY',
                'description' => 'Error en formulario de pago. Usuario intentó recuperar sesión. NO se llama a commit().',
                'token_ws' => $token,
                'TBK_TOKEN' => $tbkToken,
                'TBK_ORDEN_COMPRA' => $tbkOrdenCompra,
                'TBK_ID_SESION' => $tbkIdSesion
            ];
            file_put_contents($logFile, print_r($errorFormLog, true) . "\n\n", FILE_APPEND);
            
            // Buscar la orden y marcarla como error
            $order = $this->orderModel->findByTransactionId($token) 
                  ?? $this->orderModel->findByTransactionId($tbkToken);
            
            if (!$order && $tbkOrdenCompra) {
                $order = $this->orderModel->findByNumber($tbkOrdenCompra);
            }
            
            if ($order && $order['status'] === 'PENDIENTE') {
                $this->orderModel->update($order['id'], ['status' => 'ERROR']);
                file_put_contents($logFile, print_r(['ORDER_MARKED_ERROR' => $order['id']], true) . "\n\n", FILE_APPEND);
            }
            
            Response::redirect("{$baseUrl}/confirmacion?status=error&reason=form_error");
        }
        // CASO: Usuario canceló manualmente (TBK_TOKEN presente)
        // NO se debe llamar a commit()
        if ($tbkToken && !$token) {
            $cancelLog = [
                'timestamp' => date('Y-m-d H:i:s'),
                'action' => 'USER_CANCELLED_TRANSACTION',
                'description' => 'El usuario hizo clic en "Anular compra y volver al comercio". NO se llama a commit().',
                'TBK_TOKEN' => $tbkToken,
                'TBK_ORDEN_COMPRA' => $tbkOrdenCompra,
                'TBK_ID_SESION' => $tbkIdSesion
            ];
            file_put_contents($logFile, print_r($cancelLog, true) . "\n\n", FILE_APPEND);
            
            $order = $this->orderModel->findByTransactionId($tbkToken);
            
            if (!$order && $tbkOrdenCompra) {
                $order = $this->orderModel->findByNumber($tbkOrdenCompra);
            }
            
            // Solo se cancela una orden que sigue PENDIENTE: un TBK_TOKEN tardío
            // (pestaña de Webpay recuperada y anulada) no puede reescribir una
            // orden ya PAGADA, cuyo cargo existe y cuyo pedido está en curso.
            if ($order && $order['status'] === 'PENDIENTE') {
                $this->orderModel->update($order['id'], ['status' => 'CANCELADO']);
                file_put_contents($logFile, print_r(['CANCELLED_ORDER' => ['order_id' => $order['id'], 'order_number' => $order['order_number']]], true) . "\n\n", FILE_APPEND);
            } elseif ($order) {
                file_put_contents($logFile, print_r(['CANCEL_IGNORADO' => ['order_id' => $order['id'], 'status' => $order['status']]], true) . "\n\n", FILE_APPEND);
            }
            
            Response::redirect("{$baseUrl}/confirmacion?status=cancelled&reason=user_cancelled");
        }
        
        // CASO: Timeout (el usuario no hizo nada por más de 5 minutos)
        // Solo llegan TBK_ID_SESION y TBK_ORDEN_COMPRA, NO llega ningún token
        // NO se debe llamar a commit()
        if (!$token && !$tbkToken && $tbkOrdenCompra && $tbkIdSesion) {
            $timeoutLog = [
                'timestamp' => date('Y-m-d H:i:s'),
                'action' => 'TRANSACTION_TIMEOUT',
                'description' => 'El usuario estuvo inactivo más de 5 minutos en el formulario de pago. NO se llama a commit().',
                'TBK_ORDEN_COMPRA' => $tbkOrdenCompra,
                'TBK_ID_SESION' => $tbkIdSesion
            ];
            file_put_contents($logFile, print_r($timeoutLog, true) . "\n\n", FILE_APPEND);
            
            $order = $this->orderModel->findByNumber($tbkOrdenCompra);
            
            if ($order && $order['status'] === 'PENDIENTE') {
                $this->orderModel->update($order['id'], ['status' => 'TIMEOUT']);
                file_put_contents($logFile, print_r(['TIMEOUT_ORDER' => ['order_id' => $order['id'], 'order_number' => $order['order_number']]], true) . "\n\n", FILE_APPEND);
            } elseif ($order) {
                file_put_contents($logFile, print_r(['TIMEOUT_IGNORADO' => ['order_id' => $order['id'], 'status' => $order['status']]], true) . "\n\n", FILE_APPEND);
            }
            
            Response::redirect("{$baseUrl}/confirmacion?status=cancelled&reason=timeout");
        }
        
        if (!$token) {
            $noTokenLog = ['timestamp' => date('Y-m-d H:i:s'), 'action' => 'CONFIRM_NO_TOKEN'];
            file_put_contents($logFile, print_r($noTokenLog, true) . "\n\n", FILE_APPEND);
            Response::redirect("{$baseUrl}/confirmacion?status=error&reason=no_token");
        }
        
        try {
            $transaction = $this->createTransaction();
            
            $commitLog = ['timestamp' => date('Y-m-d H:i:s'), 'action' => 'COMMIT_START', 'token' => $token];
            file_put_contents($logFile, print_r($commitLog, true) . "\n\n", FILE_APPEND);
            
            $response = $transaction->commit($token);
            
            // Log completo del commit response
            $commitResponseLog = [
                'timestamp' => date('Y-m-d H:i:s'),
                'action' => 'COMMIT_RESPONSE',
                'environment' => $this->config['transbank']['environment'],
                'response_code' => $response->getResponseCode(),
                'status' => $response->getStatus(),
                'amount' => $response->getAmount(),
                'buy_order' => $response->getBuyOrder(),
                'session_id' => $response->getSessionId(),
                'authorization_code' => $response->getAuthorizationCode(),
                'payment_type_code' => $response->getPaymentTypeCode(),
                'installments_number' => $response->getInstallmentsNumber(),
                'card_detail' => $response->getCardDetail(),
                'transaction_date' => $response->getTransactionDate(),
                'accounting_date' => $response->getAccountingDate()
            ];
            file_put_contents($logFile, print_r($commitResponseLog, true) . "\n\n", FILE_APPEND);
            
            $order = $this->orderModel->findByTransactionId($token);
            
            if (!$order) {
                $notFoundLog = ['timestamp' => date('Y-m-d H:i:s'), 'action' => 'ORDER_NOT_FOUND', 'token' => $token];
                file_put_contents($logFile, print_r($notFoundLog, true) . "\n\n", FILE_APPEND);
                Response::redirect("{$baseUrl}/confirmacion?status=error&reason=order_not_found");
            }
            
            // response_code 0 = aprobada
            if ($response->getResponseCode() === 0) {
                $successLog = [
                    'timestamp' => date('Y-m-d H:i:s'),
                    'action' => 'PAYMENT_APPROVED',
                    'order_id' => $order['id'],
                    'order_number' => $order['order_number'],
                    'amount' => $order['total'],
                    'authorization_code' => $response->getAuthorizationCode()
                ];
                file_put_contents($logFile, print_r($successLog, true) . "\n\n", FILE_APPEND);
                
                $updatedOrder = $this->orderModel->update($order['id'], [
                    'status' => 'PAGADO',
                    'paid_at' => date('Y-m-d H:i:s'),
                    'authorization_code' => $response->getAuthorizationCode(),
                    'card_number' => $response->getCardDetail()['card_number'] ?? null
                ]);
                
                // Enviar emails
                if ($updatedOrder) {
                    try {
                        Mailer::sendOrderEmails($updatedOrder);
                        $emailLog = ['timestamp' => date('Y-m-d H:i:s'), 'action' => 'EMAIL_SENT', 'order_id' => $order['id']];
                        file_put_contents($logFile, print_r($emailLog, true) . "\n\n", FILE_APPEND);
                    } catch (\Exception $e) {
                        $emailErrorLog = ['timestamp' => date('Y-m-d H:i:s'), 'action' => 'EMAIL_ERROR', 'error' => $e->getMessage()];
                        file_put_contents($logFile, print_r($emailErrorLog, true) . "\n\n", FILE_APPEND);
                        error_log('Error enviando emails: ' . $e->getMessage());
                    }
                }

                // Gift Card: si la orden tiene una giftcard pendiente, enviarla ahora (pago confirmado)
                $gcFile = __DIR__ . '/../storage/giftcards/' . $order['id'] . '.json';
                if (file_exists($gcFile)) {
                    try {
                        $gift = json_decode(file_get_contents($gcFile), true);
                        if (is_array($gift)) {
                            $gift['modo'] = 'pagada';
                            usleep(1500000);
                            Mailer::sendGiftCardNotification($gift);
                            usleep(1500000);
                            Mailer::sendGiftCardConfirmation($gift);
                            $gcLog = ['timestamp' => date('Y-m-d H:i:s'), 'action' => 'GIFTCARD_SENT', 'order_id' => $order['id'], 'codigo' => $gift['codigo'] ?? ''];
                            file_put_contents($logFile, print_r($gcLog, true) . "\n\n", FILE_APPEND);
                        }
                        @rename($gcFile, $gcFile . '.sent');
                    } catch (\Exception $e) {
                        error_log('Error enviando Gift Card: ' . $e->getMessage());
                    }
                }
                
                Response::redirect("{$baseUrl}/confirmacion?order={$order['id']}&status=success");
            } else {
                $rejectedLog = [
                    'timestamp' => date('Y-m-d H:i:s'),
                    'action' => 'PAYMENT_REJECTED',
                    'order_id' => $order['id'],
                    'response_code' => $response->getResponseCode()
                ];
                file_put_contents($logFile, print_r($rejectedLog, true) . "\n\n", FILE_APPEND);
                
                $this->orderModel->update($order['id'], ['status' => 'CANCELADO']);
                Response::redirect("{$baseUrl}/confirmacion?order={$order['id']}&status=rejected&code=" . $response->getResponseCode());
            }
            
        } catch (\Exception $e) {
            $errorLog = [
                'timestamp' => date('Y-m-d H:i:s'),
                'action' => 'CONFIRM_ERROR',
                'error_class' => get_class($e),
                'error_message' => $e->getMessage(),
                'trace' => $e->getTraceAsString()
            ];
            file_put_contents($logFile, print_r($errorLog, true) . "\n\n", FILE_APPEND);
            
            error_log('Transbank confirm error: ' . $e->getMessage());
            Response::redirect("{$baseUrl}/confirmacion?status=error&reason=server_error");
        }
    }

    /**
     * GET /api/transbank/status/{token} - Verificar estado de transacción
     */
    public function status(string $token): void
    {
        try {
            $transaction = $this->createTransaction();
            $response = $transaction->status($token);
            
            Response::success([
                'status' => $response->getStatus(),
                'response_code' => $response->getResponseCode(),
                'amount' => $response->getAmount(),
                'authorization_code' => $response->getAuthorizationCode()
            ]);
            
        } catch (\Exception $e) {
            Response::error('Error al consultar estado: ' . $e->getMessage());
        }
    }
}

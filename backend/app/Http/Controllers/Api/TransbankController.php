<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Order;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Log;
use Transbank\Webpay\WebpayPlus\Transaction;
use Transbank\Webpay\Options;

class TransbankController extends Controller
{
    private function createTransaction(): Transaction
    {
        $env = config('transbank.environment', 'production');

        if ($env === 'production') {
            $options = new Options(
                trim(config('transbank.api_key')),
                trim(config('transbank.commerce_code')),
                Options::ENVIRONMENT_PRODUCTION
            );
            return new Transaction($options);
        }

        return new Transaction();
    }

    public function init(Request $request)
    {
        $validator = validator($request->all(), [
            'orderId' => 'required|string',
        ]);

        if ($validator->fails()) {
            return response()->json([
                'success' => false,
                'message' => 'Error de validación',
                'errors' => $validator->errors(),
            ], 422);
        }

        $order = Order::with('items')->find($request->orderId);

        if (!$order) {
            return response()->json([
                'success' => false,
                'message' => 'Orden no encontrada',
            ], 404);
        }

        if ($order->status->value !== 'PENDIENTE') {
            return response()->json([
                'success' => false,
                'message' => 'Esta orden ya fue procesada',
            ], 400);
        }

        try {
            $buyOrder = $order->order_number;
            $sessionId = 'S-' . $order->id;
            $amount = (int) $order->total;
            $returnUrl = config('transbank.return_url');

            $transaction = $this->createTransaction();
            $response = $transaction->create($buyOrder, $sessionId, $amount, $returnUrl);

            Log::channel('transbank')->debug('Init success', [
                'order_id' => $order->id,
                'token' => $response->getToken(),
            ]);

            $order->transaction_id = $response->getToken();
            $order->save();

            return response()->json([
                'success' => true,
                'data' => [
                    'token' => $response->getToken(),
                    'url' => $response->getUrl(),
                ],
                'message' => 'Transacción iniciada',
            ]);
        } catch (\Exception $e) {
            Log::channel('transbank')->error('Init error', [
                'order_id' => $order->id,
                'error' => $e->getMessage(),
                'trace' => $e->getTraceAsString(),
            ]);

            return response()->json([
                'success' => false,
                'message' => 'Error al iniciar transacción con Transbank',
            ], 500);
        }
    }

    public function confirm(Request $request)
    {
        $logFile = storage_path('logs/transbank_debug.txt');

        $entryLog = [
            'timestamp' => now()->toDateTimeString(),
            'action' => 'CONFIRM_ENTRY',
            'method' => $request->method(),
            'all' => $request->all(),
        ];
        file_put_contents($logFile, print_r($entryLog, true) . "\n\n", FILE_APPEND);

        $token = $request->input('token_ws') ?? $request->input('token_ws');
        $tbkToken = $request->input('TBK_TOKEN');
        $tbkOrdenCompra = $request->input('TBK_ORDEN_COMPRA');
        $tbkIdSesion = $request->input('TBK_ID_SESION');

        $baseUrl = config('app.frontend_url', 'https://cialo.cl');

        // CASO ESPECIAL: Error en formulario de pago (producción)
        if ($token && $tbkToken) {
            $errorFormLog = [
                'timestamp' => now()->toDateTimeString(),
                'action' => 'PAYMENT_FORM_ERROR_RECOVERY',
                'description' => 'Error en formulario de pago. Usuario intentó recuperar sesión. NO se llama a commit().',
            ];
            file_put_contents($logFile, print_r($errorFormLog, true) . "\n\n", FILE_APPEND);

            $order = Order::where('transaction_id', $token)
                ->orWhere('transaction_id', $tbkToken)
                ->first();

            if (!$order && $tbkOrdenCompra) {
                $order = Order::where('order_number', $tbkOrdenCompra)->first();
            }

            if ($order && $order->status->value === 'PENDIENTE') {
                $order->status = 'ERROR';
                $order->save();
            }

            return redirect("{$baseUrl}/confirmacion?status=error&reason=form_error");
        }

        // CASO: Usuario canceló manualmente
        if ($tbkToken && !$token) {
            $cancelLog = [
                'timestamp' => now()->toDateTimeString(),
                'action' => 'USER_CANCELLED_TRANSACTION',
                'description' => 'El usuario hizo clic en "Anular compra y volver al comercio". NO se llama a commit().',
            ];
            file_put_contents($logFile, print_r($cancelLog, true) . "\n\n", FILE_APPEND);

            $order = Order::where('transaction_id', $tbkToken)->first();

            if (!$order && $tbkOrdenCompra) {
                $order = Order::where('order_number', $tbkOrdenCompra)->first();
            }

            if ($order) {
                $order->status = 'CANCELADO';
                $order->save();
            }

            return redirect("{$baseUrl}/confirmacion?status=cancelled&reason=user_cancelled");
        }

        // CASO: Timeout
        if (!$token && !$tbkToken && $tbkOrdenCompra && $tbkIdSesion) {
            $timeoutLog = [
                'timestamp' => now()->toDateTimeString(),
                'action' => 'TRANSACTION_TIMEOUT',
                'description' => 'El usuario estuvo inactivo más de 5 minutos en el formulario de pago. NO se llama a commit().',
            ];
            file_put_contents($logFile, print_r($timeoutLog, true) . "\n\n", FILE_APPEND);

            $order = Order::where('order_number', $tbkOrdenCompra)->first();

            if ($order) {
                $order->status = 'TIMEOUT';
                $order->save();
            }

            return redirect("{$baseUrl}/confirmacion?status=cancelled&reason=timeout");
        }

        if (!$token) {
            file_put_contents($logFile, print_r(['timestamp' => now()->toDateTimeString(), 'action' => 'CONFIRM_NO_TOKEN'], true) . "\n\n", FILE_APPEND);
            return redirect("{$baseUrl}/confirmacion?status=error&reason=no_token");
        }

        try {
            $transaction = $this->createTransaction();

            $commitLog = ['timestamp' => now()->toDateTimeString(), 'action' => 'COMMIT_START', 'token' => $token];
            file_put_contents($logFile, print_r($commitLog, true) . "\n\n", FILE_APPEND);

            $response = $transaction->commit($token);

            $commitResponseLog = [
                'timestamp' => now()->toDateTimeString(),
                'action' => 'COMMIT_RESPONSE',
                'response_code' => $response->getResponseCode(),
                'status' => $response->getStatus(),
                'amount' => $response->getAmount(),
                'buy_order' => $response->getBuyOrder(),
                'authorization_code' => $response->getAuthorizationCode(),
            ];
            file_put_contents($logFile, print_r($commitResponseLog, true) . "\n\n", FILE_APPEND);

            $order = Order::where('transaction_id', $token)->first();

            if (!$order) {
                file_put_contents($logFile, print_r(['timestamp' => now()->toDateTimeString(), 'action' => 'ORDER_NOT_FOUND', 'token' => $token], true) . "\n\n", FILE_APPEND);
                return redirect("{$baseUrl}/confirmacion?status=error&reason=order_not_found");
            }

            if ($response->getResponseCode() === 0) {
                $order->status = 'PAGADO';
                $order->paid_at = now();
                $order->authorization_code = $response->getAuthorizationCode();
                $cardDetail = $response->getCardDetail();
                $order->card_number = $cardDetail['card_number'] ?? null;
                $order->save();

                file_put_contents($logFile, print_r([
                    'timestamp' => now()->toDateTimeString(),
                    'action' => 'PAYMENT_APPROVED',
                    'order_id' => $order->id,
                ], true) . "\n\n", FILE_APPEND);

                // Enviar emails
                try {
                    \Mail::send('emails.order-confirmation', ['order' => $order], function ($m) use ($order) {
                        $m->to($order->customer_email)
                            ->from(config('mail.from.address'), config('mail.from.name'))
                            ->subject('Confirmación de compra - ' . $order->order_number);
                    });
                } catch (\Exception $e) {
                    Log::error('Error enviando email de confirmación: ' . $e->getMessage());
                }

                return redirect("{$baseUrl}/confirmacion?order={$order->id}&status=success");
            } else {
                $order->status = 'CANCELADO';
                $order->save();

                file_put_contents($logFile, print_r([
                    'timestamp' => now()->toDateTimeString(),
                    'action' => 'PAYMENT_REJECTED',
                    'order_id' => $order->id,
                    'response_code' => $response->getResponseCode(),
                ], true) . "\n\n", FILE_APPEND);

                return redirect("{$baseUrl}/confirmacion?order={$order->id}&status=rejected&code=" . $response->getResponseCode());
            }
        } catch (\Exception $e) {
            $errorLog = [
                'timestamp' => now()->toDateTimeString(),
                'action' => 'CONFIRM_ERROR',
                'error_message' => $e->getMessage(),
                'trace' => $e->getTraceAsString(),
            ];
            file_put_contents($logFile, print_r($errorLog, true) . "\n\n", FILE_APPEND);

            return redirect("{$baseUrl}/confirmacion?status=error&reason=server_error");
        }
    }

    public function status($token)
    {
        try {
            $transaction = $this->createTransaction();
            $response = $transaction->status($token);

            return response()->json([
                'success' => true,
                'data' => [
                    'status' => $response->getStatus(),
                    'response_code' => $response->getResponseCode(),
                    'amount' => $response->getAmount(),
                    'authorization_code' => $response->getAuthorizationCode(),
                ],
                'message' => 'Estado obtenido',
            ]);
        } catch (\Exception $e) {
            return response()->json([
                'success' => false,
                'message' => 'Error al consultar estado: ' . $e->getMessage(),
            ], 500);
        }
    }
}

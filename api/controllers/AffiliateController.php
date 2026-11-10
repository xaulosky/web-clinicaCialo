<?php
/**
 * Affiliate Controller - API para gestión de afiliados
 */

namespace App\Controllers;

use App\Models\Affiliate;
use App\Models\Coupon;

class AffiliateController
{
    private Affiliate $affiliate;
    private Coupon $coupon;

    public function __construct()
    {
        $this->affiliate = new Affiliate();
        $this->coupon = new Coupon();
    }

    /**
     * Listar todos los afiliados (Admin)
     * GET /affiliates
     */
    public function index(): void
    {
        try {
            $includeInactive = isset($_GET['all']) && $_GET['all'] === 'true';
            $affiliates = $this->affiliate->getAll($includeInactive);
            
            $this->json(['success' => true, 'data' => $affiliates]);
        } catch (\Exception $e) {
            $this->json(['error' => $e->getMessage()], 500);
        }
    }

    /**
     * Crear afiliado
     * POST /affiliates
     */
    public function create(): void
    {
        try {
            $data = $this->getJsonInput();

            // Validaciones
            if (empty($data['nombre'])) {
                $this->json(['error' => 'El nombre es requerido'], 400);
                return;
            }
            if (empty($data['email'])) {
                $this->json(['error' => 'El email es requerido'], 400);
                return;
            }

            $affiliate = $this->affiliate->create($data);
            
            $this->json([
                'success' => true, 
                'data' => $affiliate,
                'message' => 'Afiliado creado exitosamente. Código: ' . $affiliate['codigo_afiliado']
            ], 201);
        } catch (\Exception $e) {
            $this->json(['error' => $e->getMessage()], 500);
        }
    }

    /**
     * Obtener afiliado por ID
     * GET /affiliates/:id
     */
    public function show(string $id): void
    {
        try {
            $affiliate = $this->affiliate->findById($id);
            
            if (!$affiliate) {
                $this->json(['error' => 'Afiliado no encontrado'], 404);
                return;
            }

            // Agregar resumen de comisiones
            $affiliate['comisiones_resumen'] = $this->affiliate->getCommissionsSummary($id);
            $affiliate['stats_mes'] = $this->affiliate->getMonthlyStats($id);

            $this->json(['success' => true, 'data' => $affiliate]);
        } catch (\Exception $e) {
            $this->json(['error' => $e->getMessage()], 500);
        }
    }

    /**
     * Obtener perfil de afiliado por user_id (para el propio afiliado)
     * GET /affiliates/me
     */
    public function me(): void
    {
        try {
            // Obtener user_id del token
            $userId = $this->getAuthUserId();
            
            if (!$userId) {
                $this->json(['error' => 'No autorizado'], 401);
                return;
            }

            $affiliate = $this->affiliate->findByUserId($userId);
            
            if (!$affiliate) {
                $this->json(['error' => 'No eres un afiliado registrado'], 404);
                return;
            }

            $affiliate['comisiones_resumen'] = $this->affiliate->getCommissionsSummary($affiliate['id']);
            $affiliate['stats_mes'] = $this->affiliate->getMonthlyStats($affiliate['id']);

            $this->json(['success' => true, 'data' => $affiliate]);
        } catch (\Exception $e) {
            $this->json(['error' => $e->getMessage()], 500);
        }
    }

    /**
     * Actualizar afiliado
     * PUT /affiliates/:id
     */
    public function update(string $id): void
    {
        try {
            $data = $this->getJsonInput();
            
            $affiliate = $this->affiliate->update($id, $data);
            
            if (!$affiliate) {
                $this->json(['error' => 'Afiliado no encontrado'], 404);
                return;
            }

            $this->json(['success' => true, 'data' => $affiliate]);
        } catch (\Exception $e) {
            $this->json(['error' => $e->getMessage()], 500);
        }
    }

    /**
     * Obtener comisiones de un afiliado
     * GET /affiliates/:id/commissions
     */
    public function commissions(string $id): void
    {
        try {
            $estado = $_GET['estado'] ?? null;
            $commissions = $this->affiliate->getCommissions($id, $estado);
            
            $this->json(['success' => true, 'data' => $commissions]);
        } catch (\Exception $e) {
            $this->json(['error' => $e->getMessage()], 500);
        }
    }

    /**
     * Mis comisiones (para el afiliado logueado)
     * GET /affiliates/me/commissions
     */
    public function myCommissions(): void
    {
        try {
            $userId = $this->getAuthUserId();
            
            if (!$userId) {
                $this->json(['error' => 'No autorizado'], 401);
                return;
            }

            $affiliate = $this->affiliate->findByUserId($userId);
            
            if (!$affiliate) {
                $this->json(['error' => 'No eres un afiliado registrado'], 404);
                return;
            }

            $estado = $_GET['estado'] ?? null;
            $commissions = $this->affiliate->getCommissions($affiliate['id'], $estado);
            
            $this->json(['success' => true, 'data' => $commissions]);
        } catch (\Exception $e) {
            $this->json(['error' => $e->getMessage()], 500);
        }
    }

    /**
     * Aprobar comisiones (Admin)
     * POST /affiliates/commissions/approve
     */
    public function approveCommissions(): void
    {
        try {
            $data = $this->getJsonInput();
            
            if (empty($data['commission_ids'])) {
                $this->json(['error' => 'Seleccione las comisiones a aprobar'], 400);
                return;
            }

            $this->affiliate->approveCommissions($data['commission_ids']);
            
            $this->json([
                'success' => true, 
                'message' => count($data['commission_ids']) . ' comisiones aprobadas'
            ]);
        } catch (\Exception $e) {
            $this->json(['error' => $e->getMessage()], 500);
        }
    }

    /**
     * Pagar comisiones (Admin)
     * POST /affiliates/:id/pay
     */
    public function payCommissions(string $id): void
    {
        try {
            $data = $this->getJsonInput();
            
            if (empty($data['commission_ids'])) {
                $this->json(['error' => 'Seleccione las comisiones a pagar'], 400);
                return;
            }

            $result = $this->affiliate->payCommissions($id, $data['commission_ids']);
            
            if (isset($result['error'])) {
                $this->json(['error' => $result['error']], 400);
                return;
            }

            $this->json(['success' => true, 'data' => $result]);
        } catch (\Exception $e) {
            $this->json(['error' => $e->getMessage()], 500);
        }
    }

    /**
     * Crear cupón adicional para afiliado
     * POST /affiliates/:id/coupons
     */
    public function createCoupon(string $id): void
    {
        try {
            $data = $this->getJsonInput();
            
            $affiliate = $this->affiliate->findById($id);
            if (!$affiliate) {
                $this->json(['error' => 'Afiliado no encontrado'], 404);
                return;
            }

            if (empty($data['code'])) {
                $this->json(['error' => 'El código del cupón es requerido'], 400);
                return;
            }

            $coupon = $this->coupon->createAffiliateCoupon(
                $id,
                $data['code'],
                $data['descuento'] ?? 10,
                $data['comision'] ?? $affiliate['comision_default']
            );

            $this->json(['success' => true, 'data' => $coupon], 201);
        } catch (\Exception $e) {
            $this->json(['error' => $e->getMessage()], 500);
        }
    }

    /**
     * Dashboard de afiliados (estadísticas generales para admin)
     * GET /affiliates/dashboard
     */
    public function dashboard(): void
    {
        try {
            $affiliates = $this->affiliate->getAll();
            
            $totalAfiliados = count($affiliates);
            $totalVentas = array_sum(array_column($affiliates, 'total_ventas'));
            $totalComisiones = array_sum(array_column($affiliates, 'total_comisiones'));
            $comisionesPendientes = array_sum(array_column($affiliates, 'comisiones_pendientes'));

            $this->json([
                'success' => true,
                'data' => [
                    'total_afiliados' => $totalAfiliados,
                    'total_ventas' => $totalVentas,
                    'total_comisiones' => $totalComisiones,
                    'comisiones_pendientes' => $comisionesPendientes,
                    'top_afiliados' => array_slice($affiliates, 0, 5)
                ]
            ]);
        } catch (\Exception $e) {
            $this->json(['error' => $e->getMessage()], 500);
        }
    }

    // Helpers
    private function json(array $data, int $code = 200): void
    {
        http_response_code($code);
        header('Content-Type: application/json');
        echo json_encode($data);
    }

    private function getJsonInput(): array
    {
        return json_decode(file_get_contents('php://input'), true) ?? [];
    }

    private function getAuthUserId(): ?string
    {
        // Obtener token del header
        $headers = getallheaders();
        $auth = $headers['Authorization'] ?? '';
        
        if (!preg_match('/Bearer\s+(.*)$/i', $auth, $matches)) {
            return null;
        }

        $token = $matches[1];
        
        // Decodificar JWT (simplificado - usa tu método actual)
        $parts = explode('.', $token);
        if (count($parts) !== 3) {
            return null;
        }

        $payload = json_decode(base64_decode($parts[1]), true);
        return $payload['sub'] ?? null;
    }
}

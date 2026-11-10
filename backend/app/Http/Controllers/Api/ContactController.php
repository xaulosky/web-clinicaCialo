<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Mail;
use Illuminate\Support\Facades\Validator;

class ContactController extends Controller
{
    public function submit(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'name' => 'required|string',
            'email' => 'required|email',
            'message' => 'required|string',
            'phone' => 'nullable|string',
            'subject' => 'nullable|string',
        ]);

        if ($validator->fails()) {
            return response()->json([
                'success' => false,
                'message' => 'Error de validación',
                'errors' => $validator->errors(),
            ], 422);
        }

        $contactData = [
            'name' => htmlspecialchars($request->name),
            'email' => $request->email,
            'phone' => htmlspecialchars($request->phone ?? 'No proporcionado'),
            'subject' => htmlspecialchars($request->subject ?? 'Consulta General'),
            'message' => htmlspecialchars($request->message),
            'date' => now()->format('d/m/Y H:i'),
        ];

        try {
            // Enviar notificación a la clínica
            Mail::send('emails.contact-notification', $contactData, function ($m) use ($contactData) {
                $m->to(config('mail.clinic_email', 'contacto@cialo.cl'))
                    ->from(config('mail.from.address'), config('mail.from.name'))
                    ->subject('Nuevo mensaje de contacto: ' . $contactData['subject']);
            });

            // Enviar confirmación al usuario
            Mail::send('emails.contact-confirmation', $contactData, function ($m) use ($contactData) {
                $m->to($contactData['email'])
                    ->from(config('mail.from.address'), config('mail.from.name'))
                    ->subject('Hemos recibido tu mensaje - Clínica Cialo');
            });

            return response()->json([
                'success' => true,
                'data' => null,
                'message' => 'Tu mensaje ha sido enviado correctamente. Te contactaremos pronto.',
            ]);
        } catch (\Exception $e) {
            report($e);
            return response()->json([
                'success' => false,
                'message' => 'Error al enviar el mensaje. Por favor, intenta nuevamente.',
            ], 500);
        }
    }
}

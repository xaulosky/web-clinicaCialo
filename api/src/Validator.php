<?php
/**
 * Input Validator
 */

namespace App;

class Validator
{
    private array $errors = [];
    private array $data;

    public function __construct(array $data)
    {
        $this->data = $data;
    }

    /**
     * Campo requerido
     */
    public function required(string $field, string $message = null): self
    {
        if (!isset($this->data[$field])) {
            $this->errors[$field] = $message ?? "El campo $field es requerido";
            return $this;
        }

        $value = $this->data[$field];

        if (is_string($value) && trim($value) === '') {
            $this->errors[$field] = $message ?? "El campo $field es requerido";
        }
        // Si es array u otro tipo y existe (isset), se considera válido por 'required'.
        // Para validar arrays vacíos usar arrayNotEmpty.
        
        return $this;
    }

    /**
     * Email válido
     */
    public function email(string $field, string $message = null): self
    {
        if (isset($this->data[$field]) && !filter_var($this->data[$field], FILTER_VALIDATE_EMAIL)) {
            $this->errors[$field] = $message ?? "El email no es válido";
        }
        return $this;
    }

    /**
     * Longitud mínima
     */
    public function minLength(string $field, int $min, string $message = null): self
    {
        if (isset($this->data[$field]) && strlen($this->data[$field]) < $min) {
            $this->errors[$field] = $message ?? "El campo $field debe tener al menos $min caracteres";
        }
        return $this;
    }

    /**
     * Longitud máxima
     */
    public function maxLength(string $field, int $max, string $message = null): self
    {
        if (isset($this->data[$field]) && strlen($this->data[$field]) > $max) {
            $this->errors[$field] = $message ?? "El campo $field no debe exceder $max caracteres";
        }
        return $this;
    }

    /**
     * Número
     */
    public function numeric(string $field, string $message = null): self
    {
        if (isset($this->data[$field]) && !is_numeric($this->data[$field])) {
            $this->errors[$field] = $message ?? "El campo $field debe ser un número";
        }
        return $this;
    }

    /**
     * Validar RUT chileno
     */
    public function rut(string $field, string $message = null): self
    {
        if (!isset($this->data[$field])) {
            return $this;
        }

        $rut = preg_replace('/[^0-9kK]/', '', $this->data[$field]);
        
        if (strlen($rut) < 2) {
            $this->errors[$field] = $message ?? "El RUT no es válido";
            return $this;
        }

        $dv = strtoupper(substr($rut, -1));
        $numero = substr($rut, 0, -1);
        
        $suma = 0;
        $factor = 2;
        
        for ($i = strlen($numero) - 1; $i >= 0; $i--) {
            $suma += intval($numero[$i]) * $factor;
            $factor = $factor === 7 ? 2 : $factor + 1;
        }
        
        $dvEsperado = 11 - ($suma % 11);
        $dvEsperado = $dvEsperado === 11 ? '0' : ($dvEsperado === 10 ? 'K' : strval($dvEsperado));
        
        if ($dv !== $dvEsperado) {
            $this->errors[$field] = $message ?? "El RUT no es válido";
        }

        return $this;
    }

    /**
     * Array con elementos
     */
    public function arrayNotEmpty(string $field, string $message = null): self
    {
        if (!isset($this->data[$field]) || !is_array($this->data[$field]) || empty($this->data[$field])) {
            $this->errors[$field] = $message ?? "El campo $field debe ser un array con elementos";
        }
        return $this;
    }

    /**
     * Validar y retornar errores si hay
     */
    public function validate(): bool
    {
        if (!empty($this->errors)) {
            Response::error('Errores de validación', 422, $this->errors);
        }
        return true;
    }

    /**
     * Obtener errores
     */
    public function getErrors(): array
    {
        return $this->errors;
    }

    /**
     * Hay errores?
     */
    public function hasErrors(): bool
    {
        return !empty($this->errors);
    }

    /**
     * Obtener valor limpio
     */
    public function get(string $field, mixed $default = null): mixed
    {
        $value = $this->data[$field] ?? $default;
        return is_string($value) ? trim($value) : $value;
    }

    /**
     * Obtener todos los datos limpios
     */
    public function all(): array
    {
        return array_map(fn($v) => is_string($v) ? trim($v) : $v, $this->data);
    }
}

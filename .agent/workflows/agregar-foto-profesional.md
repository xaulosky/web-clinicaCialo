---
description: Proceso para agregar fotos de profesionales
---

# Agregar Foto de Profesional

## 1. Preparar la imagen
- Formato: **WebP** (preferido) o JPG/PNG
- Tamaño mínimo: **600x800px** (formato vertical 3:4)
- Nombre: `clinica-cialo_Nombre_Apellido.webp`

## 2. Subir la imagen
Copiar la imagen a:
```
public/profesionales/clinica-cialo_Nombre_Apellido.webp
```

// turbo
## 3. Generar thumbnails
```powershell
node scripts/create-thumbnails.js
```
Esto crea automáticamente la versión optimizada en `public/profesionales/thumb/`

## 4. Agregar al archivo de datos
Editar `data/profesionales.ts` y agregar el nuevo profesional con:
```typescript
{
    id: "nombre-apellido",
    nombre: "Nombre",
    apellido: "Apellido",
    imagen: "/profesionales/clinica-cialo_Nombre_Apellido.webp",
    // ... resto de datos
}
```

## 5. Verificar
- Revisar `/profesionales` - debe aparecer la foto en la lista
- Revisar `/profesionales/nombre-apellido` - perfil individual
- Revisar `/` (home) - si está en la sección del equipo

## Notas
- Las páginas usan automáticamente `/profesionales/thumb/` para las listas
- Los perfiles individuales usan la imagen completa
- Si falta un thumbnail, se usará la imagen original

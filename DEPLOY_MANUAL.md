# Deploy Manual via FTP

## Contexto

El sitio es un export estatico de Next.js. Para que funcione en cPanel/FTP, el deploy debe mantener sincronizados:

- `index.html` y los `index.txt` de cada ruta.
- Todo el directorio `_next/` completo.
- `.htaccess`, `robots.txt`, `sitemap.xml` y paginas generadas.

No uses un ZIP delta o parcial para reemplazar `_next/`. Si `_next/` queda incompleto, rutas como `/profesionales/` y `/blog/` pueden cargar HTML que apunta a CSS, fuentes o chunks inexistentes.

## Flujo recomendado

```powershell
pnpm build
pnpm deploy:zip
```

Esto crea:

```text
deploy-artifacts/build-cialo.zip
```

El ZIP siempre incluye `_next/` completo y todas las paginas HTML/RSC. Por defecto excluye solo medios publicos pesados (`.jpg`, `.png`, `.webp`, `.mp4`, etc.) fuera de `_next/`, porque esas imagenes ya viven en el servidor.

Si necesitas subir tambien todas las imagenes publicas:

```powershell
$env:DEPLOY_INCLUDE_PUBLIC_MEDIA = "1"
pnpm deploy:zip
```

## Subida y extraccion

Sube estos dos archivos a `public_html`:

- `deploy-artifacts/build-cialo.zip`
- `scripts/unzip.php`

Luego ejecuta:

```powershell
Invoke-WebRequest -Uri "https://cialo.cl/unzip.php" -Method GET -TimeoutSec 300 -UseBasicParsing
```

El extractor:

- Extrae el ZIP en una carpeta temporal.
- Valida que exista `_next/`.
- Reemplaza `_next/` completo.
- Mezcla los archivos de paginas sin borrar imagenes existentes.
- Elimina el ZIP y el propio `unzip.php` al finalizar.

## Verificacion rapida

```powershell
$urls = @(
  "https://cialo.cl/",
  "https://cialo.cl/profesionales/",
  "https://cialo.cl/blog/",
  "https://cialo.cl/profesionales/__next.profesionales.txt",
  "https://cialo.cl/blog/__next.blog.txt"
)

foreach ($url in $urls) {
  $r = Invoke-WebRequest -Uri $url -UseBasicParsing -TimeoutSec 30
  "$url -> $($r.StatusCode)"
}
```

Si una pagina referencia assets de `_next/static` con 404, el ZIP usado no contenia `_next/` completo o el extractor no termino correctamente.

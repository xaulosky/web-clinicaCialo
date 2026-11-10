// scripts/optimize-images.js
// Optimiza imágenes pesadas del sitio, con foco en el blog.

const sharp = require('sharp');
const fs = require('fs');
const path = require('path');

const PUBLIC_DIR = path.join(__dirname, '..', 'public');
const BLOG_DIR = path.join(PUBLIC_DIR, 'blog');

const ORIGINAL_MAX_WIDTH = 1920;
const ORIGINAL_QUALITY = 78;
const THUMB_MAX_WIDTH = 640;
const THUMB_QUALITY = 72;

const LARGE_IMAGES = [
    'clinica/recepcion.jpg',
    'clinica/consultorio.jpg',
    'clinica/sala-procedimientos.jpg'
];

function formatSize(bytes) {
    return `${(bytes / 1024 / 1024).toFixed(2)} MB`;
}

function walkFiles(dir) {
    if (!fs.existsSync(dir)) {
        return [];
    }

    const entries = fs.readdirSync(dir, { withFileTypes: true });
    const files = [];

    for (const entry of entries) {
        const fullPath = path.join(dir, entry.name);

        if (entry.isDirectory()) {
            files.push(...walkFiles(fullPath));
            continue;
        }

        files.push(fullPath);
    }

    return files;
}

async function rewriteWebpInPlace(filePath, maxWidth, quality) {
    const inputStats = fs.statSync(filePath);
    const inputBuffer = fs.readFileSync(filePath);
    const metadata = await sharp(inputBuffer).metadata();
    const resized = sharp(inputBuffer)
        .resize(maxWidth, null, {
            withoutEnlargement: true,
            fit: 'inside',
        })
        .webp({ quality, effort: 6 });

    const outputBuffer = await resized.toBuffer();

    fs.writeFileSync(filePath, outputBuffer);

    const outputStats = fs.statSync(filePath);
    const reduction = ((1 - outputStats.size / inputStats.size) * 100).toFixed(1);

    return {
        width: metadata.width || null,
        inputSize: inputStats.size,
        outputSize: outputStats.size,
        reduction,
    };
}

async function optimizeBlogWebp() {
    const blogFiles = walkFiles(BLOG_DIR).filter(file => path.extname(file).toLowerCase() === '.webp');

    console.log('\n━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
    console.log('BLOG WEBP');
    console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');

    for (const filePath of blogFiles) {
        const relativePath = path.relative(PUBLIC_DIR, filePath).replace(/\\/g, '/');
        const isThumb = relativePath.includes('/thumbs/');
        const maxWidth = isThumb ? THUMB_MAX_WIDTH : ORIGINAL_MAX_WIDTH;
        const quality = isThumb ? THUMB_QUALITY : ORIGINAL_QUALITY;

        const before = fs.statSync(filePath);

        try {
            const result = await rewriteWebpInPlace(filePath, maxWidth, quality);
            console.log(`   ✓ ${relativePath} -> ${formatSize(result.outputSize)} (${result.reduction}% menos)`);
        } catch (error) {
            console.error(`   ✗ ${relativePath}: ${error.message}`);
        }
    }
}

async function optimizeImage(filename) {
    const inputPath = path.join(PUBLIC_DIR, filename);
    const baseName = path.basename(filename, path.extname(filename));
    const outputPath = path.join(PUBLIC_DIR, `${baseName}.webp`);
    const backupPath = path.join(PUBLIC_DIR, `${baseName}.original${path.extname(filename)}`);

    if (!fs.existsSync(inputPath)) {
        console.log(`⚠️  No existe: ${filename}`);
        return;
    }

    const inputStats = fs.statSync(inputPath);
    const inputSizeMB = (inputStats.size / 1024 / 1024).toFixed(2);

    console.log(`\n📷 Procesando: ${filename} (${inputSizeMB} MB)`);

    try {
        fs.copyFileSync(inputPath, backupPath);

        await sharp(inputPath)
            .resize(ORIGINAL_MAX_WIDTH, null, {
                withoutEnlargement: true,
                fit: 'inside'
            })
            .webp({ quality: ORIGINAL_QUALITY })
            .toFile(outputPath);

        const outputStats = fs.statSync(outputPath);
        const outputSizeKB = (outputStats.size / 1024).toFixed(1);

        console.log(`   ✅ Creado: ${baseName}.webp (${outputSizeKB} KB)`);
        console.log(`   📉 Reducción: ${((1 - outputStats.size / inputStats.size) * 100).toFixed(1)}%`);

        const jpgOutputPath = path.join(PUBLIC_DIR, `${baseName}-optimized.jpg`);
        await sharp(inputPath)
            .resize(ORIGINAL_MAX_WIDTH, null, {
                withoutEnlargement: true,
                fit: 'inside'
            })
            .jpeg({ quality: ORIGINAL_QUALITY, progressive: true })
            .toFile(jpgOutputPath);

        const jpgStats = fs.statSync(jpgOutputPath);
        console.log(`   ✅ Creado: ${baseName}-optimized.jpg (${(jpgStats.size / 1024).toFixed(1)} KB)`);

    } catch (error) {
        console.error(`   ❌ Error: ${error.message}`);
    }
}

async function optimizeAllPNG() {
    const pngFiles = fs.readdirSync(PUBLIC_DIR)
        .filter(f => f.endsWith('.png') && !f.includes('.original'))
        .filter(f => {
            const stats = fs.statSync(path.join(PUBLIC_DIR, f));
            return stats.size > 500 * 1024;
        });

    for (const file of pngFiles) {
        const inputPath = path.join(PUBLIC_DIR, file);
        const baseName = path.basename(file, '.png');
        const outputPath = path.join(PUBLIC_DIR, `${baseName}.webp`);

        await sharp(inputPath)
            .webp({ quality: ORIGINAL_QUALITY })
            .toFile(outputPath);

        const outputStats = fs.statSync(outputPath);
        console.log(`   📷 ${file} → ${baseName}.webp (${(outputStats.size / 1024).toFixed(1)} KB)`);
    }
}

async function main() {
    console.log('🚀 Iniciando optimización de imágenes...');

    if (fs.existsSync(BLOG_DIR)) {
        await optimizeBlogWebp();
    }

    console.log('\n━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
    console.log('IMÁGENES GRANDES (JPG)');
    console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');

    for (const img of LARGE_IMAGES) {
        await optimizeImage(img);
    }

    console.log('\n━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
    console.log('IMÁGENES PNG > 500KB');
    console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');

    await optimizeAllPNG();

    console.log('\n✅ Optimización completada!');
    console.log('\n📝 Siguiente paso: volver a correr `npm run build` para validar el peso final.');
}

main().catch(console.error);

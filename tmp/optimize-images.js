const sharp = require('sharp');
const fs = require('fs');
const path = require('path');

const dir = 'public/blog/workshop-bioestimuladores-2026';
const thumbDir = path.join(dir, 'thumbs');

if (!fs.existsSync(thumbDir)) {
    fs.mkdirSync(thumbDir);
}

const files = fs.readdirSync(dir).filter(f => f.endsWith('.webp') && f !== 'principal.webp');

async function processImage(file) {
    const filePath = path.join(dir, file);
    const thumbPath = path.join(thumbDir, file);
    const tempPath = path.join(dir, '_' + file);

    try {
        console.log(`Processing ${file}...`);
        
        const image = sharp(filePath);
        const metadata = await image.metadata();

        // Thumbnail (800px width)
        await sharp(filePath)
            .resize({ width: 800, withoutEnlargement: true })
            .webp({ quality: 75 })
            .toFile(thumbPath);
            
        console.log(`  Thumbnail created for ${file}`);

        // Optimize Original (max 2560px)
        let pipeline = sharp(filePath);
        if (metadata.width > 2560) {
            pipeline = pipeline.resize(2560);
        }
        
        await pipeline
            .webp({ quality: 82 })
            .toFile(tempPath);

        // Replace original
        fs.unlinkSync(filePath);
        fs.renameSync(tempPath, filePath);
        
        console.log(`  Original optimized for ${file}`);
    } catch (err) {
        console.error(`Error processing ${file}:`, err);
        if (fs.existsSync(tempPath)) fs.unlinkSync(tempPath);
    }
}

async function optimize() {
    console.log(`Optimizing ${files.length} images...`);
    // Process one by one to avoid memory issues with huge files
    for (const file of files) {
        await processImage(file);
    }
    console.log('Done!');
}

optimize().catch(console.error);

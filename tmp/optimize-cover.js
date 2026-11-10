const sharp = require('sharp');
const fs = require('fs');
const path = require('path');

const dir = 'public/blog/workshop-bioestimuladores-2026';
const coverFile = 'clinica-cialo-capacitacion_DSC02499.webp';
const filePath = path.join(dir, coverFile);
const tempPath = path.join(dir, '_' + coverFile);

async function optimizeCover() {
    try {
        console.log(`Optimizing cover ${coverFile}...`);
        const image = sharp(filePath);
        const metadata = await image.metadata();

        await sharp(filePath)
            .resize(2560)
            .webp({ quality: 85 })
            .toFile(tempPath);

        fs.unlinkSync(filePath);
        fs.renameSync(tempPath, filePath);
        
        console.log(`Cover optimized!`);
    } catch (err) {
        console.error(err);
    }
}

optimizeCover();

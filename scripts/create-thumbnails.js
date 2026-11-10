const sharp = require('sharp');
const fs = require('fs');
const path = require('path');

const inputDir = path.join(__dirname, '..', 'public', 'profesionales');
const outputDir = path.join(__dirname, '..', 'public', 'profesionales', 'thumb');

// Create vertical thumbnails (3:4 aspect ratio, 300x400)
const files = fs.readdirSync(inputDir).filter(f => f.endsWith('.webp') && !f.includes(' '));

console.log(`Found ${files.length} images to process for vertical thumbnails...`);

async function createVerticalThumbnails() {
    for (const file of files) {
        const inputPath = path.join(inputDir, file);
        const outputPath = path.join(outputDir, file);

        try {
            await sharp(inputPath)
                .resize(300, 400, {
                    fit: 'cover',
                    position: 'top'  // Focus on top of image (face)
                })
                .webp({ quality: 85 })
                .toFile(outputPath);

            console.log(`✓ Created vertical thumbnail: ${file}`);
        } catch (err) {
            console.error(`✗ Error processing ${file}:`, err.message);
        }
    }

    console.log('\nDone! Vertical thumbnails (300x400) created in public/profesionales/thumb/');
}

createVerticalThumbnails();

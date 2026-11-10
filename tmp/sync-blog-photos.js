const fs = require('fs');
const path = require('path');

const dir = 'public/blog/workshop-bioestimuladores-2026';
const blogFile = 'data/blog.ts';

const files = fs.readdirSync(dir).filter(f => f.endsWith('.webp') && !f.startsWith('_') && f !== 'principal.webp');

let blogContent = fs.readFileSync(blogFile, 'utf8');

// Find the workshop post and its gallery
const workshopId = 'workshop-lenisna-2026';
const galeriaStart = blogContent.indexOf('id: "workshop-lenisna-2026"');
if (galeriaStart === -1) {
    console.error('Workshop post not found');
    process.exit(1);
}

const galeriaInnerStart = blogContent.indexOf('galeria: [', galeriaStart);
const galeriaInnerEnd = blogContent.indexOf('],', galeriaInnerStart);

const newGaleria = files.map(file => {
    return `            { src: "/blog/workshop-bioestimuladores-2026/${file}", alt: "Workshop Bioestimuladores Clínica Cialo" }`;
}).join(',\n');

const updatedContent = blogContent.substring(0, galeriaInnerStart + 10) + '\n' + newGaleria + '\n        ' + blogContent.substring(galeriaInnerEnd);

fs.writeFileSync(blogFile, updatedContent);
console.log(`Updated galeria with ${files.length} existing files.`);

// Cleanup _ files
const underscoreFiles = fs.readdirSync(dir).filter(f => f.startsWith('_'));
underscoreFiles.forEach(f => {
    fs.unlinkSync(path.join(dir, f));
    console.log(`Deleted temp file: ${f}`);
});

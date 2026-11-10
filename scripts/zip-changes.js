const fs = require('fs');
const path = require('path');
const crypto = require('crypto');
const { execSync } = require('child_process');

const OUT_DIR = path.join(__dirname, '../out');
const HASHES_FILE = path.join(__dirname, 'baseline-hashes.json');
const CHANGES_DIR = path.join(__dirname, '../changes-temp');
const ZIP_FILE = path.join(__dirname, '../cambios.zip');

function getMd5(filePath) {
    if (!fs.existsSync(filePath)) return null;
    const content = fs.readFileSync(filePath);
    return crypto.createHash('md5').update(content).digest('hex');
}

function getAllFiles(dirPath, arrayOfFiles) {
    if (!fs.existsSync(dirPath)) return [];
    const files = fs.readdirSync(dirPath);
    arrayOfFiles = arrayOfFiles || [];

    files.forEach(function(file) {
        const fullPath = path.join(dirPath, file);
        if (fs.statSync(fullPath).isDirectory()) {
            arrayOfFiles = getAllFiles(fullPath, arrayOfFiles);
        } else {
            arrayOfFiles.push(fullPath);
        }
    });

    return arrayOfFiles;
}

function loadHashes() {
    if (fs.existsSync(HASHES_FILE)) {
        return JSON.parse(fs.readFileSync(HASHES_FILE, 'utf8'));
    }
    return null;
}

function saveHashes(hashes) {
    fs.writeFileSync(HASHES_FILE, JSON.stringify(hashes, null, 2));
}

function formatBytes(bytes, decimals = 2) {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const dm = decimals < 0 ? 0 : decimals;
    const sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(dm)) + ' ' + sizes[i];
}

function copyFileFromOut(relativePath) {
    const srcPath = path.join(OUT_DIR, relativePath);
    const destPath = path.join(CHANGES_DIR, relativePath);
    fs.mkdirSync(path.dirname(destPath), { recursive: true });
    fs.copyFileSync(srcPath, destPath);
    return fs.statSync(srcPath).size;
}

async function run() {
    console.log('--- Optimizador de Subida (Delta Hash Zip) ---');

    if (!fs.existsSync(OUT_DIR)) {
        console.error('Error: La carpeta "out" no existe. Ejecuta "npm run build" primero.');
        process.exit(1);
    }

    const currentHashes = {};
    const outFiles = getAllFiles(OUT_DIR);
    console.log(`Analizando ${outFiles.length} archivos en "out"...`);

    outFiles.forEach(file => {
        const relativePath = path.relative(OUT_DIR, file).replace(/\\/g, '/');
        currentHashes[relativePath] = getMd5(file);
    });

    const baselineHashes = loadHashes();

    if (!baselineHashes || process.argv.includes('--init')) {
        console.log('\nInicializando base de hashes...');
        saveHashes(currentHashes);
        console.log('Base de hashes inicializada con exito.');
        return;
    }

    if (process.argv.includes('--commit')) {
        console.log('\nActualizando base de hashes...');
        saveHashes(currentHashes);
        console.log('Base actualizada. Los proximos cambios se compararan contra este estado.');
        return;
    }

    try {
        if (fs.existsSync(CHANGES_DIR)) fs.rmSync(CHANGES_DIR, { recursive: true, force: true });
        if (fs.existsSync(ZIP_FILE)) fs.unlinkSync(ZIP_FILE);
    } catch (e) {
        console.warn('Advertencia: No se pudo limpiar la carpeta temporal anterior. Continuando...');
    }

    console.log('Buscando cambios respecto a la base...');
    const changedPaths = Object.keys(currentHashes).filter(relativePath => {
        return currentHashes[relativePath] !== baselineHashes[relativePath];
    });

    const pathsToCopy = new Set(changedPaths);
    const nextChanged = changedPaths.some(relativePath => relativePath.startsWith('_next/'));

    if (nextChanged) {
        Object.keys(currentHashes)
            .filter(relativePath => relativePath.startsWith('_next/'))
            .forEach(relativePath => pathsToCopy.add(relativePath));
        console.log('Cambio detectado en _next/: se incluira _next completo para evitar assets faltantes.');
    }

    let changedCount = 0;
    let totalSize = 0;

    pathsToCopy.forEach(relativePath => {
        changedCount++;
        totalSize += copyFileFromOut(relativePath);
        if (changedCount < 50) {
            console.log(`[+] ${relativePath}`);
        } else if (changedCount === 50) {
            console.log('... y otros mas.');
        }
    });

    if (changedCount === 0) {
        console.log('\nNo se detectaron cambios.');
        return;
    }

    console.log(`\nResumen: ${changedCount} archivos incluidos. Tamano total aproximado: ${formatBytes(totalSize)}`);
    console.log('Creando cambios.zip...');

    try {
        const absoluteZipFile = path.resolve(ZIP_FILE);
        console.log('Comprimiendo...');
        execSync(`tar -caf "${absoluteZipFile}" -C "${CHANGES_DIR}" .`);

        const zipSize = fs.statSync(ZIP_FILE).size;
        console.log(`\nExito: Se ha creado "${path.basename(ZIP_FILE)}" (${formatBytes(zipSize)}).`);
        console.log('Si _next cambio, este ZIP incluye _next completo para evitar assets faltantes.');
        console.log('Luego ejecuta: npm run zip-changes -- --commit');
    } catch (error) {
        console.error('\nError al crear el archivo comprimido:', error.message);
    }

    try {
        if (fs.existsSync(CHANGES_DIR)) fs.rmSync(CHANGES_DIR, { recursive: true, force: true });
    } catch (e) {}
}

run();

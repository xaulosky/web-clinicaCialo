#!/usr/bin/env node

const fs = require("fs");
const path = require("path");
const AdmZip = require("adm-zip");

const DEFAULT_OUT_DIR = path.resolve(__dirname, "..", "out");
const DEFAULT_ZIP_PATH = path.resolve(__dirname, "..", "deploy-artifacts", "build-cialo.zip");

const PUBLIC_MEDIA_EXTENSIONS = new Set([
  ".jpg",
  ".jpeg",
  ".png",
  ".webp",
  ".gif",
  ".mp4",
  ".webm",
  ".mov",
  ".avi",
]);

function walkFiles(dirPath, files = []) {
  for (const item of fs.readdirSync(dirPath)) {
    const fullPath = path.join(dirPath, item);
    const stat = fs.statSync(fullPath);

    if (stat.isDirectory()) {
      walkFiles(fullPath, files);
    } else {
      files.push(fullPath);
    }
  }

  return files;
}

function shouldInclude(relativePath, includePublicMedia = false) {
  const normalized = relativePath.replace(/\\/g, "/");

  if (normalized.startsWith("_next/")) {
    return true;
  }

  if (normalized.includes(".original.")) {
    return false;
  }

  if (includePublicMedia) {
    return true;
  }

  return !PUBLIC_MEDIA_EXTENSIONS.has(path.extname(normalized).toLowerCase());
}

function formatSize(bytes) {
  const mb = bytes / 1024 / 1024;
  return `${mb.toFixed(2)} MB`;
}

async function createDeployZip(options = {}) {
  const outDir = path.resolve(options.outDir || DEFAULT_OUT_DIR);
  const zipPath = path.resolve(options.zipPath || DEFAULT_ZIP_PATH);
  const includePublicMedia =
    options.includePublicMedia || process.env.DEPLOY_INCLUDE_PUBLIC_MEDIA === "1";

  if (!fs.existsSync(outDir)) {
    throw new Error(`Build directory not found: ${outDir}`);
  }

  fs.mkdirSync(path.dirname(zipPath), { recursive: true });
  if (fs.existsSync(zipPath)) {
    fs.unlinkSync(zipPath);
  }

  const zip = new AdmZip();
  const files = walkFiles(outDir);
  let included = 0;
  let skipped = 0;
  let includedBytes = 0;
  let skippedBytes = 0;

  for (const filePath of files) {
    const relativePath = path.relative(outDir, filePath).replace(/\\/g, "/");
    const stat = fs.statSync(filePath);

    if (shouldInclude(relativePath, includePublicMedia)) {
      zip.addLocalFile(filePath, path.posix.dirname(relativePath) === "." ? "" : path.posix.dirname(relativePath));
      included += 1;
      includedBytes += stat.size;
    } else {
      skipped += 1;
      skippedBytes += stat.size;
    }
  }

  zip.writeZip(zipPath);

  const zipBytes = fs.statSync(zipPath).size;
  console.log(`Deploy ZIP created: ${zipPath}`);
  console.log(`Included: ${included} files (${formatSize(includedBytes)})`);
  console.log(`Skipped public media: ${skipped} files (${formatSize(skippedBytes)})`);
  console.log(`ZIP size: ${formatSize(zipBytes)}`);

  return zipPath;
}

if (require.main === module) {
  const zipPath = process.argv[2] || DEFAULT_ZIP_PATH;

  createDeployZip({ zipPath }).catch((error) => {
    console.error(`ERROR: ${error.message}`);
    process.exit(1);
  });
}

module.exports = {
  createDeployZip,
  shouldInclude,
};

#!/usr/bin/env node

const { Client } = require("basic-ftp");
const fs = require("fs");
const path = require("path");
const { execSync } = require("child_process");
const { createDeployZip } = require("./create-deploy-zip");

require("dotenv").config({ path: ".env.local" });

const CONFIG = {
  host: process.env.FTP_HOST || "216.246.47.183",
  user: process.env.FTP_USER || "admin@cialo.cl",
  password: process.env.FTP_PASS || process.env.FTP_PASSWORD,
  remoteDir: process.env.FTP_REMOTE_DIR || "/public_html",
  siteUrl: process.env.SITE_URL || "https://cialo.cl",
  localOutDir: "./out",
  deployDir: "./deploy-artifacts",
  zipName: "build-cialo.zip",
  phpName: "unzip.php",
};

function log(step, message) {
  console.log(`[${step}] ${message}`);
}

async function verifyBuild() {
  log("build", "Verificando build...");

  if (process.env.SKIP_BUILD === "1" && fs.existsSync(CONFIG.localOutDir)) {
    log("warning", "SKIP_BUILD=1 activo. Se usara out/ existente.");
    return;
  }

  try {
    execSync("pnpm build", { stdio: "inherit" });
    log("success", "Build completado.");
  } catch (err) {
    log("error", "Build fallo. Abortando deploy.");
    process.exit(1);
  }
}

async function createZip() {
  log("zip", "Creando ZIP optimizado del build...");

  fs.mkdirSync(CONFIG.deployDir, { recursive: true });
  const zipPath = path.join(CONFIG.deployDir, CONFIG.zipName);

  await createDeployZip({
    outDir: CONFIG.localOutDir,
    zipPath,
  });

  return zipPath;
}

async function uploadFiles(zipPath) {
  log("upload", "Conectando al servidor FTP...");

  if (!CONFIG.password) {
    log("error", "No se encontro FTP_PASS o FTP_PASSWORD en .env.local");
    process.exit(1);
  }

  const client = new Client();
  client.ftp.verbose = false;

  try {
    await client.access({
      host: CONFIG.host,
      user: CONFIG.user,
      password: CONFIG.password,
      secure: false,
    });

    log("success", "Conectado al servidor FTP.");

    await client.cd(CONFIG.remoteDir);
    log("info", `Directorio remoto: ${CONFIG.remoteDir}`);

    log("upload", `Subiendo ${CONFIG.zipName}...`);
    await client.uploadFrom(zipPath, CONFIG.zipName);
    log("success", "ZIP subido correctamente.");

    const phpPath = path.join(__dirname, CONFIG.phpName);
    if (!fs.existsSync(phpPath)) {
      log("error", `No se encontro ${CONFIG.phpName} en scripts/`);
      process.exit(1);
    }

    log("upload", `Subiendo ${CONFIG.phpName}...`);
    await client.uploadFrom(phpPath, CONFIG.phpName);
    log("success", "Extractor PHP subido correctamente.");

    client.close();
    return true;
  } catch (err) {
    client.close();
    log("error", `Error FTP: ${err.message}`);
    return false;
  }
}

async function executeExtractor() {
  log("deploy", "Ejecutando extractor remoto...");

  const extractorUrl = `${CONFIG.siteUrl}/unzip.php`;

  log("info", "Esperando 5 segundos para propagacion...");
  await new Promise((resolve) => setTimeout(resolve, 5000));

  try {
    const response = await fetch(extractorUrl, { method: "GET" });
    const text = await response.text();

    console.log("\n--- RESPUESTA DEL SERVIDOR ---");
    console.log(text);
    console.log("------------------------------\n");

    if (text.includes("ERROR")) {
      log("error", "El extractor reporto errores.");
      return false;
    }

    if (text.includes("SUCCESS")) {
      log("success", "Deploy completado exitosamente.");
      return true;
    }

    log("warning", "No se detecto confirmacion de exito clara.");
    return false;
  } catch (err) {
    log("error", `Error ejecutando extractor: ${err.message}`);
    return false;
  }
}

function cleanup(zipPath) {
  log("cleanup", "Limpiando archivos temporales...");

  try {
    if (fs.existsSync(zipPath)) {
      fs.unlinkSync(zipPath);
    }

    const deployDir = path.resolve(CONFIG.deployDir);
    if (fs.existsSync(deployDir)) {
      const files = fs.readdirSync(deployDir);
      if (files.length === 0) {
        fs.rmdirSync(deployDir);
      }
    }

    log("success", "Limpieza completada.");
  } catch (err) {
    log("warning", `No se pudieron eliminar todos los temporales: ${err.message}`);
  }
}

async function main() {
  console.log("\nDEPLOY FTP - CLINICA CIALO\n");
  console.log(`Servidor: ${CONFIG.host}`);
  console.log(`Usuario:  ${CONFIG.user}`);
  console.log(`Remoto:   ${CONFIG.remoteDir}`);
  console.log(`Sitio:    ${CONFIG.siteUrl}\n`);

  const startTime = Date.now();
  let zipPath = null;

  try {
    await verifyBuild();
    zipPath = await createZip();

    const uploaded = await uploadFiles(zipPath);
    if (!uploaded) {
      log("error", "Deploy abortado por error en upload.");
      cleanup(zipPath);
      process.exit(1);
    }

    const success = await executeExtractor();
    cleanup(zipPath);

    const duration = ((Date.now() - startTime) / 1000).toFixed(1);

    if (success) {
      console.log(`\nDeploy completado en ${duration}s`);
      console.log(`Sitio: ${CONFIG.siteUrl}\n`);
      process.exit(0);
    }

    console.log(`\nDeploy finalizado con advertencias en ${duration}s`);
    console.log("Revisa la respuesta del servidor arriba.\n");
    process.exit(1);
  } catch (err) {
    log("error", `Error inesperado: ${err.message}`);
    console.error(err);
    if (zipPath) cleanup(zipPath);
    process.exit(1);
  }
}

main();

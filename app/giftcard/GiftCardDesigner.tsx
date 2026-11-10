"use client";

import { useEffect, useRef, useState } from "react";
import { tratamientosData } from "@/data/tratamientos";
import { trackLead } from "@/lib/fbpixel";
import { createOrder, initTransbankPayment } from "@/lib/orders-store";

// ====================================================================
// Estilos de la Gift Card (portado del sistema de diseño de referencia)
// ====================================================================
type StyleKey = "cialo" | "elegant" | "modern" | "classic" | "dark" | "cream";

interface GiftStyle {
    name: string;
    bgGradient: { pos: number; color: string }[];
    accentColor: string;
    accentGradient: [string, string, string];
    textColor: string;
    secondaryText: string;
    borderColor: string;
    pattern: "diamonds" | "waves" | "circles" | "stars" | "none";
    glow: boolean;
}

const STYLES: Record<StyleKey, GiftStyle> = {
    cialo: {
        name: "Cialo",
        bgGradient: [{ pos: 0, color: "#ffffff" }, { pos: 1, color: "#f6f1e9" }],
        accentColor: "#b8935f", accentGradient: ["#c9b48b", "#e6d8bd", "#b8935f"],
        textColor: "#1b1a18", secondaryText: "#8a8378", borderColor: "#b8935f",
        pattern: "none", glow: false,
    },
    elegant: {
        name: "Luxury Gold",
        bgGradient: [
            { pos: 0, color: "#1a1a2e" }, { pos: 0.3, color: "#16213e" },
            { pos: 0.7, color: "#0f3460" }, { pos: 1, color: "#1a1a2e" },
        ],
        accentColor: "#d4af37", accentGradient: ["#d4af37", "#f5e6a3", "#d4af37"],
        textColor: "#ffffff", secondaryText: "#c9c9c9", borderColor: "#d4af37",
        pattern: "diamonds", glow: true,
    },
    modern: {
        name: "Rose Gold",
        bgGradient: [{ pos: 0, color: "#2d1f3d" }, { pos: 0.5, color: "#4a3153" }, { pos: 1, color: "#2d1f3d" }],
        accentColor: "#e8b4b8", accentGradient: ["#e8b4b8", "#f5d0d3", "#daa0a4"],
        textColor: "#ffffff", secondaryText: "#d4c5c7", borderColor: "#e8b4b8",
        pattern: "waves", glow: true,
    },
    classic: {
        name: "Ocean Blue",
        bgGradient: [
            { pos: 0, color: "#0c2340" }, { pos: 0.4, color: "#1a4570" },
            { pos: 0.7, color: "#2d6a9f" }, { pos: 1, color: "#1a4570" },
        ],
        accentColor: "#7dd3fc", accentGradient: ["#38bdf8", "#7dd3fc", "#bae6fd"],
        textColor: "#ffffff", secondaryText: "#bae6fd", borderColor: "#38bdf8",
        pattern: "circles", glow: true,
    },
    dark: {
        name: "Midnight Purple",
        bgGradient: [
            { pos: 0, color: "#0a0a0f" }, { pos: 0.3, color: "#1a1a2e" },
            { pos: 0.6, color: "#2d1b4e" }, { pos: 1, color: "#0a0a0f" },
        ],
        accentColor: "#a78bfa", accentGradient: ["#7c3aed", "#a78bfa", "#c4b5fd"],
        textColor: "#ffffff", secondaryText: "#c4b5fd", borderColor: "#8b5cf6",
        pattern: "stars", glow: true,
    },
    cream: {
        name: "Cream Elegance",
        bgGradient: [{ pos: 0, color: "#faf8f5" }, { pos: 1, color: "#f5f0e8" }],
        accentColor: "#c9a962", accentGradient: ["#b8943f", "#d4b896", "#c9a962"],
        textColor: "#2c2c2c", secondaryText: "#8b7355", borderColor: "#c9a962",
        pattern: "none", glow: false,
    },
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
type Ctx = any;

function hexToRgba(hex: string, alpha: number): string {
    const r = parseInt(hex.slice(1, 3), 16);
    const g = parseInt(hex.slice(3, 5), 16);
    const b = parseInt(hex.slice(5, 7), 16);
    return `rgba(${r}, ${g}, ${b}, ${alpha})`;
}

function roundRect(ctx: Ctx, x: number, y: number, w: number, h: number, r: number) {
    ctx.beginPath();
    ctx.moveTo(x + r, y);
    ctx.lineTo(x + w - r, y);
    ctx.quadraticCurveTo(x + w, y, x + w, y + r);
    ctx.lineTo(x + w, y + h - r);
    ctx.quadraticCurveTo(x + w, y + h, x + w - r, y + h);
    ctx.lineTo(x + r, y + h);
    ctx.quadraticCurveTo(x, y + h, x, y + h - r);
    ctx.lineTo(x, y + r);
    ctx.quadraticCurveTo(x, y, x + r, y);
    ctx.closePath();
}

function drawStar(ctx: Ctx, cx: number, cy: number, spikes: number, outer: number, inner: number) {
    let rot = (Math.PI / 2) * 3;
    const step = Math.PI / spikes;
    ctx.beginPath();
    ctx.moveTo(cx, cy - outer);
    for (let i = 0; i < spikes; i++) {
        ctx.lineTo(cx + Math.cos(rot) * outer, cy + Math.sin(rot) * outer); rot += step;
        ctx.lineTo(cx + Math.cos(rot) * inner, cy + Math.sin(rot) * inner); rot += step;
    }
    ctx.lineTo(cx, cy - outer);
    ctx.closePath();
    ctx.fill();
}

function drawDiamond(ctx: Ctx, x: number, y: number, size: number) {
    ctx.beginPath();
    ctx.moveTo(x, y - size);
    ctx.lineTo(x + size * 0.6, y);
    ctx.lineTo(x, y + size);
    ctx.lineTo(x - size * 0.6, y);
    ctx.closePath();
    ctx.fill();
}

function drawLotus(ctx: Ctx, x: number, y: number, size: number, color: string) {
    ctx.fillStyle = color;
    for (let i = 0; i < 5; i++) {
        const angle = (i * Math.PI * 2) / 5 - Math.PI / 2;
        const px = x + Math.cos(angle) * size * 0.5;
        const py = y + Math.sin(angle) * size * 0.3;
        ctx.beginPath();
        ctx.ellipse(px, py, size * 0.4, size * 0.2, angle, 0, Math.PI * 2);
        ctx.fill();
    }
    ctx.beginPath();
    ctx.arc(x, y, size * 0.15, 0, Math.PI * 2);
    ctx.fill();
}

function drawPattern(ctx: Ctx, width: number, height: number, s: GiftStyle) {
    ctx.globalAlpha = 0.03;
    ctx.fillStyle = s.accentColor;
    ctx.strokeStyle = s.accentColor;
    if (s.pattern === "diamonds") {
        for (let x = 0; x < width; x += 60) for (let y = 0; y < height; y += 60) {
            ctx.save(); ctx.translate(x, y); ctx.rotate(Math.PI / 4); ctx.strokeRect(-10, -10, 20, 20); ctx.restore();
        }
    } else if (s.pattern === "waves") {
        for (let y = 50; y < height; y += 40) {
            ctx.beginPath(); ctx.moveTo(0, y);
            for (let x = 0; x < width; x += 20) ctx.quadraticCurveTo(x + 10, y - 15, x + 20, y);
            ctx.stroke();
        }
    } else if (s.pattern === "circles") {
        for (let i = 0; i < 6; i++) { ctx.beginPath(); ctx.arc(width - 150, height - 120, 50 + i * 40, 0, Math.PI * 2); ctx.stroke(); }
        for (let i = 0; i < 4; i++) { ctx.beginPath(); ctx.arc(100, 80, 30 + i * 35, 0, Math.PI * 2); ctx.stroke(); }
    } else if (s.pattern === "stars") {
        // determinístico para evitar parpadeo entre redibujos
        let seed = 7;
        const rnd = () => { seed = (seed * 9301 + 49297) % 233280; return seed / 233280; };
        for (let i = 0; i < 50; i++) {
            const x = rnd() * width, y = rnd() * height, size = rnd() * 3 + 1;
            ctx.beginPath(); ctx.arc(x, y, size, 0, Math.PI * 2); ctx.fill();
        }
        for (let i = 0; i < 8; i++) drawStar(ctx, rnd() * width, rnd() * height, 5, 8, 4);
    }
    ctx.globalAlpha = 1;
}

export interface GiftData {
    tipo: "valor" | "tratamiento";
    monto: string;        // formateado, ej "50.000"
    tratamiento: string;
    codigo: string;
    destinatario: string;
    remitente: string;
    mensaje: string;
    vencimiento: string;  // YYYY-MM-DD
    estilo: StyleKey;
}

function renderGiftCard(
    canvas: HTMLCanvasElement,
    g: GiftData,
    logos: { dark: HTMLImageElement | null; cream: HTMLImageElement | null }
) {
    const ctx: Ctx = canvas.getContext("2d");
    if (!ctx) return;
    const scale = 2;
    const width = canvas.width / scale;
    const height = canvas.height / scale;
    ctx.setTransform(scale, 0, 0, scale, 0, 0);
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    const colors = STYLES[g.estilo];

    if (g.estilo === "cialo") { renderCialo(ctx, width, height, colors, g, logos.cream); return; }
    if (g.estilo === "cream") { renderCream(ctx, width, height, colors, g, logos.cream); return; }

    // Fondo
    const bg = ctx.createLinearGradient(0, 0, width, height);
    colors.bgGradient.forEach((st) => bg.addColorStop(st.pos, st.color));
    ctx.fillStyle = bg; roundRect(ctx, 0, 0, width, height, 24); ctx.fill();

    drawPattern(ctx, width, height, colors);

    if (colors.glow) {
        const g1 = ctx.createRadialGradient(0, 0, 0, 0, 0, 300);
        g1.addColorStop(0, hexToRgba(colors.accentColor, 0.15)); g1.addColorStop(1, "transparent");
        ctx.fillStyle = g1; ctx.fillRect(0, 0, 400, 300);
        const g2 = ctx.createRadialGradient(width, height, 0, width, height, 350);
        g2.addColorStop(0, hexToRgba(colors.accentColor, 0.1)); g2.addColorStop(1, "transparent");
        ctx.fillStyle = g2; ctx.fillRect(width - 400, height - 300, 400, 300);
    }

    // Bordes
    const bgrad = ctx.createLinearGradient(0, 0, width, height);
    bgrad.addColorStop(0, colors.accentGradient[0]); bgrad.addColorStop(0.5, colors.accentGradient[1]); bgrad.addColorStop(1, colors.accentGradient[2]);
    ctx.strokeStyle = bgrad; ctx.lineWidth = 2; roundRect(ctx, 20, 20, width - 40, height - 40, 18); ctx.stroke();
    ctx.strokeStyle = hexToRgba(colors.accentColor, 0.3); ctx.lineWidth = 1; roundRect(ctx, 30, 30, width - 60, height - 60, 14); ctx.stroke();

    // Logo
    if (logos.dark && logos.dark.complete && logos.dark.naturalWidth > 0) {
        const lh = 55, lw = (logos.dark.width / logos.dark.height) * lh;
        ctx.drawImage(logos.dark, 50, 45, lw, lh);
    }

    // Título GIFT CARD
    ctx.shadowColor = hexToRgba(colors.accentColor, 0.5); ctx.shadowBlur = 15;
    const tg = ctx.createLinearGradient(width - 250, 40, width - 50, 80);
    tg.addColorStop(0, colors.accentGradient[0]); tg.addColorStop(0.5, colors.accentGradient[1]); tg.addColorStop(1, colors.accentGradient[2]);
    ctx.fillStyle = tg; ctx.font = '600 28px "Inter", Arial, sans-serif'; ctx.textAlign = "right"; ctx.letterSpacing = "3px";
    ctx.fillText("GIFT CARD", width - 50, 75);
    ctx.shadowColor = "transparent"; ctx.shadowBlur = 0; ctx.letterSpacing = "0px";

    // Líneas
    const ln = ctx.createLinearGradient(width - 200, 0, width - 50, 0);
    ln.addColorStop(0, "transparent"); ln.addColorStop(0.3, colors.accentGradient[0]); ln.addColorStop(0.5, colors.accentGradient[1]); ln.addColorStop(1, colors.accentGradient[2]);
    ctx.strokeStyle = ln; ctx.lineWidth = 1.5; ctx.beginPath(); ctx.moveTo(width - 200, 90); ctx.lineTo(width - 50, 90); ctx.stroke();

    const ml = ctx.createLinearGradient(50, 0, width - 50, 0);
    ml.addColorStop(0, "transparent"); ml.addColorStop(0.1, hexToRgba(colors.accentColor, 0.5)); ml.addColorStop(0.5, colors.accentColor); ml.addColorStop(0.9, hexToRgba(colors.accentColor, 0.5)); ml.addColorStop(1, "transparent");
    ctx.strokeStyle = ml; ctx.lineWidth = 1; ctx.beginPath(); ctx.moveTo(50, 125); ctx.lineTo(width - 50, 125); ctx.stroke();

    // Contenido principal
    ctx.shadowColor = hexToRgba(colors.accentColor, 0.4); ctx.shadowBlur = 20; ctx.fillStyle = colors.textColor; ctx.textAlign = "center";
    if (g.tipo === "tratamiento") {
        let t = g.tratamiento || "Tratamiento";
        let fs = 42;
        if (t.length > 30) { fs = 32; if (t.length > 40) t = t.substring(0, 37) + "..."; }
        else if (t.length > 20) fs = 36;
        ctx.font = `bold ${fs}px "Inter", Arial, sans-serif`; ctx.fillText(t, width / 2, 200);
        ctx.shadowColor = "transparent"; ctx.shadowBlur = 0;
        ctx.fillStyle = hexToRgba(colors.secondaryText, 0.7); ctx.font = '300 14px "Inter", Arial, sans-serif';
        ctx.fillText("— TRATAMIENTO INCLUIDO —", width / 2, 235);
    } else {
        ctx.font = 'bold 68px "Inter", Arial, sans-serif'; ctx.fillText(g.monto ? `$${g.monto}` : "$0", width / 2, 210);
        ctx.shadowColor = "transparent"; ctx.shadowBlur = 0;
        ctx.fillStyle = hexToRgba(colors.secondaryText, 0.7); ctx.font = '300 14px "Inter", Arial, sans-serif';
        ctx.fillText("— PESOS CHILENOS —", width / 2, 240);
    }

    // Mensaje
    if (g.mensaje) {
        ctx.fillStyle = colors.secondaryText; ctx.font = 'italic 300 15px "Inter", Arial, sans-serif'; ctx.textAlign = "center";
        const max = 50; const words = g.mensaje.split(" "); const lines: string[] = []; let cur = "";
        for (const w of words) { const t = cur ? cur + " " + w : w; if (t.length <= max) cur = t; else { if (cur) lines.push(cur); cur = w; } }
        if (cur) lines.push(cur);
        if (lines.length > 2) { lines[1] = lines[1].substring(0, max - 3) + "..."; lines.length = 2; }
        const lh = 20; const sy = 275 - ((lines.length - 1) * lh) / 2;
        lines.forEach((line, i) => {
            const pre = i === 0 ? '"' : ""; const suf = i === lines.length - 1 ? '"' : "";
            ctx.fillText(`${pre}${line}${suf}`, width / 2, sy + i * lh);
        });
    }

    // Destinatario / Remitente
    const iy = 320; ctx.textAlign = "left";
    if (g.destinatario) {
        ctx.fillStyle = hexToRgba(colors.secondaryText, 0.7); ctx.font = '400 12px "Inter", Arial, sans-serif'; ctx.fillText("PARA", 50, iy);
        ctx.fillStyle = colors.textColor; ctx.font = '500 16px "Inter", Arial, sans-serif';
        ctx.fillText(g.destinatario.length > 25 ? g.destinatario.substring(0, 22) + "..." : g.destinatario, 50, iy + 20);
    }
    if (g.remitente) {
        const sx = g.destinatario ? 420 : 50;
        ctx.fillStyle = hexToRgba(colors.secondaryText, 0.7); ctx.font = '400 12px "Inter", Arial, sans-serif'; ctx.fillText("DE", sx, iy);
        ctx.fillStyle = colors.textColor; ctx.font = '500 16px "Inter", Arial, sans-serif';
        ctx.fillText(g.remitente.length > 20 ? g.remitente.substring(0, 17) + "..." : g.remitente, sx, iy + 20);
    }

    // Línea inferior
    const bl = ctx.createLinearGradient(50, 0, width - 50, 0);
    bl.addColorStop(0, colors.accentColor); bl.addColorStop(0.5, hexToRgba(colors.accentColor, 0.3)); bl.addColorStop(1, colors.accentColor);
    ctx.strokeStyle = bl; ctx.lineWidth = 1; ctx.beginPath(); ctx.moveTo(50, 365); ctx.lineTo(width - 50, 365); ctx.stroke();

    // Código
    if (g.codigo) {
        ctx.fillStyle = hexToRgba(colors.accentColor, 0.1); roundRect(ctx, 45, 380, 170, 32, 6); ctx.fill();
        ctx.fillStyle = colors.accentColor; ctx.font = 'bold 16px "Courier New", monospace'; ctx.textAlign = "left"; ctx.fillText(g.codigo, 55, 402);
    }
    // Vencimiento
    if (g.vencimiento) {
        const d = new Date(g.vencimiento + "T00:00:00");
        const fmt = d.toLocaleDateString("es-CL", { day: "2-digit", month: "long", year: "numeric" });
        ctx.fillStyle = colors.secondaryText; ctx.font = '400 12px "Inter", Arial, sans-serif'; ctx.textAlign = "right";
        ctx.fillText(`Válida hasta: ${fmt}`, width - 50, 398);
    }
    // Footer
    ctx.fillStyle = hexToRgba(colors.secondaryText, 0.6); ctx.font = '400 11px "Inter", Arial, sans-serif'; ctx.textAlign = "right";
    ctx.fillText("Clínica Cialo  •  www.cialo.cl", width - 50, 435);
    ctx.textAlign = "left"; ctx.fillStyle = hexToRgba(colors.secondaryText, 0.5); ctx.font = '300 9px "Inter", Arial, sans-serif';
    ctx.fillText("No canjeable por dinero  •  Sujeta a disponibilidad  •  Un solo uso", 50, 455);
}

// Diseño "Cialo": claro y elegante con la paleta del sitio, con profundidad
// (lavados dorados, anillos decorativos, textura fina y esquinas ornamentadas).
function renderCialo(ctx: Ctx, width: number, height: number, colors: GiftStyle, g: GiftData, logo: HTMLImageElement | null) {
    const gold = colors.accentColor;      // #b8935f
    const goldDeep = "#b89b6a";
    const dark = colors.textColor;        // #1b1a18
    const soft = colors.secondaryText;    // gris cálido

    // ===== Fondo crema con gradiente diagonal =====
    const bg = ctx.createLinearGradient(0, 0, width, height);
    bg.addColorStop(0, "#fffdf9"); bg.addColorStop(0.45, "#faf6ee"); bg.addColorStop(1, "#f1e9da");
    ctx.fillStyle = bg; roundRect(ctx, 0, 0, width, height, 26); ctx.fill();

    // Recortar todo lo decorativo al interior de la tarjeta
    ctx.save();
    roundRect(ctx, 0, 0, width, height, 26); ctx.clip();

    // ===== Lavados dorados radiales (profundidad) =====
    const w1 = ctx.createRadialGradient(width - 60, 40, 0, width - 60, 40, 360);
    w1.addColorStop(0, hexToRgba(goldDeep, 0.20)); w1.addColorStop(1, "transparent");
    ctx.fillStyle = w1; ctx.fillRect(width - 420, -60, 480, 420);
    const w2 = ctx.createRadialGradient(40, height - 30, 0, 40, height - 30, 320);
    w2.addColorStop(0, hexToRgba(gold, 0.28)); w2.addColorStop(1, "transparent");
    ctx.fillStyle = w2; ctx.fillRect(-60, height - 320, 420, 380);

    // ===== Anillos decorativos (el aro de luz "O" de Cialo) =====
    ctx.lineWidth = 1.2;
    for (let i = 0; i < 4; i++) {
        ctx.strokeStyle = hexToRgba(goldDeep, 0.20 - i * 0.035);
        ctx.beginPath(); ctx.arc(width - 78, 96, 56 + i * 26, 0, Math.PI * 2); ctx.stroke();
    }
    for (let i = 0; i < 3; i++) {
        ctx.strokeStyle = hexToRgba(goldDeep, 0.16 - i * 0.04);
        ctx.beginPath(); ctx.arc(64, height - 64, 44 + i * 22, 0, Math.PI * 2); ctx.stroke();
    }

    // ===== Textura: grilla fina de puntos dorados =====
    ctx.fillStyle = hexToRgba(goldDeep, 0.10);
    for (let x = 36; x < width - 20; x += 26) {
        for (let y = 36; y < height - 20; y += 26) {
            ctx.beginPath(); ctx.arc(x, y, 0.8, 0, Math.PI * 2); ctx.fill();
        }
    }

    // ===== Banda lateral dorada degradada =====
    const band = ctx.createLinearGradient(0, 0, 0, height);
    band.addColorStop(0, goldDeep); band.addColorStop(0.5, "#e8d9b8"); band.addColorStop(1, goldDeep);
    ctx.fillStyle = band; ctx.fillRect(0, 0, 10, height);
    ctx.fillStyle = hexToRgba(goldDeep, 0.35); ctx.fillRect(10, 0, 2, height);

    ctx.restore();

    // ===== Doble borde dorado =====
    const bb = ctx.createLinearGradient(0, 0, width, height);
    bb.addColorStop(0, goldDeep); bb.addColorStop(0.5, "#ecdfc2"); bb.addColorStop(1, goldDeep);
    ctx.strokeStyle = bb; ctx.lineWidth = 2; roundRect(ctx, 20, 20, width - 40, height - 40, 18); ctx.stroke();
    ctx.strokeStyle = hexToRgba(goldDeep, 0.30); ctx.lineWidth = 1; roundRect(ctx, 28, 28, width - 56, height - 56, 13); ctx.stroke();

    // ===== Ornamentos de esquina (arcos dobles) =====
    ctx.lineCap = "round";
    const corner = (cx: number, cy: number, sx: number, sy: number) => {
        ctx.strokeStyle = goldDeep; ctx.lineWidth = 2.4;
        ctx.beginPath(); ctx.moveTo(cx, cy + 44 * sy); ctx.quadraticCurveTo(cx, cy, cx + 44 * sx, cy); ctx.stroke();
        ctx.strokeStyle = hexToRgba(goldDeep, 0.5); ctx.lineWidth = 1.2;
        ctx.beginPath(); ctx.moveTo(cx + 9 * sx, cy + 38 * sy); ctx.quadraticCurveTo(cx + 9 * sx, cy + 9 * sy, cx + 38 * sx, cy + 9 * sy); ctx.stroke();
    };
    corner(34, 34, 1, 1);
    corner(width - 34, 34, -1, 1);
    corner(34, height - 34, 1, -1);
    corner(width - 34, height - 34, -1, -1);

    // ===== Logo centrado =====
    if (logo && logo.complete && logo.naturalWidth > 0) {
        const lh = 46, lw = (logo.width / logo.height) * lh;
        ctx.drawImage(logo, (width - lw) / 2, 42, lw, lh);
    } else {
        ctx.fillStyle = dark; ctx.font = 'bold 30px "Inter", Arial, sans-serif'; ctx.textAlign = "center"; ctx.fillText("CIALO", width / 2, 78);
    }

    // ===== GIFT CARD (serif dorado con sombra suave) =====
    ctx.shadowColor = hexToRgba(goldDeep, 0.35); ctx.shadowBlur = 10;
    const tg = ctx.createLinearGradient(width / 2 - 110, 110, width / 2 + 110, 135);
    tg.addColorStop(0, goldDeep); tg.addColorStop(0.5, "#cdb78c"); tg.addColorStop(1, goldDeep);
    ctx.fillStyle = tg; ctx.font = "400 26px Georgia, serif"; ctx.textAlign = "center"; ctx.letterSpacing = "8px";
    ctx.fillText("GIFT CARD", width / 2 + 4, 130); ctx.letterSpacing = "0px";
    ctx.shadowColor = "transparent"; ctx.shadowBlur = 0;

    // Subtítulo
    ctx.fillStyle = soft; ctx.font = '400 11px "Inter", Arial, sans-serif'; ctx.letterSpacing = "3px";
    ctx.fillText("MEDICINA ESTÉTICA · LOS ÁNGELES", width / 2 + 3, 152); ctx.letterSpacing = "0px";

    // ===== Divisor con flor de loto =====
    ctx.strokeStyle = hexToRgba(goldDeep, 0.55); ctx.lineWidth = 1;
    ctx.beginPath(); ctx.moveTo(width / 2 - 90, 172); ctx.lineTo(width / 2 - 20, 172); ctx.stroke();
    ctx.beginPath(); ctx.moveTo(width / 2 + 20, 172); ctx.lineTo(width / 2 + 90, 172); ctx.stroke();
    ctx.fillStyle = goldDeep; drawDiamond(ctx, width / 2 - 102, 172, 4); drawDiamond(ctx, width / 2 + 102, 172, 4);
    drawLotus(ctx, width / 2, 172, 11, goldDeep);

    // ===== Panel central con relieve para el valor =====
    ctx.save();
    ctx.shadowColor = hexToRgba("#8a6d3b", 0.18); ctx.shadowBlur = 18; ctx.shadowOffsetY = 4;
    ctx.fillStyle = "#fffefb";
    roundRect(ctx, width / 2 - 215, 188, 430, 86, 16); ctx.fill();
    ctx.restore();
    ctx.strokeStyle = hexToRgba(goldDeep, 0.45); ctx.lineWidth = 1;
    roundRect(ctx, width / 2 - 215, 188, 430, 86, 16); ctx.stroke();
    // Rombos a los costados del panel
    ctx.fillStyle = hexToRgba(goldDeep, 0.6);
    drawDiamond(ctx, width / 2 - 233, 231, 5); drawDiamond(ctx, width / 2 + 233, 231, 5);

    // Valor / tratamiento dentro del panel
    ctx.textAlign = "center";
    if (g.tipo === "tratamiento") {
        let t = g.tratamiento || "Tratamiento";
        let fs = 30; if (t.length > 28) { fs = 23; if (t.length > 44) t = t.substring(0, 41) + "..."; } else if (t.length > 18) fs = 26;
        ctx.fillStyle = dark; ctx.font = `600 ${fs}px Georgia, serif`; ctx.fillText(t, width / 2, 232);
        ctx.fillStyle = goldDeep; ctx.font = '500 11px "Inter", Arial, sans-serif'; ctx.letterSpacing = "2px";
        ctx.fillText("TRATAMIENTO INCLUIDO", width / 2, 258); ctx.letterSpacing = "0px";
    } else {
        const amount = g.monto ? `${g.monto}` : "0";
        ctx.font = '700 50px "Inter", Arial, sans-serif';
        const aw = ctx.measureText(amount).width;
        ctx.fillStyle = goldDeep; ctx.font = '600 30px Georgia, serif';
        ctx.fillText("$", width / 2 - aw / 2 - 16, 238);
        ctx.fillStyle = dark; ctx.font = '700 50px "Inter", Arial, sans-serif';
        ctx.fillText(amount, width / 2 + 8, 240);
        ctx.fillStyle = goldDeep; ctx.font = '500 11px "Inter", Arial, sans-serif'; ctx.letterSpacing = "2px";
        ctx.fillText("PESOS CHILENOS", width / 2, 262); ctx.letterSpacing = "0px";
    }

    // ===== Mensaje (opcional) =====
    if (g.mensaje) {
        ctx.fillStyle = soft; ctx.font = 'italic 400 14px Georgia, serif'; ctx.textAlign = "center";
        const max = 56; const words = g.mensaje.split(" "); const lines: string[] = []; let cur = "";
        for (const w of words) { const tt = cur ? cur + " " + w : w; if (tt.length <= max) cur = tt; else { if (cur) lines.push(cur); cur = w; } }
        if (cur) lines.push(cur);
        if (lines.length > 1) { lines[0] = (lines[0] + " " + (lines[1] || "")).substring(0, max); lines.length = 1; }
        ctx.fillText(`“${lines[0]}”`, width / 2, 296);
    }

    // ===== PARA / DE =====
    const iy = 334; ctx.textAlign = "left";
    if (g.destinatario) {
        ctx.fillStyle = goldDeep; ctx.font = '600 10px "Inter", Arial, sans-serif'; ctx.letterSpacing = "2px"; ctx.fillText("PARA", 64, iy); ctx.letterSpacing = "0px";
        ctx.fillStyle = dark; ctx.font = '500 17px Georgia, serif';
        ctx.fillText(g.destinatario.length > 24 ? g.destinatario.substring(0, 21) + "..." : g.destinatario, 64, iy + 22);
    }
    if (g.remitente) {
        ctx.textAlign = "right";
        ctx.fillStyle = goldDeep; ctx.font = '600 10px "Inter", Arial, sans-serif'; ctx.letterSpacing = "2px"; ctx.fillText("DE", width - 64, iy); ctx.letterSpacing = "0px";
        ctx.fillStyle = dark; ctx.font = '500 17px Georgia, serif';
        ctx.fillText(g.remitente.length > 22 ? g.remitente.substring(0, 19) + "..." : g.remitente, width - 64, iy + 22);
        ctx.textAlign = "left";
    }
    // Flecha/línea central entre PARA y DE
    if (g.destinatario && g.remitente) {
        ctx.strokeStyle = hexToRgba(goldDeep, 0.4); ctx.lineWidth = 1;
        ctx.beginPath(); ctx.moveTo(width / 2 - 26, iy + 14); ctx.lineTo(width / 2 + 26, iy + 14); ctx.stroke();
        ctx.fillStyle = hexToRgba(goldDeep, 0.7); drawDiamond(ctx, width / 2, iy + 14, 4);
    }

    // ===== Divisor inferior degradado =====
    const dl = ctx.createLinearGradient(60, 0, width - 60, 0);
    dl.addColorStop(0, "transparent"); dl.addColorStop(0.2, hexToRgba(goldDeep, 0.5));
    dl.addColorStop(0.5, goldDeep); dl.addColorStop(0.8, hexToRgba(goldDeep, 0.5)); dl.addColorStop(1, "transparent");
    ctx.strokeStyle = dl; ctx.lineWidth = 1; ctx.beginPath(); ctx.moveTo(60, 380); ctx.lineTo(width - 60, 380); ctx.stroke();

    // ===== Código (pill con borde) + vencimiento =====
    if (g.codigo) {
        ctx.save();
        ctx.shadowColor = hexToRgba("#8a6d3b", 0.15); ctx.shadowBlur = 8; ctx.shadowOffsetY = 2;
        ctx.fillStyle = "#fffefb"; roundRect(ctx, 60, 392, 172, 32, 16); ctx.fill();
        ctx.restore();
        ctx.strokeStyle = hexToRgba(goldDeep, 0.55); ctx.lineWidth = 1; roundRect(ctx, 60, 392, 172, 32, 16); ctx.stroke();
        ctx.fillStyle = "#8a6d3b"; ctx.font = 'bold 14px "Courier New", monospace'; ctx.textAlign = "left"; ctx.fillText(g.codigo, 74, 413);
    }
    if (g.vencimiento) {
        const d = new Date(g.vencimiento + "T00:00:00");
        ctx.fillStyle = soft; ctx.font = '400 12px "Inter", Arial, sans-serif'; ctx.textAlign = "right";
        ctx.fillText(`Válida hasta: ${d.toLocaleDateString("es-CL", { day: "2-digit", month: "long", year: "numeric" })}`, width - 64, 412);
    }

    // ===== Footer =====
    ctx.fillStyle = soft; ctx.font = '400 11px "Inter", Arial, sans-serif'; ctx.textAlign = "center";
    ctx.fillText("Clínica Cialo  ·  www.cialo.cl  ·  Bulnes 220, Of. 509, Los Ángeles", width / 2, 444);
    ctx.fillStyle = hexToRgba(soft, 0.8); ctx.font = '300 9px "Inter", Arial, sans-serif';
    ctx.fillText("No canjeable por dinero  ·  Sujeta a disponibilidad  ·  Un solo uso  ·  60 días para agendar", width / 2, 461);
}

function renderCream(ctx: Ctx, width: number, height: number, colors: GiftStyle, g: GiftData, logo: HTMLImageElement | null) {
    const gold = colors.accentColor; const goldLight = colors.accentGradient[1];
    const darkText = colors.textColor; const secondary = colors.secondaryText;

    const bg = ctx.createLinearGradient(0, 0, width, height);
    bg.addColorStop(0, "#faf8f5"); bg.addColorStop(0.5, "#f8f4ec"); bg.addColorStop(1, "#f5f0e8");
    ctx.fillStyle = bg; roundRect(ctx, 0, 0, width, height, 24); ctx.fill();

    ctx.strokeStyle = gold; ctx.lineWidth = 3; ctx.lineCap = "round";
    ctx.beginPath(); ctx.moveTo(30, 80); ctx.quadraticCurveTo(30, 30, 80, 30); ctx.stroke();
    ctx.lineWidth = 1.5; ctx.strokeStyle = goldLight; ctx.beginPath(); ctx.moveTo(40, 75); ctx.quadraticCurveTo(40, 40, 75, 40); ctx.stroke();
    ctx.lineWidth = 3; ctx.strokeStyle = gold; ctx.beginPath(); ctx.moveTo(width - 80, height - 30); ctx.quadraticCurveTo(width - 30, height - 30, width - 30, height - 80); ctx.stroke();
    ctx.lineWidth = 1.5; ctx.strokeStyle = goldLight; ctx.beginPath(); ctx.moveTo(width - 75, height - 40); ctx.quadraticCurveTo(width - 40, height - 40, width - 40, height - 75); ctx.stroke();
    ctx.strokeStyle = gold; ctx.lineWidth = 2; roundRect(ctx, 20, 20, width - 40, height - 40, 18); ctx.stroke();

    if (logo && logo.complete && logo.naturalWidth > 0) {
        const lh = 55, lw = (logo.width / logo.height) * lh; ctx.drawImage(logo, (width - lw) / 2, 40, lw, lh);
    } else {
        ctx.fillStyle = darkText; ctx.font = 'bold 32px "Inter", Arial, sans-serif'; ctx.textAlign = "center"; ctx.fillText("CIALO", width / 2, 85);
    }

    ctx.strokeStyle = goldLight; ctx.lineWidth = 1; ctx.beginPath(); ctx.moveTo(width / 2 - 80, 115); ctx.lineTo(width / 2 - 15, 115); ctx.stroke();
    ctx.fillStyle = gold; drawDiamond(ctx, width / 2, 115, 6);
    ctx.beginPath(); ctx.moveTo(width / 2 + 15, 115); ctx.lineTo(width / 2 + 80, 115); ctx.stroke();

    ctx.fillStyle = gold; ctx.font = '300 52px Georgia, serif'; ctx.textAlign = "center"; ctx.letterSpacing = "8px"; ctx.fillText("GIFT CARD", width / 2, 170); ctx.letterSpacing = "0px";

    ctx.strokeStyle = goldLight; ctx.lineWidth = 1; ctx.beginPath(); ctx.moveTo(width / 2 - 60, 195); ctx.lineTo(width / 2 - 15, 195); ctx.stroke();
    drawLotus(ctx, width / 2, 195, 10, gold);
    ctx.beginPath(); ctx.moveTo(width / 2 + 15, 195); ctx.lineTo(width / 2 + 60, 195); ctx.stroke();

    ctx.fillStyle = secondary; ctx.font = '400 13px "Inter", Arial, sans-serif'; ctx.textAlign = "center"; ctx.letterSpacing = "4px";
    ctx.fillText("TU BIENESTAR. TU MEJOR VERSIÓN.", width / 2, 230); ctx.letterSpacing = "0px";

    const fy = 280; const lh = 55;
    ctx.textAlign = "left";
    ctx.fillStyle = secondary; ctx.font = '400 14px "Inter", sans-serif'; ctx.fillText("De:", 60, fy - 5);
    ctx.fillStyle = darkText; ctx.font = "italic 400 20px Georgia, serif"; ctx.fillText(g.remitente || "____________________", 120, fy - 5);
    ctx.strokeStyle = goldLight; ctx.lineWidth = 0.5; ctx.beginPath(); ctx.moveTo(60, fy + 10); ctx.lineTo(width - 60, fy + 10); ctx.stroke();

    ctx.fillStyle = secondary; ctx.font = '400 14px "Inter", sans-serif'; ctx.fillText("Para:", 60, fy + lh - 5);
    ctx.fillStyle = darkText; ctx.font = "italic 400 20px Georgia, serif"; ctx.fillText(g.destinatario || "____________________", 120, fy + lh - 5);
    ctx.beginPath(); ctx.moveTo(60, fy + lh + 10); ctx.lineTo(width - 60, fy + lh + 10); ctx.stroke();

    ctx.fillStyle = secondary; ctx.font = '400 14px "Inter", sans-serif'; ctx.fillText("Regalo:", 60, fy + lh * 2 - 5);
    ctx.fillStyle = darkText; ctx.font = "italic 400 20px Georgia, serif";
    const giftValue = g.tipo === "tratamiento" && g.tratamiento ? g.tratamiento : g.monto ? `$${g.monto}` : "____________________";
    ctx.fillText(giftValue, 135, fy + lh * 2 - 5);
    ctx.beginPath(); ctx.moveTo(60, fy + lh * 2 + 10); ctx.lineTo(width - 60, fy + lh * 2 + 10); ctx.stroke();

    const by = height - 90;
    ctx.strokeStyle = goldLight; ctx.lineWidth = 1; ctx.beginPath(); ctx.moveTo(width / 2 - 60, by); ctx.lineTo(width / 2 - 10, by); ctx.stroke();
    ctx.fillStyle = gold; drawDiamond(ctx, width / 2, by, 5);
    ctx.beginPath(); ctx.moveTo(width / 2 + 10, by); ctx.lineTo(width / 2 + 60, by); ctx.stroke();

    ctx.fillStyle = secondary; ctx.font = '400 11px "Inter", sans-serif'; ctx.textAlign = "center"; ctx.letterSpacing = "3px";
    ctx.fillText("CLÍNICA DE MEDICINA ESTÉTICA", width / 2, height - 65); ctx.letterSpacing = "0px";

    if (g.codigo || g.vencimiento) {
        ctx.fillStyle = hexToRgba(secondary, 0.7); ctx.font = '300 10px "Inter", sans-serif';
        let ft = "";
        if (g.codigo) ft += `Código: ${g.codigo}`;
        if (g.codigo && g.vencimiento) ft += "  •  ";
        if (g.vencimiento) ft += `Válida hasta: ${new Date(g.vencimiento + "T00:00:00").toLocaleDateString("es-CL")}`;
        ctx.fillText(ft, width / 2, height - 45);
    }
}

// Marca de agua "VISTA PREVIA" sobre el canvas visible (para que un pantallazo no sirva).
function addPreviewWatermark(canvas: HTMLCanvasElement) {
    const ctx: Ctx = canvas.getContext("2d");
    if (!ctx) return;
    ctx.setTransform(1, 0, 0, 1, 0, 0);
    ctx.save();
    ctx.globalAlpha = 0.55;
    ctx.translate(canvas.width / 2, canvas.height / 2);
    ctx.rotate(-Math.atan2(canvas.height, canvas.width));
    ctx.font = "bold 78px Arial, sans-serif";
    ctx.textAlign = "center";
    ctx.textBaseline = "middle";
    ctx.lineWidth = 3;
    const text = "VISTA PREVIA   •   VISTA PREVIA";
    for (let y = -canvas.height; y < canvas.height; y += 150) {
        ctx.strokeStyle = "rgba(0,0,0,0.35)";
        ctx.strokeText(text, 0, y);
        ctx.fillStyle = "rgba(255,255,255,0.55)";
        ctx.fillText(text, 0, y);
    }
    ctx.restore();
}

// Renderiza una versión LIMPIA (sin marca) a un canvas aparte y devuelve su PNG dataURL.
function renderCleanDataURL(g: GiftData, logos: { dark: HTMLImageElement | null; cream: HTMLImageElement | null }): string {
    const off = document.createElement("canvas");
    off.width = 1600; off.height = 1000;
    renderGiftCard(off, g, logos);
    return off.toDataURL("image/png");
}

// ====================================================================
// Helpers de formulario
// ====================================================================
const formatMonto = (raw: string) => {
    const v = raw.replace(/\D/g, "");
    return v ? parseInt(v, 10).toLocaleString("es-CL") : "";
};
const randomCode = () => {
    const chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
    const pick = (n: number) => Array.from({ length: n }, () => chars[Math.floor(Math.random() * chars.length)]).join("");
    return `GC-${pick(4)}-${pick(4)}`;
};
const API_URL = process.env.NEXT_PUBLIC_API_URL || "https://api.cialo.cl";

const tratamientosLista = tratamientosData
    .filter((t) => t.valorDesde && t.valorDesde > 0)
    .map((t) => ({ nombre: t.nombre, precio: t.valorDesde as number }))
    .sort((a, b) => a.nombre.localeCompare(b.nombre));

const PRESETS = [30000, 50000, 80000, 100000, 150000];

// ====================================================================
// Componente principal
// ====================================================================
export default function GiftCardDesigner() {
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const logoDark = useRef<HTMLImageElement | null>(null);
    const logoCream = useRef<HTMLImageElement | null>(null);
    const [logosReady, setLogosReady] = useState(0);

    // Vigencia automática: 60 días para agendar desde la compra.
    const defaultExpiry = (() => { const d = new Date(); d.setDate(d.getDate() + 60); return d.toISOString().slice(0, 10); })();

    const [g, setG] = useState<GiftData>({
        tipo: "valor", monto: "50.000", tratamiento: "", codigo: randomCode(),
        destinatario: "", remitente: "", mensaje: "", vencimiento: defaultExpiry, estilo: "cialo",
    });
    const [comprador, setComprador] = useState({ nombre: "", email: "", telefono: "" });
    const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
    const [errorMsg, setErrorMsg] = useState("");

    // Cargar logos
    useEffect(() => {
        const d = new Image(); d.crossOrigin = "anonymous"; d.onload = () => { logoDark.current = d; setLogosReady((n) => n + 1); }; d.src = "/logo-cialo-blanco.webp";
        const c = new Image(); c.crossOrigin = "anonymous"; c.onload = () => { logoCream.current = c; setLogosReady((n) => n + 1); }; c.src = "/logo-cialo.png";
    }, []);

    // Redibujar (con marca de agua VISTA PREVIA sobre el canvas visible)
    useEffect(() => {
        if (canvasRef.current) {
            renderGiftCard(canvasRef.current, g, { dark: logoDark.current, cream: logoCream.current });
            addPreviewWatermark(canvasRef.current);
        }
    }, [g, logosReady]);

    const set = <K extends keyof GiftData>(k: K, v: GiftData[K]) => setG((p) => ({ ...p, [k]: v }));

    const montoNumber = parseInt(g.monto.replace(/\D/g, ""), 10) || 0;

    // Precio efectivo: monto elegido, o precio referencial del tratamiento.
    const precioTratamiento = g.tipo === "tratamiento"
        ? (tratamientosLista.find((x) => x.nombre === g.tratamiento)?.precio ?? 0)
        : 0;
    const totalPagar = g.tipo === "tratamiento" ? precioTratamiento : montoNumber;

    const comprar = async () => {
        setErrorMsg("");
        if (!comprador.nombre || !comprador.email || !comprador.telefono) {
            setErrorMsg("Completa tus datos de comprador (nombre, email y teléfono).");
            return;
        }
        if (g.tipo === "valor" && montoNumber <= 0) { setErrorMsg("Ingresa un monto válido para la Gift Card."); return; }
        if (g.tipo === "tratamiento" && (!g.tratamiento || precioTratamiento <= 0)) { setErrorMsg("Selecciona un tratamiento."); return; }

        setStatus("loading");
        try {
            const valorLabel = g.tipo === "tratamiento" ? g.tratamiento : `$${g.monto}`;
            const [nombre, ...resto] = comprador.nombre.trim().split(/\s+/);
            const apellido = resto.join(" ") || "-";

            // 1) Crear la orden
            const order = await createOrder({
                customer: { nombre, apellido, email: comprador.email, telefono: comprador.telefono },
                items: [{
                    id: `giftcard-${g.codigo}`,
                    name: `Gift Card ${valorLabel} (${g.codigo})`,
                    price: totalPagar,
                    quantity: 1,
                    type: "producto",
                }],
                subtotal: totalPagar,
                total: totalPagar,
                notas: `Gift Card ${g.codigo} | Para: ${g.destinatario || "-"} | De: ${g.remitente || "-"}`,
            });
            if (!order) { setStatus("error"); setErrorMsg("No se pudo crear la orden. Intenta nuevamente."); return; }

            // 2) Dejar la Gift Card preparada (imagen limpia, se envía al confirmar el pago)
            const imagen = renderCleanDataURL(g, { dark: logoDark.current, cream: logoCream.current });
            const prepRes = await fetch(`${API_URL}/giftcard/prepare`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    order_id: order.id,
                    tipo: g.tipo, monto: totalPagar, tratamiento: g.tratamiento, codigo: g.codigo,
                    destinatario: g.destinatario, remitente: g.remitente, mensaje: g.mensaje,
                    vencimiento: g.vencimiento, estilo: STYLES[g.estilo].name, comprador, imagen,
                }),
            });
            const prep = await prepRes.json();
            if (!prep.success) { setStatus("error"); setErrorMsg(prep.message || "No se pudo preparar la Gift Card."); return; }

            // 3) Iniciar pago Webpay y redirigir
            const transbank = await initTransbankPayment(order.id);
            if (!transbank) { setStatus("error"); setErrorMsg("No se pudo iniciar el pago con Webpay. Intenta nuevamente."); return; }

            trackLead({ source: "giftcard", content_name: valorLabel, value: totalPagar });

            const form = document.createElement("form");
            form.method = "POST";
            form.action = transbank.url;
            const tokenInput = document.createElement("input");
            tokenInput.type = "hidden";
            tokenInput.name = "token_ws";
            tokenInput.value = transbank.token;
            form.appendChild(tokenInput);
            document.body.appendChild(form);
            form.submit();
        } catch { setStatus("error"); setErrorMsg("Error de conexión. Intenta nuevamente."); }
    };

    const inputCls = "w-full px-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-[#b8935f] focus:border-transparent outline-none transition-all";
    const labelCls = "block text-sm font-medium text-[#1b1a18] mb-2";

    return (
        <div className="grid lg:grid-cols-2 gap-8">
            {/* ----- Configuración ----- */}
            <div className="space-y-6">
                {/* Tipo */}
                <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
                    <h2 className="text-lg font-[family-name:var(--font-italiana)] text-[#1b1a18] mb-4">1. ¿Qué quieres regalar?</h2>
                    <div className="flex gap-3 mb-5">
                        {(["valor", "tratamiento"] as const).map((t) => (
                            <button key={t} onClick={() => set("tipo", t)}
                                className={`flex-1 p-4 border-2 rounded-xl text-center transition-all ${g.tipo === t ? "border-[#b8935f] bg-[#b8935f]/10" : "border-gray-200 hover:border-[#b8935f]/50"}`}>
                                <span className="font-medium text-[#1b1a18]">{t === "valor" ? "💰 Por monto" : "✨ Por tratamiento"}</span>
                                <p className="text-xs text-gray-500 mt-1">{t === "valor" ? "Un valor en pesos" : "Un tratamiento específico"}</p>
                            </button>
                        ))}
                    </div>

                    {g.tipo === "valor" ? (
                        <div>
                            <label className={labelCls}>Monto de la Gift Card</label>
                            <div className="relative mb-3">
                                <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500 font-medium">$</span>
                                <input value={g.monto} onChange={(e) => set("monto", formatMonto(e.target.value))} placeholder="50.000" className={`${inputCls} pl-8`} inputMode="numeric" />
                            </div>
                            <div className="flex flex-wrap gap-2">
                                {PRESETS.map((p) => (
                                    <button key={p} onClick={() => set("monto", p.toLocaleString("es-CL"))}
                                        className="px-3 py-1.5 text-sm rounded-full bg-gray-100 hover:bg-[#b8935f]/20 text-[#1b1a18] transition-all">
                                        ${p.toLocaleString("es-CL")}
                                    </button>
                                ))}
                            </div>
                        </div>
                    ) : (
                        <div>
                            <label className={labelCls}>Tratamiento</label>
                            <TreatmentCombobox value={g.tratamiento} onSelect={(v) => set("tratamiento", v)} inputCls={inputCls} />
                            {g.tratamiento && (() => {
                                const tr = tratamientosLista.find((x) => x.nombre === g.tratamiento);
                                return tr ? <p className="text-sm text-gray-500 mt-2">Valor referencial: <strong>${tr.precio.toLocaleString("es-CL")}</strong></p> : null;
                            })()}
                        </div>
                    )}
                </div>

                {/* Personalización */}
                <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
                    <h2 className="text-lg font-[family-name:var(--font-italiana)] text-[#1b1a18] mb-4">2. Personalízala</h2>
                    <div className="grid sm:grid-cols-2 gap-4">
                        <div><label className={labelCls}>Para (destinatario)</label><input value={g.destinatario} onChange={(e) => set("destinatario", e.target.value)} placeholder="Nombre de quien recibe" className={inputCls} /></div>
                        <div><label className={labelCls}>De (remitente)</label><input value={g.remitente} onChange={(e) => set("remitente", e.target.value)} placeholder="Tu nombre" className={inputCls} /></div>
                        <div className="sm:col-span-2">
                            <label className={labelCls}>Mensaje (opcional)</label>
                            <textarea value={g.mensaje} onChange={(e) => set("mensaje", e.target.value.slice(0, 100))} rows={2} placeholder="Un mensaje especial…" className={`${inputCls} resize-none`} />
                            <p className="text-xs text-gray-400 mt-1">{g.mensaje.length}/100</p>
                        </div>
                        <div>
                            <label className={labelCls}>Código</label>
                            <div className="flex gap-2">
                                <input value={g.codigo} onChange={(e) => set("codigo", e.target.value.toUpperCase())} maxLength={14} className={`${inputCls} uppercase`} />
                                <button onClick={() => set("codigo", randomCode())} className="px-4 py-3 bg-gray-100 hover:bg-gray-200 rounded-lg text-gray-700" title="Generar código">🔀</button>
                            </div>
                        </div>
                        <div>
                            <label className={labelCls}>Válida hasta</label>
                            <div className={`${inputCls} bg-[#faf6ef] flex items-center justify-between text-[#1b1a18]`}>
                                <span>{new Date(g.vencimiento + "T00:00:00").toLocaleDateString("es-CL", { day: "2-digit", month: "long", year: "numeric" })}</span>
                                <span className="text-xs text-gray-500">automático</span>
                            </div>
                            <p className="text-xs text-gray-400 mt-1">Vigencia de 60 días para agendar.</p>
                        </div>
                        <div className="sm:col-span-2">
                            <label className={labelCls}>Estilo de diseño</label>
                            <select value={g.estilo} onChange={(e) => set("estilo", e.target.value as StyleKey)} className={`${inputCls} bg-white`}>
                                <option value="cialo">🤍 Cialo (claro · recomendado)</option>
                                <option value="elegant">✨ Luxury Gold</option>
                                <option value="modern">🌸 Rose Gold</option>
                                <option value="classic">🌊 Ocean Blue</option>
                                <option value="dark">🌙 Midnight Purple</option>
                                <option value="cream">🥂 Cream Elegance</option>
                            </select>
                        </div>
                    </div>
                </div>
            </div>

            {/* ----- Preview + Compra ----- */}
            <div className="space-y-6">
                <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
                    <h2 className="text-lg font-[family-name:var(--font-italiana)] text-[#1b1a18] mb-4">Vista previa</h2>
                    <div className="bg-gray-100 rounded-lg p-4 flex justify-center select-none">
                        <canvas
                            ref={canvasRef}
                            width={1600}
                            height={1000}
                            onContextMenu={(e) => e.preventDefault()}
                            className="max-w-full h-auto rounded-lg shadow-lg pointer-events-none select-none"
                            style={{ WebkitUserSelect: "none", userSelect: "none" }}
                        />
                    </div>
                    <p className="text-xs text-gray-500 mt-3 text-center">
                        🔒 Esto es solo una vista previa. La Gift Card válida (sin marca de agua) se envía por correo al completar la compra.
                    </p>
                </div>

                {/* Compra */}
                <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
                    <h2 className="text-lg font-[family-name:var(--font-italiana)] text-[#1b1a18] mb-4">3. Tus datos y pago</h2>
                    <div className="space-y-4">
                        <div><label className={labelCls}>Tu nombre *</label><input value={comprador.nombre} onChange={(e) => setComprador((p) => ({ ...p, nombre: e.target.value }))} className={inputCls} placeholder="Nombre y apellido" /></div>
                        <div className="grid sm:grid-cols-2 gap-4">
                            <div><label className={labelCls}>Email *</label><input type="email" value={comprador.email} onChange={(e) => setComprador((p) => ({ ...p, email: e.target.value }))} className={inputCls} placeholder="tu@email.com" /></div>
                            <div><label className={labelCls}>Teléfono *</label><input type="tel" value={comprador.telefono} onChange={(e) => setComprador((p) => ({ ...p, telefono: e.target.value }))} className={inputCls} placeholder="+56 9 ..." /></div>
                        </div>

                        <div className="bg-[#faf6ef] rounded-lg p-4 flex items-center justify-between">
                            <span className="text-gray-600">Total a pagar</span>
                            <span className="text-2xl font-[family-name:var(--font-italiana)] text-[#1b1a18]">${totalPagar.toLocaleString("es-CL")}</span>
                        </div>

                        {errorMsg && <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg text-sm">{errorMsg}</div>}

                        <button onClick={comprar} disabled={status === "loading"}
                            className="w-full bg-[#1b1a18] text-white py-4 font-semibold uppercase tracking-wider hover:bg-[#b8935f] hover:text-[#1b1a18] transition-all disabled:opacity-50 disabled:cursor-not-allowed rounded-lg flex items-center justify-center gap-2">
                            {status === "loading" ? "Conectando con Webpay…" : "💳 Pagar con Webpay"}
                        </button>
                        <p className="text-xs text-gray-400 text-center">
                            🔒 Pago seguro con Webpay (Transbank). Al confirmarse el pago, tu Gift Card llega automáticamente a tu correo y a la clínica.
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
}

// Combobox de tratamientos con búsqueda: escribe para filtrar, clic para seleccionar.
function TreatmentCombobox({ value, onSelect, inputCls }: { value: string; onSelect: (v: string) => void; inputCls: string }) {
    const [query, setQuery] = useState(value);
    const [open, setOpen] = useState(false);
    const boxRef = useRef<HTMLDivElement>(null);

    // Sincronizar si el valor cambia desde afuera
    useEffect(() => { setQuery(value); }, [value]);

    // Cerrar al hacer clic fuera
    useEffect(() => {
        const onDocClick = (e: MouseEvent) => {
            if (boxRef.current && !boxRef.current.contains(e.target as Node)) setOpen(false);
        };
        document.addEventListener("mousedown", onDocClick);
        return () => document.removeEventListener("mousedown", onDocClick);
    }, []);

    const norm = (s: string) => s.toLowerCase().normalize("NFD").replace(/[̀-ͯ]/g, "");
    const filtered = query.trim()
        ? tratamientosLista.filter((t) => norm(t.nombre).includes(norm(query.trim())))
        : tratamientosLista;

    return (
        <div ref={boxRef} className="relative">
            <div className="relative">
                <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400">
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-4.35-4.35M17 11a6 6 0 11-12 0 6 6 0 0112 0z" />
                    </svg>
                </span>
                <input
                    value={query}
                    onChange={(e) => { setQuery(e.target.value); setOpen(true); if (value) onSelect(""); }}
                    onFocus={() => setOpen(true)}
                    placeholder="Busca un tratamiento… (ej: depilación, botox)"
                    className={`${inputCls} pl-10 ${value ? "border-[#b8935f] bg-[#b8935f]/5" : ""}`}
                />
                {query && (
                    <button
                        onClick={() => { setQuery(""); onSelect(""); setOpen(true); }}
                        className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
                        title="Limpiar"
                    >✕</button>
                )}
            </div>

            {open && (
                <div className="absolute z-30 mt-1 w-full bg-white border border-gray-200 rounded-lg shadow-xl max-h-64 overflow-y-auto">
                    {filtered.length === 0 ? (
                        <p className="px-4 py-3 text-sm text-gray-500">Sin resultados para “{query}”.</p>
                    ) : (
                        filtered.map((t) => (
                            <button
                                key={t.nombre}
                                onClick={() => { onSelect(t.nombre); setQuery(t.nombre); setOpen(false); }}
                                className={`w-full text-left px-4 py-2.5 text-sm hover:bg-[#b8935f]/10 transition-colors flex items-center justify-between gap-3 ${value === t.nombre ? "bg-[#b8935f]/15" : ""}`}
                            >
                                <span className="text-[#1b1a18]">{t.nombre}</span>
                                <span className="text-[#8a6d3b] font-medium whitespace-nowrap">${t.precio.toLocaleString("es-CL")}</span>
                            </button>
                        ))
                    )}
                </div>
            )}
        </div>
    );
}

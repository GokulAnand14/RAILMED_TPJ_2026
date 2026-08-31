import QRCode from "qrcode";

/**
 * Canonical Public Production URL for RAILMED TPJ 2026 Conclave.
 * Used for all generated QR codes, mobile smartphone scans, printed invitations, and PDFs.
 */
export const DEFAULT_PRODUCTION_URL = "https://railmed-tpj-2026.vercel.app";

/**
 * Detects if the current environment is localhost or a private local network IP.
 */
export const isLocalEnvironment = () => {
  if (typeof window === "undefined" || !window.location || !window.location.hostname) {
    return true;
  }
  const host = window.location.hostname.toLowerCase();
  return (
    host === "localhost" ||
    host === "127.0.0.1" ||
    host === "0.0.0.0" ||
    host === "::1" ||
    host.endsWith(".local") ||
    host.startsWith("192.168.") ||
    host.startsWith("10.") ||
    host.startsWith("172.16.") ||
    host.startsWith("172.17.") ||
    host.startsWith("172.18.") ||
    host.startsWith("172.19.") ||
    host.startsWith("172.20.") ||
    host.startsWith("172.21.") ||
    host.startsWith("172.22.") ||
    host.startsWith("172.23.") ||
    host.startsWith("172.24.") ||
    host.startsWith("172.25.") ||
    host.startsWith("172.26.") ||
    host.startsWith("172.27.") ||
    host.startsWith("172.28.") ||
    host.startsWith("172.29.") ||
    host.startsWith("172.30.") ||
    host.startsWith("172.31.")
  );
};

/**
 * Returns the canonical public URL for the standalone Pocket Timetable.
 * If running on localhost / dev server, it ALWAYS returns the public production URL
 * so that all generated QR codes, copied links, and printed invitations scan successfully on smartphones!
 */
export const getTimetableUrl = () => {
  // Check Vite environment variable if explicitly configured
  if (typeof import.meta !== "undefined" && import.meta.env && import.meta.env.VITE_PUBLIC_URL) {
    const base = import.meta.env.VITE_PUBLIC_URL.replace(/\/$/, "");
    return `${base}/#timetable`;
  }

  if (typeof window !== "undefined" && window.location && window.location.origin) {
    // When running locally in dev mode, ALWAYS encode the live public URL instead of localhost
    if (isLocalEnvironment()) {
      return `${DEFAULT_PRODUCTION_URL}/#timetable`;
    }
    const origin = window.location.origin;
    const pathname = window.location.pathname.replace(/\/$/, "");
    return `${origin}${pathname}/#timetable`;
  }
  return `${DEFAULT_PRODUCTION_URL}/#timetable`;
};

/**
 * Generates a high-quality Data URL (Base64 PNG) for a given QR text / URL.
 */
export const generateQRCodeDataURL = async (text, options = {}) => {
  try {
    const targetUrl = text || getTimetableUrl();
    return await QRCode.toDataURL(targetUrl, {
      width: options.width || 360,
      margin: options.margin !== undefined ? options.margin : 2,
      color: {
        dark: options.darkColor || "#040e24",
        light: options.lightColor || "#ffffff",
      },
      errorCorrectionLevel: "H",
    });
  } catch (err) {
    console.error("Failed to generate QR Code:", err);
    return null;
  }
};

/**
 * Trigger a download of the QR Code image file for print invitations / graphic design.
 */
export const downloadQRCodeImage = async (filename = "RAILMED_TPJ_2026_Timetable_QRCode.png", text = null) => {
  try {
    const url = text || getTimetableUrl();
    const dataUrl = await generateQRCodeDataURL(url, { width: 800, margin: 2 });
    if (!dataUrl) return false;

    const link = document.createElement("a");
    link.href = dataUrl;
    link.download = filename;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    return true;
  } catch (err) {
    console.error("Failed to download QR code image:", err);
    return false;
  }
};

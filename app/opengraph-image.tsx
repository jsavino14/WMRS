import { ImageResponse } from "next/og";

export const runtime = "edge";
export const alt = "WMRS – Waste cost reduction for multi-location businesses.";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

// ── Wordmark ────────────────────────────────────────────────────────────────
// The original SVG uses class="st0" driven by a <style> block. Satori does not
// process stylesheet rules inside SVG, so fill="white" is applied directly to
// every element here.
//
// Approach: URL-encoded SVG in a CSS background-image. Satori's <img> SVG
// support is unreliable; background-image: url() with a data URI is more
// consistent across Satori versions.
//
// viewBox 324.42 × 57.08 → at 200px wide: height = round(200 × 57.08 / 324.42) = 35px
const WORDMARK_SVG =
  '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 324.42 57.08">' +
  '<path fill="white" d="M254.39,10.17c2.14,5.02,2.37,11.46,1.61,16.92-.44,3.17-1.48,6.07-3.34,8.58h-55.56s0-35.09,0-35.09h41.51c2.69.21,5.03.61,7.47,1.51,3.76,1.46,6.68,4.26,8.31,8.09ZM239.61,24.56c.6-2.08.51-4.46-.21-6.38-.62-1.66-2.22-2.24-3.84-2.49l-21.84-.02v12.02s21.64-.02,21.64-.02c1.9-.28,3.66-1.03,4.25-3.11Z"/>' +
  '<path fill="white" d="M293.82,21.94l13.31.56c3.52.15,6.92.86,10.12,2.25s5.58,4.14,6.45,7.71l.56,3.2h-18.2s-24-.47-24-.47c-3.35-.07-6.47-.7-9.53-1.83-3.7-1.36-6.23-4.29-7.13-8.32-.96-4.33-.93-8.86-.04-13.26s3.93-8.19,8.09-9.87c2.94-1.18,5.96-1.91,9.17-1.91h22.88c3.45,0,6.75.68,9.89,1.91,6.28,2.46,7.81,8.74,7.44,15.59h-15.81c.1-2.27-1.35-3.89-3.51-4.02-6.28-.37-12.6-.37-18.86.04-2.39.16-3.82,1.83-3.81,4.14,0,1.89,1.07,3.51,3.02,3.64l9.96.63Z"/>' +
  '<polygon fill="white" points="169.07 35.67 169.02 25.74 163.67 35.67 146.49 35.67 164.22 .56 185.88 .57 185.89 35.67 169.07 35.67"/>' +
  '<polygon fill="white" points="127.03 35.66 121.52 25.71 121.47 35.67 104.83 35.67 104.85 .57 126.5 .57 135.12 17.29 143.89 35.68 127.03 35.66"/>' +
  '<polygon fill="white" points="52.01 35.69 48.3 23.59 44.66 35.66 30.22 35.67 40.37 .59 56.15 .56 66.24 35.66 52.01 35.69"/>' +
  '<path fill="white" d="M281.09,56.76c-7.05-.34-14.02-2.49-15.75-9.97-.55-2.38-.63-4.7-.56-7.27h15.81c-.33,2.31,1.01,4.23,3.21,4.29l12.51.32,8.13-.27c.99-.03,2.16-.68,2.62-1.33.72-1,.76-2.19.7-3.47h16.67c.09,6.52-1.27,12.84-7.28,15.48-3.05,1.34-6.28,1.97-9.69,2.16-8.82.51-17.52.48-26.36.05Z"/>' +
  '<polygon fill="white" points="85.33 35.65 67.89 35.68 78.47 .58 96.66 .57 85.33 35.65"/>' +
  '<polygon fill="white" points="28.62 35.65 11.28 35.68 0 .59 18.06 .56 28.62 35.65"/>' +
  '<polygon fill="white" points="38.48 56.12 17.97 56.14 12.39 39.06 43.61 39.06 38.48 56.12"/>' +
  '<polygon fill="white" points="78.62 56.12 58.13 56.13 53.02 39.06 84.18 39.06 78.62 56.12"/>' +
  '<polygon fill="white" points="152.8 56.1 138.01 56.13 128.9 39.06 161.85 39.06 152.8 56.1"/>' +
  '<polygon fill="white" points="260.05 56.02 240.67 56.02 232.28 38.94 251.58 38.92 260.05 56.02"/>' +
  '<polygon fill="white" points="185.88 56.11 169.09 56.14 169.06 39.06 185.89 39.06 185.88 56.11"/>' +
  '<polygon fill="white" points="121.49 56.11 104.84 56.14 104.84 39.06 121.49 39.06 121.49 56.11"/>' +
  '<polygon fill="white" points="213.73 55.99 197.11 56.04 197.09 38.93 213.72 38.93 213.73 55.99"/>' +
  "</svg>";

const LOGO_W = 200;
const LOGO_H = 35; // round(200 × 57.08 / 324.42)

// ── Font loading ─────────────────────────────────────────────────────────────
// next/og does not pick up next/font — the font must be fetched and passed in
// the ImageResponse fonts option.
//
// Pattern: request the Google Fonts CSS for the given weight, extract the
// woff2 URL (Latin subset is always last in the CSS), then fetch the binary.
async function loadInterFont(weight: 400 | 900): Promise<ArrayBuffer> {
  const css = await fetch(
    `https://fonts.googleapis.com/css2?family=Inter:wght@${weight}&display=swap`,
    {
      headers: {
        // A desktop Chrome UA ensures Google returns woff2, not woff or ttf.
        "User-Agent":
          "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36",
      },
    },
  ).then((r) => r.text());

  // Google Fonts CSS lists subsets in order; Latin is always last.
  const matches = [...css.matchAll(/src: url\((.+?)\) format\('woff2'\)/g)];
  const url = matches[matches.length - 1]?.[1];
  if (!url) throw new Error(`Could not extract Inter ${weight} URL from Google Fonts CSS`);

  return fetch(url).then((r) => r.arrayBuffer());
}

// ── Image ────────────────────────────────────────────────────────────────────

export default async function Image() {
  const [interBlack, interRegular] = await Promise.all([
    loadInterFont(900),
    loadInterFont(400),
  ]);

  // URL-encoded data URI — more reliable than base64 in Satori's background-image
  const logoSrc = `data:image/svg+xml,${encodeURIComponent(WORDMARK_SVG)}`;

  return new ImageResponse(
    (
      <div
        style={{
          background: "#1E2428",
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          alignItems: "flex-start",
          justifyContent: "flex-start",
          padding: "72px",
          position: "relative",
        }}
      >
        {/* Wordmark — rendered via background-image, not <img>, for Satori compatibility */}
        <div
          style={{
            width: LOGO_W,
            height: LOGO_H,
            backgroundImage: `url("${logoSrc}")`,
            backgroundSize: "contain",
            backgroundRepeat: "no-repeat",
            backgroundPosition: "left top",
            flexShrink: 0,
          }}
        />

        {/* Green accent rule */}
        <div
          style={{
            width: 80,
            height: 2,
            background: "#2E7D4F",
            marginTop: 52,
            marginBottom: 52,
            flexShrink: 0,
          }}
        />

        {/* Headline */}
        <div
          style={{
            color: "white",
            fontSize: 76,
            fontFamily: "Inter",
            fontWeight: 900,
            lineHeight: 1.05,
            maxWidth: 950,
          }}
        >
          You're probably overpaying for trash.
        </div>

        {/* Subline */}
        <div
          style={{
            color: "rgba(255,255,255,0.6)",
            fontSize: 30,
            fontFamily: "Inter",
            fontWeight: 400,
            lineHeight: 1.4,
            marginTop: 28,
          }}
        >
          Free audit. No upfront cost. 50/50 savings split.
        </div>

        {/* Domain — pinned to bottom left */}
        <div
          style={{
            position: "absolute",
            bottom: 72,
            left: 72,
            color: "rgba(255,255,255,0.45)",
            fontSize: 26,
            fontFamily: "Inter",
            fontWeight: 400,
          }}
        >
          wmrservice.com
        </div>
      </div>
    ),
    {
      ...size,
      fonts: [
        { name: "Inter", data: interBlack, style: "normal", weight: 900 },
        { name: "Inter", data: interRegular, style: "normal", weight: 400 },
      ],
    },
  );
}

import { ImageResponse } from "next/og";
import { readFileSync } from "fs";
import { join } from "path";

export const runtime = "nodejs";

export const alt = "Nas.Create — Visual Storyteller";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default async function Image() {
  const logoData = readFileSync(
    join(process.cwd(), "public/logos/cropped-darkmode-wordmark.png")
  );
  const logoSrc = `data:image/png;base64,${logoData.toString("base64")}`;

  return new ImageResponse(
    (
      <div
        style={{
          width: "1200px",
          height: "630px",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          background: "#0a0a0a",
          position: "relative",
          overflow: "hidden",
        }}
      >
        {/* Radial depth gradient — subtle emerald glow at centre */}
        <div
          style={{
            position: "absolute",
            inset: 0,
            background:
              "radial-gradient(ellipse 70% 60% at 50% 50%, rgba(0,200,150,0.06) 0%, rgba(10,10,10,0) 70%)",
            display: "flex",
          }}
        />
        {/* Vignette */}
        <div
          style={{
            position: "absolute",
            inset: 0,
            background:
              "radial-gradient(ellipse 100% 100% at 50% 50%, transparent 40%, rgba(0,0,0,0.7) 100%)",
            display: "flex",
          }}
        />
        {/* Wordmark — scaled to fit with generous padding */}
        {/* Original: 1366×772, scaled to fit 1080×611 at centre */}
        <img
          src={logoSrc}
          width={1080}
          height={611}
          style={{ objectFit: "contain", position: "relative" }}
        />
      </div>
    ),
    { ...size }
  );
}

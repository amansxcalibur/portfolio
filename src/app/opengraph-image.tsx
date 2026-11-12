import { ImageResponse } from "next/og";
import { readFileSync } from "node:fs";
import { join } from "node:path";

export const alt = "Aman Valiyakath: art and programming";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

// static cuts of google sans flex: the og renderer can't do variable fonts or woff2.
// read sync on purpose, async fs reads would stop next from prerendering this at build
const read = (file: string) => readFileSync(join(process.cwd(), "src/app", file));

export default function Image() {
  const display = read("_og/flex-display.ttf");
  const accent = read("_og/flex-accent.ttf");
  const body = read("_og/flex-body.ttf");
  const icon = read("icon.svg").toString();
  // the favicon's shape, in the cobalt theme's yellow
  const shape = `data:image/svg+xml;base64,${Buffer.from(icon.replace("#1b34f2", "#ffd84d")).toString("base64")}`;

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          padding: "72px 80px",
          background: "#1b34f2",
          color: "#f4f6ff",
          position: "relative",
          overflow: "hidden",
        }}
      >
        <img
          src={shape}
          width={440}
          height={440}
          alt=""
          style={{ position: "absolute", top: -110, right: -90 }}
        />
        <div style={{ fontFamily: "body", fontSize: 26, letterSpacing: 6, color: "#c3ccff" }}>
          ART × CODE
        </div>
        <div style={{ display: "flex", flexDirection: "column" }}>
          <div style={{ display: "flex", fontFamily: "display", fontSize: 168, lineHeight: 1 }}>
            Aman&nbsp;<span style={{ fontFamily: "accent" }}>Valiyakath</span>
          </div>
          <div style={{ fontFamily: "body", fontSize: 34, marginTop: 28, color: "#c3ccff" }}>
            Linux desktops, UI tooling, visual art and animation.
          </div>
        </div>
      </div>
    ),
    {
      ...size,
      fonts: [
        { name: "display", data: display, weight: 300 },
        { name: "accent", data: accent, weight: 300 },
        { name: "body", data: body, weight: 400 },
      ],
    },
  );
}

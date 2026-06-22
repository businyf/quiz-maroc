import { ImageResponse } from "next/og"
import { readFile } from "fs/promises"
import { join } from "path"

export async function GET(request) {
  const { searchParams } = new URL(request.url)
  const country = searchParams.get("country") || "morocco"
  const titleAr = searchParams.get("titleAr") || ""
  const desc = searchParams.get("desc") || ""

  const fontData = await readFile(
    join(process.cwd(), "public/fonts/NotoSansArabic.ttf")
  )

  const flagUrl = `https://flagcdn.com/w160/${getFlagCode(country)}.png`

  return new ImageResponse(
    (
      <div style={{
        width: "1200px",
        height: "630px",
        background: "#EDE9FE",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        padding: "60px",
      }}>
        <div style={{
          background: "white",
          borderRadius: "32px",
          padding: "50px 80px",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          width: "100%",
        }}>
          <img
            src={flagUrl}
            width="120"
            height="80"
            style={{ borderRadius: "8px", marginBottom: "16px" }}
          />
          <div style={{
            fontSize: "26px",
            color: "#7C3AED",
            marginBottom: "8px",
            fontFamily: "NotoSansArabic",
          }}>
            جنسيتي الافتراضية
          </div>
          <div style={{
            fontSize: "56px",
            fontWeight: "bold",
            color: "#5B21B6",
            marginBottom: "16px",
            fontFamily: "NotoSansArabic",
          }}>
            {titleAr}
          </div>
          <div style={{
            fontSize: "20px",
            color: "#6D28D9",
            textAlign: "center",
            maxWidth: "900px",
            lineHeight: "1.6",
            fontFamily: "NotoSansArabic",
          }}>
            {desc}
          </div>
          <div style={{
            marginTop: "24px",
            fontSize: "18px",
            color: "#A78BFA",
          }}>
            funyai.org
          </div>
        </div>
      </div>
    ),
    {
      width: 1200,
      height: 630,
      fonts: [{ name: "NotoSansArabic", data: fontData, style: "normal" }],
    }
  )
}

function getFlagCode(country) {
  const codes = {
    japan: "jp",
    france: "fr",
    brazil: "br",
    italy: "it",
    sweden: "se",
    germany: "de",
    usa: "us",
    korea: "kr",
    morocco: "ma",
    turkey: "tr",
  }
  return codes[country] || "ma"
}
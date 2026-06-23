import { ImageResponse } from "next/og"

export const runtime = "edge"

export async function GET(request) {
  try {
    const { searchParams } = new URL(request.url)
    const country = searchParams.get("country") || "morocco"
    const titleAr = searchParams.get("titleAr") || ""
    const desc = searchParams.get("desc") || ""

    const fontData = await fetch(
      "https://fonts.googleapis.com/css2?family=Cairo&subset=arabic",
      { headers: { "User-Agent": "Mozilla/5.0" } }
    ).then(async (res) => {
      const css = await res.text()
      const fontUrl = css.match(/url\(([^)]+)\)/)?.[1]
      return fetch(fontUrl).then(r => r.arrayBuffer())
    })

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
          fontFamily: "Cairo",
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
              width="160"
              height="100"
              style={{ borderRadius: "8px", marginBottom: "20px" }}
            />
            <div style={{
              fontSize: "28px",
              color: "#7C3AED",
              marginBottom: "12px",
              fontFamily: "Cairo",
              writingMode: "horizontal-tb",
              textAlign: "center",
            }}>
              {"جنسيتي حسب الذكاء الإصطناعي".split("").reverse().join("")}
            </div>
            <div style={{
              fontSize: "64px",
              fontWeight: "bold",
              color: "#5B21B6",
              marginBottom: "24px",
              fontFamily: "Cairo",
              textAlign: "center",
            }}>
              {titleAr.split("").reverse().join("")}
            </div>
            <div style={{
              fontSize: "24px",
              color: "#6D28D9",
              textAlign: "center",
              maxWidth: "950px",
              lineHeight: "1.8",
              fontFamily: "Cairo",
            }}>
              {desc.split(" ").reverse().join(" ")}
            </div>
            <div style={{
              marginTop: "28px",
              fontSize: "20px",
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
        fonts: [{ name: "Cairo", data: fontData, style: "normal" }],
      }
    )
  } catch (e) {
    console.error("OG Error:", e)
    return new Response(`OG Error: ${e.message}`, { status: 500 })
  }
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

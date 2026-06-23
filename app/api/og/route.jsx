import { ImageResponse } from "next/og"

export const runtime = "edge"

export async function GET(request) {
  try {
    const { searchParams } = new URL(request.url)
    const country = searchParams.get("country") || "morocco"
    const titleAr = searchParams.get("titleAr") || ""
    const desc = searchParams.get("desc") || ""

    const fontData = await fetch(
      "https://fonts.googleapis.com/css2?family=Cairo:wght@700&subset=arabic",
      { headers: { "User-Agent": "Mozilla/5.0" } }
    ).then(async (res) => {
      const css = await res.text()
      const fontUrl = css.match(/url\(([^)]+)\)/)?.[1]
      return fetch(fontUrl).then(r => r.arrayBuffer())
    })

    const flagUrl = `https://flagcdn.com/w320/${getFlagCode(country)}.png`

    const subtitleWords = "جنسيتي حسب الذكاء الإصطناعي".split(" ").reverse()
    const descWords = desc.split(" ").reverse()

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
          padding: "40px",
          fontFamily: "Cairo",
        }}>
          <div style={{
            background: "white",
            borderRadius: "32px",
            padding: "40px 80px",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            width: "100%",
            boxShadow: "0 4px 32px rgba(124,58,237,0.10)",
          }}>
            <img
              src={flagUrl}
              width="180"
              height="120"
              style={{ borderRadius: "10px", marginBottom: "16px" }}
            />

            {/* Subtitle */}
            <div style={{
              display: "flex",
              flexDirection: "row",
              flexWrap: "wrap",
              justifyContent: "center",
              gap: "10px",
              marginBottom: "10px",
            }}>
              {subtitleWords.map((word, i) => (
                <span key={i} style={{
                  fontSize: "32px",
                  color: "#7C3AED",
                  fontFamily: "Cairo",
                  fontWeight: "700",
                }}>{word}</span>
              ))}
            </div>

            {/* Title */}
            <div style={{
              fontSize: "80px",
              fontWeight: "700",
              color: "#4C1D95",
              marginBottom: "20px",
              fontFamily: "Cairo",
              textAlign: "center",
              lineHeight: "1.2",
            }}>
              {titleAr}
            </div>

            {/* Desc */}
            <div style={{
              display: "flex",
              flexDirection: "row",
              flexWrap: "wrap",
              justifyContent: "center",
              gap: "8px",
              maxWidth: "1000px",
            }}>
              {descWords.map((word, i) => (
                <span key={i} style={{
                  fontSize: "26px",
                  color: "#5B21B6",
                  fontFamily: "Cairo",
                  fontWeight: "700",
                }}>{word}</span>
              ))}
            </div>

            <div style={{
              marginTop: "24px",
              fontSize: "22px",
              color: "#A78BFA",
              fontFamily: "Cairo",
              fontWeight: "700",
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

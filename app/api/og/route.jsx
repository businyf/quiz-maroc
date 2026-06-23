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

    const flag = getFlagEmoji(country)
    const subtitleWords = "جنسيتي حسب الذكاء الإصطناعي".split(" ")
    const titleWords = titleAr.split(" ")
    const descWords = desc.split(" ")

    return new ImageResponse(
      (
        <div style={{
          width: "1200px",
          height: "630px",
          background: "#7C3AED",
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
          }}>

            <div style={{ fontSize: "90px", marginBottom: "8px", lineHeight: "1" }}>
              {flag}
            </div>

            <div style={{
              display: "flex",
              flexDirection: "row-reverse",
              flexWrap: "wrap",
              justifyContent: "center",
              gap: "10px",
              marginBottom: "8px",
              width: "100%",
            }}>
              {subtitleWords.map((word, i) => (
                <span key={i} style={{
                  fontSize: "34px",
                  color: "#6D28D9",
                  fontFamily: "Cairo",
                  fontWeight: "700",
                }}>{word}</span>
              ))}
            </div>

            <div style={{
              display: "flex",
              flexDirection: "row-reverse",
              flexWrap: "wrap",
              justifyContent: "center",
              gap: "16px",
              marginBottom: "16px",
              width: "100%",
            }}>
              {titleWords.map((word, i) => (
                <span key={i} style={{
                  fontSize: "90px",
                  fontWeight: "700",
                  color: "#3B0764",
                  fontFamily: "Cairo",
                  lineHeight: "1.2",
                }}>{word}</span>
              ))}
            </div>

            <div style={{
              display: "flex",
              flexDirection: "row-reverse",
              flexWrap: "wrap",
              justifyContent: "center",
              gap: "8px",
              width: "100%",
              maxWidth: "1000px",
            }}>
              {descWords.map((word, i) => (
                <span key={i} style={{
                  fontSize: "28px",
                  color: "#1E1B4B",
                  fontFamily: "Cairo",
                  fontWeight: "700",
                }}>{word}</span>
              ))}
            </div>

            <div style={{
              marginTop: "20px",
              fontSize: "22px",
              color: "#7C3AED",
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

function getFlagEmoji(country) {
  const emojis = {
    japan: "🇯🇵",
    france: "🇫🇷",
    brazil: "🇧🇷",
    italy: "🇮🇹",
    sweden: "🇸🇪",
    germany: "🇩🇪",
    usa: "🇺🇸",
    korea: "🇰🇷",
    morocco: "🇲🇦",
    turkey: "🇹🇷",
  }
  return emojis[country] || "🇲🇦"
}

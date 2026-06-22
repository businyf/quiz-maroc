import { ImageResponse } from "next/og"

export const runtime = "edge"

export async function GET(request) {
  try {
    const { searchParams } = new URL(request.url)
    const country = searchParams.get("country") || "morocco"
    const titleAr = searchParams.get("titleAr") || ""
    const desc = searchParams.get("desc") || ""

    const fontData = await fetch(
      new URL("https://www.funyai.org/fonts/NotoSansArabic.ttf")
    ).then(res => res.arrayBuffer())

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
          fontFamily: "NotoSansArabic",
        }}>
          <div style={{
            background: "white",
            borderRadius: "32px",
            padding: "50px 80px",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            width: "100%",
            direction: "rtl",
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
              fontFamily: "NotoSansArabic",
            }}>
              جنسيتي حسب الذكاء الإصطناعي
            </div>
            <div style={{
              fontSize: "60px",
              fontWeight: "bold",
              color: "#5B21B6",
              marginBottom: "24px",
              fontFamily: "NotoSansArabic",
            }}>
              {titleAr}
            </div>
            <div style={{
              fontSize: "22px",
              color: "#6D28D9",
              textAlign: "center",
              maxWidth: "900px",
              lineHeight: "1.7",
              fontFamily: "NotoSansArabic",
              direction: "rtl",
            }}>
              {desc}
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
        fonts: [{ name: "NotoSansArabic", data: fontData, style: "normal" }],
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

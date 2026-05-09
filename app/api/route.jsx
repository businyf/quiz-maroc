import { ImageResponse } from "next/og"

export const runtime = "edge"

export async function GET(request) {
  const { searchParams } = new URL(request.url)
  const flag = searchParams.get("flag") || "🌍"
  const title = searchParams.get("title") || "مغربي"
  const desc = searchParams.get("desc") || ""

  return new ImageResponse(
    (
      <div
        style={{
          width: "1200px",
          height: "630px",
          background: "#EDE9FE",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          padding: "60px",
        }}
      >
        <div
          style={{
            background: "white",
            borderRadius: "32px",
            padding: "60px 80px",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            width: "100%",
          }}
        >
          <div style={{ fontSize: "100px", marginBottom: "16px" }}>
            {flag}
          </div>
          <div style={{ fontSize: "32px", color: "#7C3AED", marginBottom: "12px" }}>
            جنسيتي الافتراضية
          </div>
          <div style={{ fontSize: "64px", fontWeight: "bold", color: "#5B21B6", marginBottom: "20px" }}>
            {title}
          </div>
          <div style={{ fontSize: "24px", color: "#6D28D9", textAlign: "center", maxWidth: "800px" }}>
            {desc}
          </div>
          <div style={{ marginTop: "32px", fontSize: "20px", color: "#A78BFA" }}>
            quiz-maroc.com — اكتشف جنسيتك أنت
          </div>
        </div>
      </div>
    ),
    { width: 1200, height: 630 }
  )
}
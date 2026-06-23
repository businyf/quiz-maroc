"use client"

import { results } from "../data/questions"
import { useRouter } from "next/navigation"
import { useEffect, useState, useRef } from "react"
import html2canvas from "html2canvas"

export default function ResultClient({ country }: { country: string }) {
  const result = results[country]
  const router = useRouter()
  const [aiJoke, setAiJoke] = useState("")
  const cardRef = useRef<HTMLDivElement>(null)

  const shareUrl = `https://www.funyai.org/result?country=${country}`
  const facebookShareUrl = `https://www.funyai.org/result?country=${country}&ref=fb`
  const shareText = `جنسيتي الافتراضية: ${result.flag} ${result.title}! اكتشف جنسيتك أنت`

  const shareImage = async () => {
    if (!cardRef.current) return
    const canvas = await html2canvas(cardRef.current, {
      scale: 2,
      useCORS: true,
      allowTaint: true,
      backgroundColor: "#EDE9FE",
      ignoreElements: (element) => {
        return element.tagName === "BUTTON"
      },
    })
    canvas.toBlob(async (blob) => {
      if (!blob) return
      const file = new File([blob], `jinsiyati-${country}.png`, { type: "image/png" })
      if (navigator.canShare && navigator.canShare({ files: [file] })) {
        await navigator.share({
          title: `جنسيتي الافتراضية: ${result.title}`,
          text: `جنسيتي الافتراضية: ${result.flag} ${result.title}!\nاكتشف جنسيتك أنت 👉 www.funyai.org`,
          files: [file],
        })
      } else {
        const link = document.createElement("a")
        link.download = `jinsiyati-${country}.png`
        link.href = canvas.toDataURL("image/png")
        link.click()
      }
    })
  }

  const shareWhatsapp = () => {
    window.open(`https://wa.me/?text=${encodeURIComponent(shareText + " " + shareUrl)}`)
  }

  const shareFacebook = () => {
    // Pre-scrape the URL so Facebook has it cached
    await fetch(`https://graph.facebook.com/?id=${encodeURIComponent(facebookShareUrl)}&scrape=true`, {
      method: "POST",
    }).catch(() => {})
    window.open(`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(facebookShareUrl)}`)
  }
  }

  const shareInstagram = () => {
    shareImage()
  }

  useEffect(() => {
    fetch("/api/result", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ country }),
    })
      .then((res) => res.json())
      .then((data) => { if (data.joke) setAiJoke(data.joke) })
      .catch(() => {})
  }, [country])

  return (
    <main className="min-h-screen bg-white flex flex-col items-center justify-center p-4" dir="rtl">
      <div className="w-full max-w-lg text-center">

        {/* البطاقة القابلة للتصوير */}
        <div
          ref={cardRef}
          style={{
            background: "#EDE9FE",
            borderRadius: "16px",
            padding: "32px",
            marginBottom: "24px",
            textAlign: "center",
            fontFamily: "Arial, sans-serif",
          }}
        >
          <div style={{ fontSize: "72px", marginBottom: "16px" }}>{result.flag}</div>
          <h1 style={{ fontSize: "22px", fontWeight: "bold", color: "#6D28D9", marginBottom: "12px" }}>
            جنسيتك حسب الذكاء الإصطناعي: {result.title}
          </h1>
          <p style={{ color: "#374151", fontWeight: "bold", fontSize: "18px", lineHeight: "1.6" }}>
            {result.desc}
          </p>
          {aiJoke && (
            <p style={{ color: "#DC2626", fontWeight: "bold", marginTop: "16px", fontSize: "18px" }}>
              ✨ {aiJoke}
            </p>
          )}
          <p style={{ color: "#C4B5FD", fontSize: "14px", marginTop: "24px" }}>funyai.org</p>
        </div>

        <div className="flex flex-col gap-3">

          <button
            onClick={shareWhatsapp}
            className="w-full bg-green-500 hover:bg-green-600 text-white py-3 rounded-xl font-medium transition flex items-center justify-center gap-2"
          >
            <span>💬</span> شارك على واتساب
          </button>

          <button
            onClick={shareFacebook}
            className="w-full bg-blue-600 hover:bg-blue-700 text-white py-3 rounded-xl font-medium transition flex items-center justify-center gap-2"
          >
            <span>👥</span> شارك على فيسبوك
          </button>

          <button
            onClick={shareInstagram}
            className="w-full bg-pink-500 hover:bg-pink-600 text-white py-3 rounded-xl font-medium transition flex items-center justify-center gap-2"
          >
            <span>📷</span> شارك على انستغرام
          </button>

          <button
            onClick={() => router.push("/quiz")}
            className="w-full border border-purple-400 text-purple-600 py-3 rounded-xl font-medium hover:bg-purple-50 transition"
          >
            🔄 جرب مرة أخرى
          </button>

          <button
            onClick={() => router.push("/")}
            className="w-full border border-gray-200 text-gray-500 py-3 rounded-xl font-medium hover:bg-gray-50 transition"
          >
            🏠 الصفحة الرئيسية
          </button>

        </div>
      </div>
    </main>
  )
}
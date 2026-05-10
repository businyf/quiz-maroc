"use client"

import { results } from "../data/questions"
import { useRouter } from "next/navigation"
import { useEffect, useState } from "react"

export default function ResultClient({ country }: { country: string }) {
  const result = results[country]
  const router = useRouter()
  const [aiJoke, setAiJoke] = useState("")

  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || "http://localhost:3000"
  const shareUrl =
  typeof window !== "undefined"
    ? `${window.location.origin}/result?country=${country}`
    : ""
  const shareText = `جنسيتي الافتراضية: ${result.flag} ${result.title}! اكتشف جنسيتك أنت`

  const shareWhatsapp = () => {
    window.open(`https://wa.me/?text=${encodeURIComponent(shareText + " " + shareUrl)}`)
  }

  const shareFacebook = () => {
  if (!shareUrl) return

  window.open(
    `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(shareUrl)}`,
    "_blank"
  )
}

  const shareInstagram = () => {
    navigator.clipboard.writeText(shareText + " " + shareUrl)
    alert("تم نسخ النص — افتح Instagram وشاركه في قصتك 📸")
  }
  useEffect(() => {
    fetch("/api/result", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ country }),
  })
    .then((res) => res.json())
    .then((data) => {
      if (data.joke) {
        setAiJoke(data.joke)
      }
    })
    .catch(() => {})
}, [country])

  return (
    <main className="min-h-screen bg-white flex flex-col items-center justify-center p-4" dir="rtl">
      <div className="w-full max-w-lg text-center">

        <div className="bg-purple-50 rounded-2xl p-8 mb-6">
          <div className="text-7xl mb-4">{result.flag}</div>
          <h1 className="text-2xl font-bold text-purple-700 mb-3">
            جنسيتك حسب الذكاء الإصطناعي: {result.title}
          </h1>
          <p className="text-black-600 font-bold mt-4 text-sm text-[20px] leading-relaxed">
             {result.desc}
          </p>
          {aiJoke && (
            <p className="text-red-600 font-bold mt-4 text-sm text-[20px]"> ✨ {aiJoke}</p>)}
        </div>

        <div className="flex flex-col gap-3">

          <button
            onClick={shareWhatsapp}
            className="w-full bg-green-500 hover:bg-green-600 text-white py-3 rounded-xl font-medium transition flex items-center justify-center gap-2"
          >
            <span>📤</span> شارك على واتساب
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
            <span>📸</span> شارك على انستغرام
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
"use client"
import { useRouter } from "next/navigation"

export default function Home() {
  const router = useRouter()
  return (
    <main className="min-h-screen flex flex-col items-center justify-center bg-white p-4">
      <h1 className="text-3xl font-bold text-purple-600 mb-4">
        جنسيتك حسب الذكاء الإصطناعي
        </h1>
      <p className="text-gray-500 mb-8">
       أجب عن 10 أسئلة , و أترك الذكاء الإصطناعي يخبرك بجنسيتك الإفتراضية
      </p>
      <button onClick={() => router.push("/quiz")}
      className="bg-purple-600 text-white px-8 py-3 rounded-full text-lg font-medium hover:bg-purple-700 transition"
      >
  ابدأ الاختبار
</button>
    </main>
  )
}
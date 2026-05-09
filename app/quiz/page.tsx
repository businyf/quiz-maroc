"use client"

import { useState } from "react"
import { questions } from "../data/questions"
import type { Scores } from "../data/questions"
import { useRouter } from "next/navigation"

export default function Quiz() {
  const [current, setCurrent] = useState(0)
  const [scores, setScores] = useState<Record<string, number>>({})
  const router = useRouter()

 const handleAnswer = (optionScores: Scores) => {
    const newScores = { ...scores }
    Object.entries(optionScores).forEach(([country, score]) => {
      newScores[country] = (newScores[country] || 0) + score
    })
    setScores(newScores)

    if (current + 1 < questions.length) {
      setCurrent(current + 1)
    } else {
      const winner = Object.entries(newScores).sort((a, b) => b[1] - a[1])[0][0]
      router.push(`/result?country=${winner}`)
    }
  }

  const question = questions[current]
  const progress = ((current) / questions.length) * 100

  return (
    <main className="min-h-screen bg-white flex flex-col items-center justify-center p-4" dir="rtl">
      
      <div className="w-full max-w-lg">

        <div className="flex justify-between text-sm text-gray-400 mb-2">
          <span>سؤال {current + 1} من {questions.length}</span>
        </div>

        <div className="w-full bg-gray-100 rounded-full h-2 mb-8">
          <div
            className="bg-purple-600 h-2 rounded-full transition-all duration-300"
            style={{ width: `${progress}%` }}
          />
        </div>

        <h2 className="text-xl font-bold text-gray-800 mb-6 text-center">
          {question.text}
        </h2>

        <div className="flex flex-col gap-3">
          {question.options.map((option, index) => (
            <button
              key={index}
              onClick={() => handleAnswer(option.scores)}
              className="w-full text-right bg-gray-50 hover:bg-purple-50 hover:border-purple-400 border border-gray-200 rounded-xl px-5 py-4 text-gray-700 font-medium transition-all duration-200"
            >
              {option.text}
            </button>
          ))}
        </div>

      </div>
    </main>
  )
}
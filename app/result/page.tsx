import { results } from "../data/questions"
import ResultClient from "./ResultClient"

export async function generateMetadata({ searchParams }: { searchParams: { country?: string } }) {
  const country = searchParams.country || "morocco"
  const result = results[country]
  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || "http://localhost:3000"

  const ogUrl = `${baseUrl}/api/og?flag=${encodeURIComponent(result.flag)}&title=${encodeURIComponent(result.titleEn)}`

  return {
    title: `جنسيتي الافتراضية: ${result.title} ${result.flag}`,
    description: result.desc,
    openGraph: {
      title: `جنسيتي الافتراضية: ${result.title} ${result.flag}`,
      description: result.desc,
      images: [{ url: ogUrl, width: 1200, height: 630 }],
    },
    twitter: {
      card: "summary_large_image",
      title: `جنسيتي الافتراضية: ${result.title} ${result.flag}`,
      description: result.desc,
      images: [ogUrl],
    },
  }
}

export default function ResultPage({ searchParams }: { searchParams: { country?: string } }) {
  const country = searchParams.country || "morocco"
  return <ResultClient country={country} />
}
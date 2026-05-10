import { results } from "../data/questions"
import ResultClient from "./ResultClient"

type Props = {
  searchParams: Promise<{ country?: string }>
}

export async function generateMetadata({ searchParams }: Props) {
  const params = await searchParams
  const country = params.country || "morocco"
  const result = results[country]
  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || "https://quiz-maroc.vercel.app"

  const ogUrl = `${baseUrl}/api/og?flag=${encodeURIComponent(result.flag)}&title=${encodeURIComponent(result.titleEn)}`

  return {
    title: `جنسيتي الافتراضية بالذكاء الإصطناعي: ${result.title} ${result.flag}`,
    description: result.desc,
    openGraph: {
      title: `جنسيتي الافتراضية بالذكاء الإصطناعي: ${result.title} ${result.flag}`,
      description: result.desc,
      images: [{ url: ogUrl, width: 1200, height: 630 }],
    },
  }
}

export default async function ResultPage({ searchParams }: Props) {
  const params = await searchParams
  const country = params.country || "morocco"
  return <ResultClient country={country} />
}
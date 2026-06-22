// app/result/page.tsx

import { results } from "../data/questions"
import ResultClient from "./ResultClient"

type Props = {
  searchParams: Promise<{ country?: string }>
}

export async function generateMetadata({ searchParams }: Props) {
  const params = await searchParams
  const country = params.country || "morocco"
  const result = results[country]
  const baseUrl = "https://www.funyai.org"

  // ✅ Pass: country, titleAr (= result.title), desc — matching what route.jsx reads
  const ogUrl = `${baseUrl}/api/og?country=${encodeURIComponent(country)}&titleAr=${encodeURIComponent(result.title)}&desc=${encodeURIComponent(result.desc)}`

  return {
    title: `جنسيتي بالذكاء الإصطناعي: ${result.title} ${result.flag}`,
    description: result.desc,
    openGraph: {
      title: `جنسيتي بالذكاء الإصطناعي: ${result.title} ${result.flag}`,
      description: result.desc,
      url: `${baseUrl}/result?country=${country}`,
      siteName: "FunyAI",
      images: [
        {
          url: ogUrl,
          width: 1200,
          height: 630,
          alt: `جنسيتي بالذكاء الإصطناعي: ${result.title}`,
        },
      ],
      type: "website",
    },
  }
}

export default async function ResultPage({ searchParams }: Props) {
  const params = await searchParams
  const country = params.country || "morocco"
  return <ResultClient country={country} />
}
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
  const ogUrl = `${baseUrl}/api/og?flag=${encodeURIComponent(result.flag)}&title=${encodeURIComponent(result.titleEn)}`

  return {
    title: `جنسيتي الافتراضية: ${result.title} ${result.flag}`,
    description: result.desc,
    openGraph: {
      title: `جنسيتي الافتراضية: ${result.title} ${result.flag}`,
      description: result.desc,
      url: `${baseUrl}/result?country=${country}`,
      siteName: "FunyAI",
      images: [
        {
          url: ogUrl,
          width: 1200,
          height: 630,
          alt: `جنسيتي الافتراضية: ${result.title}`,
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
import Groq from "groq-sdk"

const groq = new Groq({
  apiKey: process.env.GROQ_API_KEY,
})

export async function POST(req: Request) {
  try {
    const { country } = await req.json()

    const completion = await groq.chat.completions.create({
      model: "llama-3.3-70b-versatile",

      messages: [
        {
          role: "system",
          content:
            "أنت كوميدي محترف. اكتب جملة مضحكة قصيرة جداً باللغة العربية الفصحى.",
        },
        {
          role: "user",
          content: `
اكتب جملة كاملة مضحكة قصيرة جداً بلسان شخص مغربي و تخيل كيف يتصرف إن كانت جنسيته ${country}.
`,
        },
      ],

      temperature: 1,
      max_tokens: 70,
    })

    const text = completion.choices[0]?.message?.content

    return Response.json({
      joke: text || "",
    })
  } catch (error) {
    return Response.json({
      joke: "",
    })
  }
}
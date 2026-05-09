type Scores = {
  japan?: number
  france?: number
  brazil?: number
  italy?: number
  sweden?: number
  germany?: number
  usa?: number
  korea?: number
  morocco?: number
  turkey?: number
}

type Option = {
  text: string
  scores: Scores
}

type Question = {
  id: number
  text: string
  options: Option[]
}

type Result = {
  flag: string
  title: string
  titleEn: string
  desc: string
}
export const questions: Question[] = [
  {
    id: 1,
    text: "فين كايعجبك تقضي وقت فراغك؟",
    options: [
      { text: "فالبيت مع العائلة", scores: { japan: 3, italy: 2 } },
      { text: "في القهوة مع الأصحاب", scores: { france: 3, brazil: 2 } },
      { text: "في الطبيعة وحدي", scores: { sweden: 3, japan: 1 } },
      { text: "في الشارع أتجول مع الناس", scores: { brazil: 3, italy: 1 } },
    ],
  },
  {
    id: 2,
    text: "أشنو كتاكل فالصباح؟",
    options: [
      { text: "خبز وزيت وأتاي", scores: { morocco: 3, turkey: 1 } },
      { text: "عصير ليمون كبير", scores: { usa: 3, brazil: 1 } },
      { text: "كروسان وقهوة", scores: { france: 3, italy: 2 } },
      { text: "أرز و صوبا", scores: { japan: 3, korea: 2 } },
    ],
  },
  {
    id: 3,
    text: "كيفاش كتتعامل مع التأخير؟",
    options: [
      { text: "عادي، الوقت مرن", scores: { brazil: 3, morocco: 2 } },
      { text: "مستحيل نتأخر", scores: { japan: 3, sweden: 2 } },
      { text: "دقيقة فدقيقة", scores: { germany: 3, korea: 1 } },
      { text: "حسب الموقف", scores: { france: 2, italy: 2 } },
    ],
  },
  {
    id: 4,
    text: "أشنو أهم شيء فالحياة؟",
    options: [
      { text: "العائلة والأصحاب", scores: { italy: 3, morocco: 3 } },
      { text: "الشغل والنجاح", scores: { korea: 3, germany: 2 } },
      { text: "الحرية والسعادة", scores: { usa: 3, france: 2 } },
      { text: "الصحة والطبيعة", scores: { sweden: 3, japan: 2 } },
    ],
  },
  {
    id: 5,
    text: "فاش كتكون كاعي، أشنو كتدير؟",
    options: [
      { text: "كنهضر وكنعبر ", scores: { italy: 3, brazil: 2 } },
      { text: "كنكتم وكنحل المشكلة بهدوء", scores: { japan: 3, sweden: 2 } },
      { text: "كنروح نتمشى أو ندير الرياضة", scores: { usa: 2, germany: 2 } },
      { text: "كنهضر مع صاحب قريب", scores: { france: 3, morocco: 2 } },
    ],
  },
  {
    id: 6,
    text: "أشنو رأيك في الأكل لي في شكل؟",
    options: [
      { text: "كنجرب كل شيء بفرحة", scores: { japan: 3, france: 2 } },
      { text: "حسب، كنشوف أولاً", scores: { morocco: 2, turkey: 2 } },
      { text: "لا، كنبقى مع ما كنعرف", scores: { germany: 2, korea: 1 } },
      { text: "كلما كان في شكل كلما كان مزيان", scores: { brazil: 3, usa: 2 } },
    ],
  },
  {
    id: 7,
    text: "كيفاش كتفضل تسافر؟",
    options: [
      { text: "كل شيء مبرمج من قبل", scores: { germany: 3, japan: 2 } },
      { text: "بلا برنامج، نشوف فين يوديني الحال", scores: { brazil: 3, usa: 2 } },
      { text: "رحلة عائلية منظمة", scores: { italy: 3, morocco: 2 } },
      { text: "وحدي، أكتشف بحريتي", scores: { sweden: 3, france: 2 } },
    ],
  },
  {
    id: 8,
    text: "أشنو كتحب تدير فعطلة نهاية الأسبوع؟",
    options: [
      { text: "نستراح وننعس", scores: { morocco: 3, italy: 2 } },
      { text: "نخرج ونكتاشف أماكن جديدة", scores: { france: 3, usa: 2 } },
      { text: "نقرا أو نتعلم شيء جديد", scores: { japan: 3, korea: 2 } },
      { text: "نلعب رياضة أو نمشي فالطبيعة", scores: { sweden: 3, germany: 2 } },
    ],
  },
  {
    id: 9,
    text: "كيفاش علاقتك مع الجيران؟",
    options: [
      { text: "بحال العائلة", scores: { morocco: 3, italy: 2 } },
      { text: "  الإحترام, كنسلم وخلاص", scores: { sweden: 3, germany: 2 } },
      { text: "نادراً فين كنشوفهم", scores: { usa: 3, france: 1 } },
      { text: "كنعرفهم مزيان، كنتعاونو", scores: { japan: 3, korea: 2 } },
    ],
  },
  {
    id: 10,
    text: "أشنو كتعنى ليك الراحة المثالية؟",
    options: [
      { text: "حمام مغربي وأتاي", scores: { morocco: 3, turkey: 2 } },
      { text: "حديقة هادئة مع كتاب", scores: { sweden: 3, france: 2 } },
      { text: "شاطئ وموسيقى", scores: { brazil: 3, italy: 2 } },
      { text: "سبا أو مساج", scores: { korea: 3, japan: 2 } },
    ],
  },
]

export const results: Record<string, Result> = {
  japan: {
    flag: "🇯🇵",
    title: "ياباني",
    titleEn: "Japanese",
    desc: "دقيق، هادئ، ومحترم. كتحب النظام وكتعطي اهتمام للتفاصيل. غير أنك كتاكل بسرعة كالمغربي الأصيل 😂",
  },
  france: {
    flag: "🇫🇷",
    title: "فرنسي",
    titleEn: "French",
    desc: "ذواق، فيلسوف، وكتحب الحوار. الأكل والثقافة عندك أولوية. بقلبك مغربي وبعقلك باريسي 😄",
  },
  brazil: {
    flag: "🇧🇷",
    title: "برازيلي",
    titleEn: "Brazilian",
    desc: "مرح، عاشق الحياة، وكتحب الحركة. الفرحة عندك واجب يومي. الحمد لله ما عندكش مشكلة فالدوري 😂",
  },
  italy: {
    flag: "🇮🇹",
    title: "إيطالي",
    titleEn: "Italian",
    desc: "عاطفي، محب للعايلة والأكل. كتعيش اللحظة وكتعبر على حالك بلا خجل. إيطالي بالروح، مغربي بالقلب ❤️",
  },
  sweden: {
    flag: "🇸🇪",
    title: "سويدي",
    titleEn: "Swedish",
    desc: "هادئ، منظم، ومحب الطبيعة. كتحتاج لوقتك الخاص وكتقدر الاستقلالية. نادراً ما كايطلع ليك الدم 😅",
  },
  germany: {
    flag: "🇩🇪",
    title: "ألماني",
    titleEn: "German",
    desc: "منظم، جدي، وعملي. الدقة والكفاءة عندك كل شيء. كتحب تخدم مزيان وتاخد راحتك كامل 💪",
  },
  usa: {
    flag: "🇺🇸",
    title: "أمريكي",
    titleEn: "American",
    desc: "طموح، حر، وكتحب المغامرة. كتؤمن بنفسك وبأحلامك الكبيرة. dream big كما كيقولو 🦅",
  },
  korea: {
    flag: "🇰🇷",
    title: "كوري",
    titleEn: "Korean",
    desc: "طموح، مجتهد، وكتهتم بمظهرك. الشغل والتعلم عندك أولوية. K-drama في القلب 😄",
  },
  morocco: {
    flag: "🇲🇦",
    title: "مغربي خالص",
    titleEn: "Moroccan",
    desc: "أصيل، كريم، ومحب للعائلة. العائلة والأتاي والضحك عندك كل شيء. مغربي فالروح والقلب ❤️",
  },
  turkey: {
    flag: "🇹🇷",
    title: "تركي",
    titleEn: "Turkish",
    desc: "عاطفي، ضيافته معروفة، وكتحب الأكل الطيب. خاصك غير اللحية باش تكون بحال أورطوغرل 🌙",
  },
}
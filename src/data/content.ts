export const site = {
  name: 'Christopher Lum',
  dialogueName: 'Chris',
  hudName: 'Christopher Lum',
  hudCaption: 'Software Engineer',
  tagline: 'Informatics @ UW | Aspiring Software Developer',
  role: 'Univeristy of Washington',
  year: 'Year 3',
  photo: {
    src: `${import.meta.env.BASE_URL}images/profile.jpg`,
    alt: 'Photo of Christopher Lum',
  },
  schoolLogo: {
    src: `${import.meta.env.BASE_URL}images/uw-ischool.png`,
    alt: 'University of Washington Information School',
  },
  background: {
    src: `${import.meta.env.BASE_URL}images/background.jpg`,
    alt: 'Christopher Lum at sunset',
  },
  bio: "Hello! I am currently studying Data Science & Applied Math at UW with a desire to solve problems through software and AI. On the side I like to build projects that make my own life a little easier, and may be useful to others as well!",
  email: 'clum45@uw.edu',
  github: 'https://github.com/clum45-rgb',
  linkedin: 'https://www.linkedin.com/in/christopher-s-lum/',
  footer: '© 2026 Christopher. Built with curiosity and code.',
}

export type Project = {
  id: string
  title: string
  heading?: string
  blurb: string
  tech: string[]
  description: string
  note?: string
  linkLabel: string
  href: string
  demoVideo?: string
  images: { src: string; alt: string }[]
}

const image = (file: string) => `${import.meta.env.BASE_URL}images/${file}`
const video = (file: string) => `${import.meta.env.BASE_URL}videos/${file}`

export const projects: Project[] = [
  {
    id: 'eats',
    title: 'Eats',
    blurb: 'Turns a fridge photo into recipes you can cook tonight.',
    tech: ['Next.js', 'OpenAI', 'PostgreSQL', 'Supabase'],
    description:
      'Eats is an AI-powered food inventory app I built for college students who want to cook with whatever is already in the fridge. Users photograph their groceries, and an image-processing plus LLM pipeline identifies and normalizes ingredients into a live inventory. From there, a recommendation engine uses vector embeddings and ranking to match recipes to what they actually have, with a shopping list to fill in the gaps. Inventory, recipes, and ingredient relationships are stored in PostgreSQL on Supabase.',
    linkLabel: 'View Project',
    href: 'https://github.com/clum45-rgb/eats',
    images: [
      { src: image('eats-home.jpg'), alt: 'Eats home screen with fridge scan and matches' },
      { src: image('eats-inventory.jpg'), alt: 'Eats inventory of kitchen ingredients' },
      { src: image('eats-recipes.jpg'), alt: 'Eats recipes list with search' },
      { src: image('eats-matches.jpg'), alt: 'Eats recipe matches ranked against inventory' },
      { src: image('eats-shopping.jpg'), alt: 'Eats shopping list with nearby product search' },
    ],
  },
  {
    id: 'lumis',
    title: 'Lumis',
    blurb: 'Turns one personal goal into a ranked, AI-coached grind.',
    tech: ['Next.js', 'OpenAI', 'PostgreSQL', 'Supabase'],
    description:
      'Lumis is a self-improvement platform I built that turns a single personal goal into a game-like ranked progression system. After a user defines a goal, OpenAI generates a personalized roadmap, then the app tracks weekly momentum with progress scores, rank updates, and a coaching chatbot that knows their habits. User actions and weekly progress live in a PostgreSQL data model on Supabase, and a server-side scoring pipeline calculates weekly scores, updates ranks, and detects stagnation so coaching can adapt.',
    linkLabel: 'View Project',
    href: 'https://github.com/clum45-rgb/lumis',
    images: [
      { src: image('lumis-home.png'), alt: 'Lumis home screen for setting a goal' },
      { src: image('lumis-daily.png'), alt: 'Lumis daily dashboard with work and health tasks' },
      { src: image('lumis-ladder.png'), alt: 'Lumis work goals ladder with ranks and progress' },
      { src: image('lumis-challenges.png'), alt: 'Lumis daily and weekly challenges' },
      { src: image('lumis-health.png'), alt: 'Lumis health and fitness weekly tracker' },
    ],
  },
  {
    id: 'clubhub',
    title: 'ClubHub',
    blurb: 'Finds campus club events by reading Instagram posts with AI.',
    tech: ['React', 'AWS', 'Bedrock', 'Meta API'],
    description:
      'Me and my DubHacks team built ClubHub using Meta’s official API to connect with Instagram professional accounts run by campus clubs. When a user enters a club’s handle, our system scrapes posts from the past thirty days—analyzing both captions and event graphics—and converts the data into JSON files stored in an AWS S3 bucket. Using Amazon Bedrock, we process these files to filter for only upcoming events and extract key metadata such as the event name, date, time, location, and description. This information is then fed into our frontend, a React-based dashboard designed in Figma, where users can explore clubs and view upcoming events tailored to their interests. The platform also allows RSOs to build and manage their profiles, making club discovery and involvement centralized and up to date.',
    note: 'We built this on AWS during our hackathon so we lost our Amazon Bedrock access. However, we are currently working to redeploy the project on another server using ChatGPT for inference, and will update the link when it’s live! Our Figma prototype is still available to view.',
    linkLabel: 'View Project',
    href: 'https://www.figma.com/make/eoAgn33BU20vTUrtOQAqyr/University-Club-Discovery-Website?node-id=0-1&p=f&t=16Gk1LQ6lWXqsvtC-0',
    images: [
      { src: image('clubhub-dashboard.png'), alt: 'ClubHub dashboard' },
      { src: image('clubhub-onboarding.png'), alt: 'ClubHub onboarding screen' },
      { src: image('clubhub-org-creation.png'), alt: 'ClubHub organization creation' },
    ],
  },
  {
    id: 'unemployment',
    title: 'Impact of Population on Unemployment Analysis',
    heading: 'Unemployment',
    blurb: 'Charts how population density lines up with U.S. jobless rates.',
    tech: ['R', 'ggplot', 'Quarto'],
    description:
      'For my class project, me and my group looked at U.S. unemployment and population data to see how things like population density might affect job rates. Using R and ggplot, I built interactive charts, scatterplots, heatmaps, and histograms to spot patterns across states. It is all wrapped up into a Quarto doc and I found a 15% correlation between how populated a place is and how many people are out of work.',
    linkLabel: 'View Project',
    href: 'https://clum45-rgb.github.io/Info201-The-Impact-of-Population-on-Unemployment-Analysis/info201final.html',
    images: [
      { src: image('unemployment-1.png'), alt: 'Unemployment analysis chart 1' },
      { src: image('unemployment-2.png'), alt: 'Unemployment analysis chart 2' },
      { src: image('unemployment-3.png'), alt: 'Unemployment analysis chart 3' },
    ],
  },
  {
    id: 'study-spot',
    title: 'Find a Study Spot UW',
    heading: 'Study Spot',
    blurb: 'Finds quiet UW study spaces by noise, crowd, and hours.',
    tech: ['Figma', 'User Research'],
    description:
      'I designed a mobile app prototype in Figma to help UW students locate ideal study spaces using real-time filters like noise level, crowd size, and hours. Integrated interactive maps and personalization features, and validated the design through user interviews and iterative feedback.',
    linkLabel: 'View Prototype',
    href: 'https://www.figma.com/proto/6tFGjxSJckaWbqAsgHmzmE/info360-prototype?node-id=10-2&starting-point-node-id=10%3A2&t=BO7cchcYPHj3Phm1-1',
    demoVideo: video('study-spot-demo.mp4'),
    images: [
      { src: image('study-spot-home.png'), alt: 'Study spot home page with filter dropdown' },
      { src: image('study-spot-pin.png'), alt: 'Study spot map with location pin' },
      { src: image('study-spot-kane.png'), alt: 'Kane Hall study spot pin details' },
    ],
  },
  {
    id: 'pathfinder',
    title: 'Pathfinder UW',
    heading: 'Pathfinder',
    blurb: 'Helps new hikers pick trails, pack right, and stay safe.',
    tech: ['Figma', 'HTML', 'CSS'],
    description:
      'Pathfinder is a comprehensive website tailored to new hikers, designed to centralize resources and provide an interactive and engaging experience. The website has three primary sections: Trail Recommendations, Safety and Preparation, and Community Feedback. The Trail Recommendations section features filters for location, difficulty, altitude, and length, making it easier for users to discover hikes suited to their preferences and needs. The Safety and Preparation section consists of tips on selecting suitable gear, preparing for weather conditions, and links to CPR and first aid courses available online or in their area. Finally, the Community Feedback tab serves as a platform for hikers to share stories, ask questions, and learn from each other’s experiences. It supports beginner hikers in building confidence, fostering connections, and enjoying the outdoors safely and responsibly.',
    linkLabel: 'View Prototype',
    href: 'https://www.figma.com/proto/9FF7Ms68Ns7m4hdavGZPlY/info-200-pathfinder?node-id=3-3&starting-point-node-id=1%3A25&scaling=contain&t=W212CZ3wzqTO49lN-1',
    demoVideo: video('pathfinder-demo.mp4'),
    images: [
      { src: image('pathfinder-1.jpg'), alt: 'Pathfinder UW screenshot 1' },
      { src: image('pathfinder-2.jpg'), alt: 'Pathfinder UW screenshot 2' },
      { src: image('pathfinder-3.jpg'), alt: 'Pathfinder UW screenshot 3' },
      { src: image('pathfinder-4.jpg'), alt: 'Pathfinder UW screenshot 4' },
      { src: image('pathfinder-5.jpg'), alt: 'Pathfinder UW screenshot 5' },
    ],
  },
]

export type Experience = {
  id: string
  company: string
  role: string
  dates: string
  location?: string
  summary: string
  highlights: string[]
  letter: string
  logo?: string
  href?: string
  comingSoon?: boolean
}

const comingSoonJob = (slot: number): Experience => ({
  id: `coming-soon-${slot}`,
  company: 'Coming Soon',
  role: 'Coming Soon',
  dates: 'Coming Soon',
  location: 'Coming Soon',
  letter: '?',
  comingSoon: true,
  summary: 'Coming soon.',
  highlights: ['Coming soon.'],
})

export const experiences: Experience[] = [
  {
    id: 'ploomba',
    company: 'Ploomba',
    role: 'Software Developer',
    dates: '2025 — Present',
    location: 'Remote',
    letter: 'P',
    logo: image('ploomba-logo.png'),
    href: 'https://www.ploomba.com/',
    summary:
      'I Build product software for an agritech robotics startup, helping farms collect field data and plan harvests through connected hardware, forecasting, and a grower-facing app.',
    highlights: [
      'Ship features across Ploomba’s farming platform, from field data workflows to the grower-facing product.',
      'Collaborate in a small startup team to turn product needs into usable interfaces and reliable backend work.',
      'Help connect robot-captured field data to planning tools that farms can actually use.',
    ],
  },
  ...[1, 2, 3, 4, 5, 6].map(comingSoonJob),
]

export const SKILL_MAX_RANK = 5

export const skillRankNames = [
  '',
  'Novice',
  'Familiar',
  'Practiced',
  'Advanced',
  'Expert',
] as const

export type SkillStat = {
  id: string
  label: string
  lines: string[]
  level: 1 | 2 | 3 | 4 | 5
}

export const skillStats: SkillStat[] = [
  { id: 'frontend', label: 'Frontend', lines: ['Frontend'], level: 4 },
  { id: 'backend', label: 'Backend', lines: ['Backend'], level: 5 },
  { id: 'aiml', label: 'AI/ML', lines: ['AI/ML'], level: 4 },
  { id: 'cloud', label: 'Cloud/DevOps', lines: ['Cloud', 'DevOps'], level: 3 },
  {
    id: 'data',
    label: 'Data Engineering',
    lines: ['Data', 'Engineering'],
    level: 3,
  },
]

export type SkillGroup = {
  title: string
  items: string[]
}

export const skillGroups: SkillGroup[] = [
  {
    title: 'Languages',
    items: ['Java', 'Python', 'HTML, CSS, JavaScript', 'Rust', 'TypeScript', 'R'],
  },
  {
    title: 'Tools & Frameworks',
    items: [
      'Next.js',
      'Supabase',
      'PostgreSQL',
      'OpenAI',
      'Tauri',
      'Bitbucket',
      'Jira',
      'Figma',
      'VS Code',
      'Git',
      'ggplot',
    ],
  },
  {
    title: 'Concepts & Strengths',
    items: [
      'Algorithms & Data Structures',
      'Data Visualization',
      'Agile',
      'UI/UX Design',
      'User Research',
    ],
  },
]

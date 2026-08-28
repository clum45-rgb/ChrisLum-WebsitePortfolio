export const site = {
  name: 'Chris Lum',
  hudName: 'Chris',
  hudCaption: 'Informatics @ UW',
  tagline: 'Informatics @ UW | Aspiring Software Developer',
  photo: {
    src: `${import.meta.env.BASE_URL}images/profile.jpg`,
    alt: 'Photo of Christopher',
  },
  bio: "I'm a 2nd-Year at the University of Washington with a passion for software development and user-centered design. I love solving complex problems and am eager to contribute my skills and develop through new challenges and experiences.",
  email: 'clum45@uw.edu',
  github: 'https://github.com/clum45-rgb',
  linkedin: 'https://www.linkedin.com/in/christopher-s-lum/',
  footer: '© 2025 Christopher. Built with curiosity and code.',
}

export type Project = {
  id: string
  title: string
  description: string
  note?: string
  linkLabel: string
  href: string
  images: { src: string; alt: string }[]
}

const image = (file: string) => `${import.meta.env.BASE_URL}images/${file}`

export const projects: Project[] = [
  {
    id: 'clubhub',
    title: 'ClubHub',
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
    id: 'pathfinder',
    title: 'Pathfinder UW',
    description:
      'Pathfinder is a comprehensive website tailored to new hikers, designed to centralize resources and provide an interactive and engaging experience. The website has three primary sections: Trail Recommendations, Safety and Preparation, and Community Feedback. The Trail Recommendations section features filters for location, difficulty, altitude, and length, making it easier for users to discover hikes suited to their preferences and needs. The Safety and Preparation section consists of tips on selecting suitable gear, preparing for weather conditions, and links to CPR and first aid courses available online or in their area. Finally, the Community Feedback tab serves as a platform for hikers to share stories, ask questions, and learn from each other’s experiences. It supports beginner hikers in building confidence, fostering connections, and enjoying the outdoors safely and responsibly.',
    linkLabel: 'View Prototype',
    href: 'https://www.figma.com/proto/9FF7Ms68Ns7m4hdavGZPlY/info-200-pathfinder?node-id=3-3&starting-point-node-id=1%3A25&scaling=contain&t=W212CZ3wzqTO49lN-1',
    images: [
      { src: image('pathfinder-1.jpg'), alt: 'Pathfinder UW screenshot 1' },
      { src: image('pathfinder-2.jpg'), alt: 'Pathfinder UW screenshot 2' },
      { src: image('pathfinder-3.jpg'), alt: 'Pathfinder UW screenshot 3' },
      { src: image('pathfinder-4.jpg'), alt: 'Pathfinder UW screenshot 4' },
      { src: image('pathfinder-5.jpg'), alt: 'Pathfinder UW screenshot 5' },
    ],
  },
  {
    id: 'study-spot',
    title: 'Find a Study Spot UW',
    description:
      'I designed a mobile app prototype in Figma to help UW students locate ideal study spaces using real-time filters like noise level, crowd size, and hours. Integrated interactive maps and personalization features, and validated the design through user interviews and iterative feedback.',
    linkLabel: 'View Prototype',
    href: 'https://www.figma.com/proto/6tFGjxSJckaWbqAsgHmzmE/info360-prototype?node-id=10-2&starting-point-node-id=10%3A2&t=BO7cchcYPHj3Phm1-1',
    images: [
      { src: image('study-spot-home.png'), alt: 'Study spot home page with filter dropdown' },
      { src: image('study-spot-pin.png'), alt: 'Study spot map with location pin' },
      { src: image('study-spot-kane.png'), alt: 'Kane Hall study spot pin details' },
    ],
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
    items: ['Tauri', 'Bitbucket', 'Jira', 'Figma', 'VS Code', 'Git', 'ggplot'],
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

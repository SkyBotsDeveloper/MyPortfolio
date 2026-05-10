export const HLS_SOURCE =
  "https://stream.mux.com/Aa02T7oM1wH5Mk5EEVDYhbZ1ChcdhRsS2m1NYyx4Ua1g.m3u8";

export const navItems = [
  { id: "home", label: "Home" },
  { id: "about", label: "About" },
  { id: "projects", label: "Projects" },
  { id: "bots", label: "Bots" },
  { id: "contact", label: "Contact" },
] as const;

export const heroRoles = [
  "Bot Developer",
  "Web Developer",
  "OSINT Specialist",
  "Prompt Engineer",
] as const;

export const heroStats = [
  { value: "18+", label: "Bots Built" },
  { value: "10+", label: "Web Apps" },
  { value: "5+", label: "Years Exp" },
  { value: "1000+", label: "Users Served" },
] as const;

export const aboutSkills = [
  { label: "Bot Development", value: 95 },
  { label: "Web Development", value: 90 },
  { label: "OSINT", value: 88 },
  { label: "Prompt Engineering", value: 90 },
  { label: "API Integration", value: 92 },
  { label: "Security", value: 85 },
] as const;

export const featuredProjects = [
  {
    title: "Elite Search",
    category: "Search Web App",
    description:
      "Custom search engine with powerful capabilities and a clean interface.",
    link: "https://elite-search.live",
    span: "md:col-span-7",
    visual:
      "radial-gradient(circle at 18% 18%, rgba(137,170,204,0.34), transparent 35%), radial-gradient(circle at 80% 24%, rgba(78,133,191,0.2), transparent 28%), linear-gradient(145deg, rgba(18,21,27,0.9), rgba(4,4,4,1) 70%)",
    badge: "Search Core",
  },
  {
    title: "Aurex Music",
    category: "Premium Music App",
    description:
      "Premium cross-platform music app with smooth playback, synced lyrics, offline downloads, shared rooms, live chat, APK and Windows setup access.",
    link: "https://aurex-music.pages.dev",
    span: "md:col-span-5",
    visual:
      "radial-gradient(circle at 74% 18%, rgba(137,170,204,0.34), transparent 30%), radial-gradient(circle at 22% 72%, rgba(78,133,191,0.24), transparent 32%), linear-gradient(180deg, rgba(9,15,24,0.96), rgba(3,3,3,1)), linear-gradient(120deg, rgba(78,133,191,0.2), rgba(4,4,4,0) 58%)",
    badge: "Aurex Layer",
  },
  {
    title: "Elite Player",
    category: "Movies Entertainment",
    description: "Free movie streaming platform with vast collection.",
    credentials: {
      username: "elite",
      password: "free123",
    },
    link: "https://elite-player.vercel.app",
    span: "md:col-span-5",
    visual:
      "linear-gradient(135deg, rgba(6,6,8,1), rgba(11,18,26,0.96)), radial-gradient(circle at 26% 80%, rgba(78,133,191,0.22), transparent 34%), radial-gradient(circle at 70% 18%, rgba(137,170,204,0.2), transparent 30%)",
    badge: "Cinema Stack",
  },
  {
    title: "Elite Gen",
    category: "AI Generator",
    description: "Unlimited generative AI tool for images and content.",
    link: "https://elitegen.vercel.app",
    span: "md:col-span-7",
    visual:
      "radial-gradient(circle at 18% 30%, rgba(78,133,191,0.34), transparent 32%), linear-gradient(150deg, rgba(4,4,4,1), rgba(13,22,33,0.9)), radial-gradient(circle at 86% 76%, rgba(137,170,204,0.18), transparent 26%)",
    badge: "AI Utility",
  },
] as const;

export const journalEntries = [
  {
    title: "Designing bots that feel human, fast, and useful",
    readTime: "4 min",
    year: "2026",
    theme: "Bot system",
    visual:
      "radial-gradient(circle at 24% 30%, rgba(137,170,204,0.28), transparent 34%), linear-gradient(135deg, rgba(5,5,5,1), rgba(15,24,34,0.82))",
  },
  {
    title: "Why premium UI matters even in utility products",
    readTime: "3 min",
    year: "2026",
    theme: "Product UI",
    visual:
      "linear-gradient(160deg, rgba(12,17,25,0.96), rgba(4,4,4,1)), radial-gradient(circle at 74% 20%, rgba(78,133,191,0.24), transparent 30%)",
  },
  {
    title: "Building AI tools that stay practical, not gimmicky",
    readTime: "5 min",
    year: "2026",
    theme: "AI workflow",
    visual:
      "radial-gradient(circle at 22% 78%, rgba(137,170,204,0.22), transparent 32%), linear-gradient(120deg, rgba(7,7,8,1), rgba(11,20,30,0.95))",
  },
  {
    title: "OSINT, automation, and interface clarity",
    readTime: "4 min",
    year: "2026",
    theme: "Investigation",
    visual:
      "linear-gradient(135deg, rgba(5,5,5,1), rgba(9,18,28,0.9)), radial-gradient(circle at 78% 76%, rgba(78,133,191,0.22), transparent 24%)",
  },
] as const;

export const archiveProjects = [
  {
    title: "Elite Stuff",
    description: "465+ FREE curated and verified resources",
    link: "https://elite-stuff.vercel.app",
  },
  {
    title: "HealSpace",
    description: "Mental wellness platform with AI companion",
    link: "https://heal-space.netlify.app",
  },
  {
    title: "JioSaavn API",
    description: "Unofficial API for music data access",
    link: "https://jiosaavn-vert.vercel.app",
  },
  {
    title: "Temp Mails",
    description: "Generate unlimited temporary emails",
    link: "https://elitetempmails.vercel.app",
  },
  {
    title: "Drive Search",
    description: "Get direct Google Drive links instantly",
    link: "https://cse.google.com/cse?cx=167f964aecdad17c5",
  },
  {
    title: "Plant Bloom",
    description: "Plant identification and care guide",
    link: "https://plantbloomexplorer.netlify.app/",
  },
  {
    title: "TeamX Docs",
    description: "API documentation with live testing",
    link: "https://teamx-docs.netlify.app",
  },
] as const;

export const botFilters = [
  { id: "all", label: "All", count: 6 },
  { id: "multi", label: "Multi-tool", count: 1 },
  { id: "utility", label: "Utility", count: 3 },
  { id: "gaming", label: "Gaming", count: 2 },
] as const;

export const featuredBots = [
  {
    name: "SkyBeatz",
    username: "@SkyBeatzBot",
    description:
      "Multi-tool Telegram system for music, AI image generation, video generation, image-to-video, TTS, tag-all, and group moderation commands.",
    category: "multi",
    accent: "AI Hub",
    features: ["Music", "Image Gen", "Video Gen", "TTS", "Tag All", "Moderation"],
    visual:
      "radial-gradient(circle at 18% 18%, rgba(137,170,204,0.32), transparent 30%), radial-gradient(circle at 82% 26%, rgba(78,133,191,0.32), transparent 28%), linear-gradient(145deg, rgba(5,5,5,1), rgba(14,29,42,0.94))",
  },
  {
    name: "Miss Sukoon",
    username: "@MissSukoon_bot",
    description: "Advanced Rose-style bot with cloning and anti-abuse.",
    category: "utility",
    accent: "Moderation",
    visual:
      "radial-gradient(circle at 20% 20%, rgba(137,170,204,0.25), transparent 34%), linear-gradient(135deg, rgba(7,7,7,1), rgba(17,28,38,0.9))",
  },
  {
    name: "WordSeek Game",
    username: "@WordXguessingBot",
    description: "Guess hidden words and challenge friends.",
    category: "gaming",
    accent: "Game",
    visual:
      "linear-gradient(160deg, rgba(10,10,10,1), rgba(20,31,43,0.92)), radial-gradient(circle at 78% 18%, rgba(78,133,191,0.28), transparent 28%)",
  },
  {
    name: "Quiz Elite",
    username: "@QuizXeliteBot",
    description: "Test your brain with challenging quizzes.",
    category: "gaming",
    accent: "Trivia",
    visual:
      "linear-gradient(135deg, rgba(6,6,6,1), rgba(10,20,31,0.94)), radial-gradient(circle at 26% 76%, rgba(137,170,204,0.24), transparent 26%)",
  },
] as const;

export const additionalBots = [
  {
    name: "Bio Analyser",
    username: "@BioAnalyserBot",
    category: "utility",
    description: "Profile and bio intelligence utility for quick Telegram signal checks.",
  },
  {
    name: "NSFW Detector",
    username: "@NsfwDetectorRobot",
    category: "utility",
    description: "Safety-focused detector for unsafe media and group protection workflows.",
  },
] as const;

export const botStatCards = [
  { value: "18+", label: "Total Built" },
  { value: "6", label: "Selected Live" },
  { value: "1", label: "Multi-Tool Hub" },
  { value: "2", label: "Game Bots" },
] as const;

export const capabilities = [
  {
    title: "Frontend Development",
    description: "Polished React interfaces, motion systems, and responsive product surfaces.",
  },
  {
    title: "Telegram Bot Systems",
    description: "Scalable multi-bot ecosystems with moderation, utility, and media workflows.",
  },
  {
    title: "AI Integrations",
    description: "Productive AI features woven into real user flows instead of novelty demos.",
  },
  {
    title: "Prompt Engineering",
    description: "Structured prompting for practical outputs, system behavior, and automation.",
  },
  {
    title: "Automation Workflows",
    description: "Fast back-office systems that remove repetition and accelerate operations.",
  },
  {
    title: "API Architecture",
    description: "Clean service layers and integration points that keep products reliable.",
  },
  {
    title: "OSINT / Investigation Workflows",
    description: "Search-driven interfaces and evidence-friendly systems for research tasks.",
  },
  {
    title: "Security-Minded Product Thinking",
    description: "Build choices shaped by resilience, abuse prevention, and trust signals.",
  },
] as const;

export const timelineMilestones = [
  {
    year: "2020",
    title: "Started Coding",
    description: "First steps into Python and automation",
  },
  {
    year: "2021",
    title: "First Bot",
    description: "Built my first Telegram bot",
  },
  {
    year: "2022",
    title: "Team Lead",
    description: "Started leading dev teams",
  },
  {
    year: "2023",
    title: "OSINT + AI",
    description: "Mastered investigation and AI tools",
  },
  {
    year: "2024",
    title: "Scaling Up",
    description: "18+ bots, 10+ web apps",
  },
  {
    year: "2025",
    title: "Innovation",
    description: "Building next-gen solutions",
  },
] as const;

export const explorations = [
  {
    title: "Search Systems",
    description: "Fast layouts for discovery-heavy products.",
    visual:
      "radial-gradient(circle at 20% 22%, rgba(137,170,204,0.28), transparent 34%), linear-gradient(145deg, rgba(8,8,8,1), rgba(16,28,38,0.88))",
  },
  {
    title: "Music Interfaces",
    description: "Streamlined media experiences with atmospheric depth.",
    visual:
      "linear-gradient(160deg, rgba(6,6,6,1), rgba(14,23,34,0.9)), radial-gradient(circle at 74% 18%, rgba(78,133,191,0.28), transparent 30%)",
  },
  {
    title: "AI Tools",
    description: "Useful generation surfaces focused on clarity and speed.",
    visual:
      "linear-gradient(135deg, rgba(5,5,5,1), rgba(12,21,31,0.94)), radial-gradient(circle at 28% 76%, rgba(137,170,204,0.22), transparent 28%)",
  },
  {
    title: "Bot Dashboards",
    description: "Control panels for moderation, utility, and scale.",
    visual:
      "radial-gradient(circle at 78% 70%, rgba(78,133,191,0.26), transparent 26%), linear-gradient(145deg, rgba(7,7,7,1), rgba(14,24,34,0.92))",
  },
  {
    title: "OSINT Workflows",
    description: "Interfaces designed for search, evidence, and context.",
    visual:
      "linear-gradient(160deg, rgba(8,8,8,1), rgba(18,27,36,0.92)), radial-gradient(circle at 20% 18%, rgba(137,170,204,0.22), transparent 32%)",
  },
  {
    title: "Motion UI",
    description: "Editorial transitions that feel smooth, not loud.",
    visual:
      "linear-gradient(140deg, rgba(5,5,5,1), rgba(10,21,31,0.92)), radial-gradient(circle at 80% 20%, rgba(78,133,191,0.24), transparent 28%)",
  },
] as const;

export const stats = [
  { value: 18, suffix: "+", label: "Bots Built" },
  { value: 10, suffix: "+", label: "Web Apps" },
  { value: 5, suffix: "+", label: "Years Experience" },
  { value: 1000, suffix: "+", label: "Users Served" },
] as const;

export interface ContactCard {
  label: string;
  value: string;
  href?: string;
}

export const contactCards: ContactCard[] = [
  {
    label: "Telegram",
    value: "@IflexElite",
    href: "https://t.me/IflexElite",
  },
  {
    label: "WhatsApp",
    value: "+63 951 313 9927",
    href: "https://wa.me/639513139927",
  },
  {
    label: "Email",
    value: "elitesid23@gmail.com",
    href: "mailto:elitesid23@gmail.com",
  },
  {
    label: "LinkedIn",
    value: "Siddhartha Abhimanyu",
  },
  {
    label: "Team Support",
    value: "@VivaanSupport",
    href: "https://t.me/VivaanSupport",
  },
] as const;

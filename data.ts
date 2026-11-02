// All site content lives here. Edit this file to change what the site says.
// Anything marked TODO is a placeholder: replace it before launch.
// A `result` that starts with "TODO" is hidden on the site automatically.

export const site = {
  url: "https://heyvinayak.dev",
  // TODO: replace with a Calendly / Cal.com link. Until then "Book a call" opens an email.
  bookCallLink: "",
};

export const sections = { work: true, experience: true, projects: false, testimonials: false };

export const profile = {
  name: "Vinayak Porwal",
  greeting: "Hi, I'm",
  role: "Freelance Full-Stack Web Developer",
  headline: "I build websites that turn visitors into clients.",
  subheadline:
    "Landing pages, business websites and custom web platforms for agencies, creators and growing businesses. Fast, mobile-first, and built to convert.",
  trustLine: "Trusted by agencies & creators · Delivered on time",
  about:
    "I'm Vinayak, a full-stack developer who helps agencies, creators and small businesses get online the right way. I handle everything from design to launch, so you get a fast, modern website without the technical headache. Under the hood, I work with Next.js, React and Node.js to build sites that are reliable and easy to grow.",
  location: "Indore, India", // TODO: confirm
  photo: "", // TODO: add a square photo to /public (e.g. "/vinayak.jpg")
  resumeLink: "https://drive.google.com/file/d/1KHR0_Yx1bMvALJtG3Mvil6D_AKzmUyM3/view?usp=sharing",
};

export const contacts = {
  title: "Have a project in mind?",
  subtitle: "Tell me about your idea. I usually reply within 24 hours.",
  email: "work4vinayak@gmail.com",
  github: "https://github.com/vinayakporwal",
  linkedin: "https://www.linkedin.com/in/vinayakporwal/",
  instagram: "https://www.instagram.com/vinayak_porwal/",
};

export const budgets = ["Under $500", "$500 – $1,500", "$1,500 – $5,000", "$5,000+", "Not sure yet"];

export type ServiceIcon = "rocket" | "briefcase" | "graduation-cap" | "layout-dashboard";

export const services: { title: string; icon: ServiceIcon; benefit: string; includes: string[]; image: string }[] = [
  { title: "Landing Pages", icon: "rocket", benefit: "Turn ads and social traffic into enquiries.",
    includes: ["Custom design", "Mobile-first", "Fast loading", "Lead/contact forms"],
    image: "/work/contentfinix.png" },
  { title: "Business Websites", icon: "briefcase", benefit: "Look professional and get booked online.",
    includes: ["Multi-page site", "Appointment booking", "Admin panel", "SEO basics"],
    image: "/work/video-agency.png" },
  { title: "Course & Creator Platforms", icon: "graduation-cap", benefit: "Sell your courses under your own brand.",
    includes: ["Course pages", "Video lessons", "User accounts", "Payments-ready"],
    image: "/work/learnycate.png" },
  { title: "Web Apps & Dashboards", icon: "layout-dashboard", benefit: "Custom tools that save your team time.",
    includes: ["CRMs & admin panels", "Email automation", "API integrations", "Scalable backend"],
    image: "/photos/arch-893-800x1000.jpg" }, // TODO: swap for a dashboard screenshot
];

export type WorkItem = {
  slug: string;
  client: string;
  type: string;
  title: string;
  link: string;
  problem: string;
  solution: string;
  result: string;
  tech: string[];
  highlights: string[];
  image: string;
};

export const work: WorkItem[] = [
  {
    slug: "contentfinix",
    client: "Rashid, Social Media Agency (ContentFinix)",
    type: "Agency Landing Page",
    title: "ContentFinix",
    link: "https://contentfinix.com/",
    problem: "The agency needed a professional online presence to win new clients.",
    solution: "Designed and built a modern, mobile-friendly landing page that clearly presents their services and guides visitors to get in touch.",
    result: "TODO: add real result (e.g. more enquiries, client feedback)",
    tech: ["Next.js", "React", "Tailwind CSS", "Framer Motion"], // TODO: confirm stack
    highlights: ["Responsive, mobile-first layout", "Optimised performance and SEO", "Smooth scroll animations"],
    image: "/work/contentfinix.png",
  },
  {
    slug: "learnycate",
    client: "Course platform for influencers", // TODO: confirm client/attribution
    type: "Course Selling Platform",
    title: "Learnycate",
    link: "https://learnycate.vercel.app/",
    problem: "Influencers and creators needed a way to sell courses under their own brand instead of relying on third-party marketplaces.",
    solution: "Built a Coursera-style course platform with a familiar, YouTube-like viewing experience, so students feel at home from the first click.",
    result: "TODO: add real result",
    tech: ["Next.js", "React", "Node.js", "MongoDB"], // TODO: confirm stack
    highlights: ["Course catalog & video lessons", "YouTube-style player UI", "User accounts"],
    image: "/work/learnycate.png", // TODO: replace with a screenshot that shows courses (public page is empty when logged out)
  },
  {
    slug: "video-agency",
    client: "Karan, Social Media & Video Agency",
    type: "Agency Landing Page",
    title: "Video & Content Agency",
    link: "https://portfolio-video-agency.vercel.app/",
    problem: "A content agency (reels, social media management, marketing) needed a site that shows off their creative work and brings in clients.",
    solution: "Built a visual, video-focused landing page that showcases their reels and services with clear calls to action.",
    result: "TODO: add real result",
    tech: ["Next.js", "React", "Tailwind CSS"], // TODO: confirm stack
    highlights: ["Video-first showcase", "Fast loading media", "Conversion-focused layout"],
    image: "/work/video-agency.png",
  },
];

export const experience = [
  {
    company: "Pet Matrix Clinic Pvt. Ltd.", role: "Full Stack Developer",
    duration: "Mar 2024 – May 2024", location: "Indore, India",
    summary: "Built the clinic's website with online appointment booking and an admin panel for managing doctors and clients.",
    impact: "Helped the clinic grow its customer base by 20%.",
    tech: ["Next.js", "React", "SCSS", "MongoDB", "Nodemailer", "CRON jobs", "Magic-link auth", "File uploads"],
  },
  {
    company: "Vivafox Digital Pvt. Ltd.", role: "Frontend Developer",
    duration: "Aug 2023 – Nov 2023", location: "Gurgaon, India (Remote)",
    summary: "Built a cloud CRM that lets businesses manage clients and run email marketing campaigns.",
    impact: "Delivered server-rendered, fast-loading app screens and email funnel builder.",
    tech: ["React", "Next.js", "Tailwind CSS", "Redux Toolkit", "REST APIs", "Agile"],
  },
  {
    company: "Helper Hand", role: "Frontend Developer",
    duration: "Apr 2023", location: "Remote",
    summary: "Built the interface for an app connecting people with disabilities to helpers, including a custom booking calendar.",
    impact: "Improved form usability and validation by 50%.",
    tech: ["React", "Tailwind CSS", "React Hook Form", "Material UI"],
  },
];

export const process = [
  { title: "Discovery call", text: "We talk about your business, your customers and what the site needs to do. You get a clear plan and a fixed quote.",
    image: "/photos/arch-942-800x1000.jpg", alt: "A white angular building against a black sky" },
  { title: "Design & plan", text: "I design the pages and map out every section before writing code, so you see exactly what you are getting.",
    image: "/photos/arch-893-800x1000.jpg", alt: "A curved latticed facade forming sweeping lines" },
  { title: "Build with regular updates", text: "I build the site and share progress every few days. You can click through it and give feedback as it grows.",
    image: "/photos/arch-1033-800x1000.jpg", alt: "Twin escalators rising through a dark concourse" },
  { title: "Launch & support", text: "Your site goes live on your domain. I stay around after launch to fix issues and help with changes.",
    image: "/photos/arch-692-800x1000.jpg", alt: "A busy station hall with people crossing under tall windows" },
];

// Hidden for now (sections.projects = false)
export const projects = [
  {
    slug: "craft-x", title: "Craft-X: AI Tools & API Platform",
    description: "A platform offering AI image generation, ChatGPT, background removal, YouTube tools and weather API with user accounts and a token-based usage system.",
    tech: ["React", "Node.js", "Express", "OpenAI", "Stable Diffusion", "Context API"],
    code: "https://github.com/Vinayakporwal/", link: "", // TODO: correct links
    image: "https://i.ibb.co/t43Ry8j/craft-x-ss.png",
  },
  {
    slug: "youtool", title: "YouTool: Enhanced YouTube Client",
    description: "A YouTube client with video download, a custom feed and saved favourites.",
    tech: ["React", "Node.js", "YouTube Data API v3"],
    code: "https://github.com/Vinayakporwal/youtool", link: "https://you-tool.vercel.app",
    image: "https://craft-x.netlify.app/assets/youtool.2961e55c.png",
  },
  {
    slug: "flux-movies", title: "Flux Movies",
    description: "IMDb-style movie discovery app with search, pagination over 500+ titles and favourites.",
    tech: ["Next.js", "OMDb API"],
    code: "https://github.com/Vinayakporwal/fluxmovies", link: "https://fluxmovies.vercel.app",
    image: "https://craft-x.netlify.app/assets/MovieApp.e529cf3c.png",
  },
  {
    slug: "chathook", title: "Chathook: Real-time Group Chat",
    description: "Real-time group chat with Google sign-in.",
    tech: ["React", "Firebase Auth", "Firestore"],
    code: "https://github.com/VinayakPorwal/chathookWebApp", link: "https://chathook-f2855.web.app",
    image: "https://craft-x.netlify.app/assets/Chathook1.6ee5e0d8.png",
  },
];

export const skills = {
  frontend: ["HTML5", "CSS3", "JavaScript", "TypeScript", "React", "Next.js", "Tailwind CSS", "Redux Toolkit", "Framer Motion"],
  backend: ["Node.js", "Express", "MongoDB", "Firebase", "PHP", "Python", "REST APIs"],
  infra: ["Docker", "AWS", "Redis", "Kafka", "Turborepo", "Micro-frontends", "Git & GitHub", "Vercel"],
};

export type Testimonial = { quote: string; name: string; role: string };

export const testimonials: Testimonial[] = []; // TODO: ask Rashid & Karan for a 1–2 line quote each

// Credits for the atmosphere photographs (Unsplash licence, via picsum.photos)
export const photoCredits = ["Carl Nenzen Loven", "Samuel Zeller", "Erez Attias", "Nicolai Berntsen"];

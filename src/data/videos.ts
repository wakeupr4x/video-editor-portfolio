export interface VideoItem {
  id: string;
  title: string;
  videoSrc: string;
  pastelBg?: string;
  pillColor?: string;
  category?: string;
  aspect?: string;
  duration?: string;
  tag?: string;
  client?: string;
  role?: string;
  description?: string;
  tools: string[];
  featured?: boolean;
  trackLabel?: string;
  resolution?: string;
  framerate?: string;
  codec?: string;
  storyPacing?: string;
  colorGrade?: string;
  soundDesign?: string;
  metrics?: {
    views?: string;
    retention?: string;
    renderTime?: string;
  };
}

export type VideoProject = VideoItem;

export const CONTACT_INFO = {
  name: "Pushkar Verma",
  role: "Lead Video Editor & Post-Production Specialist",
  tagline: "Commercials, Cinematic Narrative & High-Retention Reels",
  status: "OPEN FOR COMMISSIONS",
  email: "pv6628@gmail.com",
  phone: "8269959465",
  whatsappUrl: "https://wa.me/918269959465",
  driveUrl: "https://drive.google.com/drive/folders/1PzVIaBSrcWk8Bh_zPEmFR_4OuK6sKiaj?usp=drive_link",
  instagramUrl: "https://instagram.com",
  youtubeUrl: "https://youtube.com",
  twitterUrl: "https://twitter.com",
};

export const CONTACT = {
  ...CONTACT_INFO,
};

export const DRIVE_FOLDER_URL = "https://drive.google.com/drive/folders/1PzVIaBSrcWk8Bh_zPEmFR_4OuK6sKiaj?usp=drive_link";

export const EDITING_TOOLKIT = [
  { name: "DaVinci Resolve Studio", level: "Expert", type: "Color & NLE", icon: "resolve", version: "v19.1", role: "Color & Finishing", status: "PRIMARY" },
  { name: "Adobe Premiere Pro", level: "Master", type: "Offline Assembly", icon: "premiere", version: "v25.0", role: "Rough Cut & Pacing", status: "PRIMARY" },
  { name: "After Effects", level: "Advanced", type: "Motion & Compositing", icon: "ae", version: "v25.0", role: "VFX & Screen Replacement", status: "SECONDARY" },
  { name: "Audition & Fairlight", level: "Advanced", type: "Audio Mastering", icon: "audio", version: "v25.0", role: "Noise Reduction & EQ", status: "SECONDARY" },
  { name: "Blender 3D", level: "Intermediate", type: "3D Camera Projection", icon: "blender", version: "v4.2", role: "3D Camera Matchmove", status: "SPECIALIZED" },
];

export const VIDEOS: VideoItem[] = [
  {
    id: "sls",
    title: "Mercedes SLS // Apex Chrome",
    videoSrc: "/videos/sls-2.mp4",
    category: "Commercial",
    aspect: "9:16",
    duration: "00:45",
    tag: "Commercial / Automotive",
    client: "Mercedes SLS AMG",
    role: "Lead Editor & Colorist",
    description: "High-octane sound design and dynamic speed ramps crafted for automotive commercial storytelling.",
    tools: ["Premiere Pro", "DaVinci Resolve", "After Effects"],
    metrics: { views: "1.4M", retention: "84%", renderTime: "4K 60fps" },
    pastelBg: "bg-pastel-purple",
    pillColor: "bg-[#D0BCFF] text-[#381E72]",
  },
  {
    id: "money-reel",
    title: "Kinetic Wealth Reel",
    videoSrc: "/videos/MONEY SAMPLE-3.mp4",
    category: "Reel",
    aspect: "9:16",
    duration: "00:32",
    tag: "Short Form / Kinetic",
    client: "Fintech Collective",
    role: "Pacing & Motion Design",
    description: "Ultra-fast kinetic typography with seamless audio sync and punchy visual hooks.",
    tools: ["After Effects", "Premiere Pro"],
    metrics: { views: "820K", retention: "91%", renderTime: "4K ProRes" },
    pastelBg: "bg-pastel-mint",
    pillColor: "bg-[#B4E3C1] text-[#1B4D2B]",
  },
  {
    id: "ds-promo",
    title: "Dark Syndicate Cyberpunk",
    videoSrc: "/videos/DS PROMO-2.mp4",
    category: "Commercial",
    aspect: "9:16",
    duration: "00:38",
    tag: "Stylized Promo",
    client: "Dark Syndicate Studio",
    role: "Offline & Online Editor",
    description: "Atmospheric dystopian aesthetic with neon accents and glitch transitions.",
    tools: ["Premiere Pro", "DaVinci Resolve"],
    metrics: { views: "560K", retention: "79%", renderTime: "4K Master" },
    pastelBg: "bg-pastel-pink",
    pillColor: "bg-[#F8BBD0] text-[#633B48]",
  },
  {
    id: "yoga-reel",
    title: "Zenith Flow Aesthetics",
    videoSrc: "/videos/yoga sls.mp4",
    category: "Reel",
    aspect: "9:16",
    duration: "00:42",
    tag: "Lifestyle / Wellness",
    client: "Zenith Flow Studio",
    role: "Colorist & Sound Design",
    description: "Fluid transitions and natural tones paired with ambient cinematic audio.",
    tools: ["DaVinci Resolve", "Premiere Pro"],
    metrics: { views: "410K", retention: "86%", renderTime: "4K 60fps" },
    pastelBg: "bg-pastel-yellow",
    pillColor: "bg-[#FFE082] text-[#5C4400]",
  },
  {
    id: "ufc",
    title: "Octagon Fight Teaser",
    videoSrc: "/videos/UFC.mp4",
    category: "Commercial",
    aspect: "9:16",
    duration: "00:54",
    tag: "Sports / High Impact",
    client: "Combat Sports Promo",
    role: "Impact Editor",
    description: "Aggressive sync cuts, heavy bass impacts, and high-energy motion typography.",
    tools: ["Premiere Pro", "After Effects", "Audition"],
    metrics: { views: "2.1M", retention: "88%", renderTime: "4K ProRes" },
    pastelBg: "bg-pastel-blue",
    pillColor: "bg-[#BFD4FF] text-[#1D3B6F]",
  },
  {
    id: "final-comp",
    title: "Echoes Sci-Fi Narrative",
    videoSrc: "/videos/Final Comp_4.mp4",
    category: "Film",
    aspect: "9:16",
    duration: "01:12",
    tag: "Narrative / VFX",
    client: "Indie Cinema",
    role: "VFX Compositor & Editor",
    description: "Story-driven sci-fi sequence featuring custom visual effects and ACES color grading.",
    tools: ["After Effects", "DaVinci Resolve"],
    metrics: { views: "340K", retention: "82%", renderTime: "4K 24fps" },
    pastelBg: "bg-pastel-purple",
    pillColor: "bg-[#D0BCFF] text-[#381E72]",
  },
  {
    id: "luma",
    title: "Luma 3D Camera Tracking",
    videoSrc: "/videos/luma-1.mp4",
    category: "Commercial",
    aspect: "9:16",
    duration: "00:30",
    tag: "3D VFX Showcase",
    client: "Luma Vision Lab",
    role: "3D Tracking & Edit",
    description: "Precision 3D camera projection integrated with real-world footage.",
    tools: ["Blender", "After Effects", "Premiere Pro"],
    metrics: { views: "650K", retention: "89%", renderTime: "4K 60fps" },
    pastelBg: "bg-pastel-mint",
    pillColor: "bg-[#B4E3C1] text-[#1B4D2B]",
  },
  {
    id: "shadow-doc",
    title: "Shadow Capital Mini-Doc",
    videoSrc: "/videos/money-laundering-top3.mp4",
    category: "Film",
    aspect: "9:16",
    duration: "01:25",
    tag: "Documentary / Crime",
    client: "Investigative Media",
    role: "Documentary Editor",
    description: "Engaging documentary storytelling with newspaper pop-ups and archival animation.",
    tools: ["Premiere Pro", "After Effects"],
    metrics: { views: "980K", retention: "85%", renderTime: "4K ProRes" },
    pastelBg: "bg-pastel-pink",
    pillColor: "bg-[#F8BBD0] text-[#633B48]",
  },
  {
    id: "midnight",
    title: "Midnight Drive Montage",
    videoSrc: "/videos/MM--H3.mp4",
    category: "Music Video",
    aspect: "9:16",
    duration: "00:48",
    tag: "Music Video / Night",
    client: "Nightwave Records",
    role: "Editor & Stylist",
    description: "Moody atmospheric night visuals synchronized to synthwave rhythms.",
    tools: ["DaVinci Resolve", "Premiere Pro"],
    metrics: { views: "490K", retention: "83%", renderTime: "4K ProRes" },
    pastelBg: "bg-pastel-yellow",
    pillColor: "bg-[#FFE082] text-[#5C4400]",
  },
  {
    id: "resampled",
    title: "Resampled Glitch Odyssey",
    videoSrc: "/videos/resmapled-if.mp4",
    category: "Music Video",
    aspect: "9:16",
    duration: "00:40",
    tag: "Experimental / Glitch",
    client: "Electronic Pulse",
    role: "Creative Editor",
    description: "Experimental analog glitch art with custom texture overlays and sound-responsive visual noise.",
    tools: ["After Effects", "Premiere Pro"],
    metrics: { views: "710K", retention: "87%", renderTime: "4K Master" },
    pastelBg: "bg-pastel-blue",
    pillColor: "bg-[#BFD4FF] text-[#1D3B6F]",
  },
];

export const VIDEO_PROJECTS: VideoItem[] = VIDEOS;

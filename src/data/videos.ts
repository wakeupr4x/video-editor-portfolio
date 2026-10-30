export interface VideoItem {
  id: string;
  title: string;
  videoSrc: string;
  pastelBg: string;
  pillColor: string;
}

export const CONTACT = {
  name: "Pushkar Verma",
  role: "Video Editor",
  email: "pv6628@gmail.com",
  phone: "8269959465",
  whatsappUrl: "https://wa.me/918269959465",
  driveUrl: "https://drive.google.com/drive/folders/1PzVIaBSrcWk8Bh_zPEmFR_4OuK6sKiaj?usp=drive_link",
};

export const VIDEOS: VideoItem[] = [
  {
    id: "sls",
    title: "Mercedes SLS",
    videoSrc: "/videos/sls-2.mp4",
    pastelBg: "bg-pastel-purple",
    pillColor: "bg-[#D0BCFF] text-[#381E72]",
  },
  {
    id: "money-reel",
    title: "Kinetic Reel",
    videoSrc: "/videos/MONEY SAMPLE-3.mp4",
    pastelBg: "bg-pastel-mint",
    pillColor: "bg-[#B4E3C1] text-[#1B4D2B]",
  },
  {
    id: "ds-promo",
    title: "Dark Syndicate",
    videoSrc: "/videos/DS PROMO-2.mp4",
    pastelBg: "bg-pastel-pink",
    pillColor: "bg-[#F8BBD0] text-[#633B48]",
  },
  {
    id: "yoga-reel",
    title: "Zenith Flow",
    videoSrc: "/videos/yoga sls.mp4",
    pastelBg: "bg-pastel-yellow",
    pillColor: "bg-[#FFE082] text-[#5C4400]",
  },
  {
    id: "ufc",
    title: "Fight Promo",
    videoSrc: "/videos/UFC.mp4",
    pastelBg: "bg-pastel-blue",
    pillColor: "bg-[#BFD4FF] text-[#1D3B6F]",
  },
  {
    id: "final-comp",
    title: "Echoes Sci-Fi",
    videoSrc: "/videos/Final Comp_4.mp4",
    pastelBg: "bg-pastel-purple",
    pillColor: "bg-[#D0BCFF] text-[#381E72]",
  },
  {
    id: "luma",
    title: "Luma 3D",
    videoSrc: "/videos/luma-1.mp4",
    pastelBg: "bg-pastel-mint",
    pillColor: "bg-[#B4E3C1] text-[#1B4D2B]",
  },
  {
    id: "shadow-doc",
    title: "Shadow Capital",
    videoSrc: "/videos/money-laundering-top3.mp4",
    pastelBg: "bg-pastel-pink",
    pillColor: "bg-[#F8BBD0] text-[#633B48]",
  },
  {
    id: "midnight",
    title: "Midnight Clip",
    videoSrc: "/videos/MM--H3.mp4",
    pastelBg: "bg-pastel-yellow",
    pillColor: "bg-[#FFE082] text-[#5C4400]",
  },
  {
    id: "resampled",
    title: "Glitch Art",
    videoSrc: "/videos/resmapled-if.mp4",
    pastelBg: "bg-pastel-blue",
    pillColor: "bg-[#BFD4FF] text-[#1D3B6F]",
  },
];

const siteUrl = (
  import.meta.env.SITE_URL ||
  import.meta.env.PUBLIC_SITE_URL ||
  "https://signblueblau.github.io"
).replace(/\/$/, "");

export const SITE = {
  name: "肉骨明的自留地",
  description: "一个可以自言自语、无关痛痒的自留地",
  url: siteUrl,
  locale: "en-US",
  language: "en",
  repositoryUrl: "https://github.com/signblueblau",
};

export const NAVIGATION = [
  { to: "/", label: "Home" },
  { to: "/blog", label: "Writing" },
  { to: "/about", label: "About" },
  { to: "/contact", label: "Contact" },
];

export const CONTACT = {
  email: "blueblau@163.com",
};

export const FORMS = {
  contact: {
    action: "",
    method: "post",
    enctype: "application/x-www-form-urlencoded",
  },
  newsletter: {
    action: "",
    method: "post",
    enctype: "application/x-www-form-urlencoded",
  },
};

export const SOCIAL_LINKS = [
  { href: "/rss.xml", label: "RSS feed", icon: "rss" },
  { href: SITE.repositoryUrl, label: `${SITE.name} on GitHub`, icon: "github" },
  { href: `mailto:${CONTACT.email}`, label: "Email", icon: "mail" },
];

export const authors = [
  {
    slug: "rouguming",
    name: "肉骨明",
    bio: "在这里自言自语。",
    longBio: "在这块自留地上随手写写，无关痛痒。",
    avatar: "/avatars/rouguming.svg",
  },
];

export const categories = [
  { slug: "essays", name: "Essays" },
  { slug: "design", name: "Design" },
  { slug: "engineering", name: "Engineering" },
  { slug: "field-notes", name: "Field Notes" },
  { slug: "interviews", name: "Interviews" },
];

export const tags = [
  { slug: "writing", name: "Writing" },
  { slug: "typography", name: "Typography" },
  { slug: "minimalism", name: "Minimalism" },
  { slug: "tools", name: "Tools" },
  { slug: "travel", name: "Travel" },
  { slug: "process", name: "Process" },
  { slug: "web", name: "Web" },
  { slug: "books", name: "Books" },
];

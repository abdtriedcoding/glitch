const site_url = process.env.NEXT_PUBLIC_APP_URL!;

export const siteConfig = {
  name: "Glitch",
  description:
    "Glitch  makes it easy for people to communicate and work together in one place. It has real-time messaging, voice and video channels, group chats, file sharing, and more. It’s perfect for community groups, schools, and teams to organize, share ideas, and stay connected, no matter where they are.",
  url: site_url,
  ogImage: `${site_url}/thumbnail-dark.png`,
  links: {
    twitter: "https://twitter.com/abdtriedcoding",
    github: "https://github.com/abdtriedcoding/glitch",
  },
};

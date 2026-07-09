const baseUrl = "https://bobby-media-photo-studio.vercel.app";

export default function sitemap() {
  const routes = [
    "",
    "/gallery",
    "/services",
    "/contact",
    "/about",
  ];

  return routes.map((route) => ({
    url: `${baseUrl}${route}`,
    lastModified: new Date(),
    changeFrequency: "weekly",
    priority: route === "" ? 1 : 0.8,
  }));
}
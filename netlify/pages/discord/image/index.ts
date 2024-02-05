import { Request, Response } from "express";
import { Cache } from "memory-cache";

const cache = new Cache();

// A simple template string function for SVG
const svg = (
  width: number,
  height: number,
  content: string
) => `<?xml version="1.0" encoding="UTF-8"?>
<svg width="${width}" height="${height}" xmlns="http://www.w3.org/2000/svg">
  ${content}
</svg>`;

// The actual function
function getSvg(discUser: { username: string; avatarUrl: string }) {
  return svg(
    300,
    100,
    `<text x="10" y="20" font-family="Roboto" font-size="20">${discUser.username}</text>
    <image x="10" y="30" width="50" height="50" href="${discUser.avatarUrl}" />`
  );
}

type DiscordResponse = {
  username: string;
  avatarUrl: string;
};

export async function ALDiscordSvg(req: Request, res: Response) {
  let cached = cache.get("discord") as DiscordResponse | undefined;

  if (!cached) {
    const discUser = await fetch(
      `https://cakes-api.netlify.app/anilist/discord`
    ).then((res) => res.json());

    cached = {
      ...discUser,
    };

    cache.put("discord", cached, 1000 * 60);
  }

  const svg = getSvg({
    username: cached!.username,
    avatarUrl: cached!.avatarUrl,
  });

  res.setHeader("Content-Type", "image/svg+xml");
  res.send(svg);
}

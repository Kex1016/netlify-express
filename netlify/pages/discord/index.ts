import { Response, Request } from "express";

import { Cache } from "memory-cache";

const cache = new Cache();

export async function Discord(req: Request, res: Response) {
  const cached = cache.get("discord");
  if (cached) {
    res.send(cached);
    return;
  }

  const discUser = await fetch(
    `https://discord.com/api/users/147709526357966848`,
    {
      headers: {
        Authorization: `Bot ${process.env.DISCORD_TOKEN}`,
      },
    }
  ).then((res) => res.json());
  const avatar = `https://cdn.discordapp.com/avatars/${discUser.id}/${discUser.avatar}.png?size=1024`;

  // Remove "flags", "public_flags" and "premium_type" from the response
  delete discUser.flags;
  delete discUser.public_flags;
  delete discUser.premium_type;

  const response = {
    ...discUser,
    avatarUrl: avatar,
  };

  cache.put("discord", response, 1000 * 60);

  // TODO: Make this an svg, and send it as an image or whatever
  res.send(response);
}

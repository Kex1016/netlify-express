import { Response, Request } from "express";
import { musicCard } from "welcard";

export async function ALDiscord(req: Request, res: Response) {
  const discUser = await fetch(
    `https://discord.com/api/users/147709526357966848`,
    {
      headers: {
        Authorization: `Bot ${process.env.DISCORD_TOKEN}`,
      },
    }
  ).then((res) => res.json());
  const image = new musicCard();

  const avatar = `https://cdn.discordapp.com/avatars/${discUser.id}/${discUser.avatar}.png?size=1024`;

  image.setThumbnail(avatar);
  image.setColor("auto");
  image.setName(discUser.username);
  image.setBrightness(50);

  const imageBuffer = await image.build();

  res.writeHead(200, {
    "Content-Type": "image/png",
    "Content-Length": imageBuffer.length,
  });

  res.end(imageBuffer);
}

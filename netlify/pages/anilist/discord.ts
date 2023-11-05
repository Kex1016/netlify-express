import { Response, Request } from "express";

export async function ALDiscord(req: Request, res: Response) {
  const discUser = await fetch(
    `https://discord.com/api/users/147709526357966848`,
    {
      headers: {
        Authorization: `Bot ${process.env.DISCORD_TOKEN}`,
      },
    }
  ).then((res) => res.json());
  const avatar = `https://cdn.discordapp.com/avatars/${discUser.id}/${discUser.avatar}.png?size=1024`;

  // TODO: Make this an svg, and send it as an image or whatever
  res.send(`hello world!<br>discord avatar:<br><img src="${avatar}" />`);
}

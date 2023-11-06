import {Response, Request} from "express";

export async function ALStatsFM(req: Request, res: Response) {
  const apiBase = "https://beta-api.stats.fm";
  const profile = await fetch(`${apiBase}/api/v1/users/the_cakes/profile`).then((res) => res.json());
  const streams = await fetch(`${apiBase}/api/v1/users/the_cakes/streams`).then((res) => res.json());
  const current = await fetch(`${apiBase}/api/v1/users/the_cakes/streams/current`).then((res) => res.json());

  const response = {
    profile, streams, current
  }

  res.send(response);
}

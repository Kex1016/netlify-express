import { Response, Request } from "express";

export async function ALStatsFM(req: Request, res: Response) {
  const apiBase = "https://beta-api.stats.fm";
  const test = await fetch(`${apiBase}/api/v1/users/the_cakes/profile`).then((res) => res.json());
  
  res.send(test);
}

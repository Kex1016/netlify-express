import { Response, Request } from "express";

import { Cache } from "memory-cache";

const cache = new Cache();

export async function StatsFM(req: Request, res: Response) {
  const cached = cache.get("statsfm");
  if (cached) {
    res.send(cached);
    return;
  }

  const apiBase = "https://beta-api.stats.fm";
  const profile = await fetch(`${apiBase}/api/v1/users/the_cakes/profile`).then(
    (res) => res.json()
  );
  const streams = await fetch(`${apiBase}/api/v1/users/the_cakes/streams`).then(
    (res) => res.json()
  );
  const current = await fetch(
    `${apiBase}/api/v1/users/the_cakes/streams/current`
  ).then((res) => res.json());

  const response = {
    profile,
    streams,
    current,
  };

  cache.put("statsfm", response, 1000 * 30);

  res.send(response);
}

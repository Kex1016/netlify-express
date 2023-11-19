import { Response, Request } from "express";
import {readdirSync} from "fs";
import {join} from "path";

export async function RandomAvatar(req: Request, res: Response) {
  const avatars = readdirSync(join(__dirname, "static"))
  const avatar = avatars[Math.floor(Math.random() * avatars.length)]
  res.sendFile(join(__dirname, "static", avatar));
}

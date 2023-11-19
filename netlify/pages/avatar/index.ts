import { Response, Request } from "express";
import * as fs from "fs";
import {join} from "path";

export async function RandomAvatar(req: Request, res: Response) {
  const avatars = [
    "https://safe.haiiro.moe/5Z9V5uV8UGJR.png", // pewpew.png
    "https://safe.haiiro.moe/kSpoaMQZY8vc.jpg", // yui.jpg
    "https://safe.haiiro.moe/yuaL2YLytfUS.jpg", // sadge.jpg
    "https://safe.haiiro.moe/bnFFSs2rG87Z.jpg", // maid.jpg
    "https://safe.haiiro.moe/OwZ529wXXwIn.png", // fran.png
    "https://safe.haiiro.moe/F1y4IESozJq9.jpg", // database.jpg
    "https://safe.haiiro.moe/ZupSCF9QjHlU.jpg", // dark.jpg
    "https://safe.haiiro.moe/0AJe1RheWWoe.jpg", // cute.jpg
    "https://safe.haiiro.moe/R0yJR34TE6Oj.jpg", // alcohol.jpg
    "https://safe.haiiro.moe/MvCxikXiF0pi.jpg", // egofear.jpg
    "https://safe.haiiro.moe/XznVdEcGwuww.jpg", // smirk.jpg
    "https://safe.haiiro.moe/eetcwbTcYFD2.jpg", // niko.jpg 
  ]
  const avatar = avatars[Math.floor(Math.random() * avatars.length)];
  
  res.writeHead(302, {
    Location: avatar,
  });
  res.end();
}

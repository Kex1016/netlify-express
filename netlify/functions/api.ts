import express, { Router } from "express";
import serverless from "serverless-http";
import { ALIndex } from "../util/anilist";
import { ALDiscord } from "../util/anilist/discord";
import { ALStatsFM } from "../util/anilist/statsfm";

const api = express();

const router = Router();
router.get("/anilist", (req, res) => ALIndex(req, res));
router.get("/anilist/discord", (req, res) => ALDiscord(req, res));
router.get("/anilist/statsfm", (req, res) => ALStatsFM(req, res));

api.use("/", router);

export const handler = serverless(api);

import express, { Router } from "express";
import serverless from "serverless-http";
import { AniList } from "../pages/anilist";
import { Discord } from "../pages/discord";
import { StatsFM } from "../pages/statsfm";
import { Index } from "../pages";
import { config } from "dotenv";
import { RandomAvatar } from "../pages/avatar";
import { StatsFmSvg } from "../pages/statsfm/image";

config();

const api = express();

const router = Router();
router.get("/", (req, res) => Index(req, res));
router.get("/anilist", (req, res) => AniList(req, res));
router.get("/discord", (req, res) => Discord(req, res));
router.get("/statsfm", (req, res) => StatsFM(req, res));
router.get("/statsfm/image", (req, res) => StatsFmSvg(req, res));
router.get("/avatar", (req, res) => RandomAvatar(req, res));

api.use(router);

export const handler = serverless(api);

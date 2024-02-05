import express, { Router } from "express";
import serverless from "serverless-http";
import { AniList } from "../pages/anilist";
import { Discord } from "../pages/discord";
import { StatsFM } from "../pages/statsfm";
import { Index } from "../pages";
import { config } from "dotenv";
import { RandomAvatar } from "../pages/avatar";
import { DiscordSvg } from "../pages/discord/image";

config();

const api = express();

const router = Router();
router.get("/", (req, res) => Index(req, res));
router.get("/anilist", (req, res) => AniList(req, res));
router.get("/discord", (req, res) => Discord(req, res));
router.get("/discord/image", (req, res) => DiscordSvg(req, res));
router.get("/statsfm", (req, res) => StatsFM(req, res));
router.get("/avatar", (req, res) => RandomAvatar(req, res));

api.use(router);

export const handler = serverless(api);

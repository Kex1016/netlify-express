import { Response, Request } from "express";
import { errorHtml } from "../util/constants";

export async function ALIndex(req: Request, res: Response) {
  res.send(errorHtml(req, res));
}

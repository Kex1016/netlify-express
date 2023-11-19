import { Response, Request } from "express";
import { errorHtml } from "../util/constants";

export async function Index(req: Request, res: Response) {
  res.send(errorHtml);
}

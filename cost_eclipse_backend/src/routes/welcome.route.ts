import { Router, Request, Response } from "express";
import { sendResponse } from "../common/response.handler";
import { Messages } from "../common/messages";

const router = Router();

router.get("/", (_req: Request, res: Response) => {
  return sendResponse(res, 200, true, Messages.WELCOME, {
    service: "Cost Eclipse",
  });
});

export default router;

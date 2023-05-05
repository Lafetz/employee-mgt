import * as jwt from "jsonwebtoken";
import { Request, Response, NextFunction } from "express";
import { ReqUser } from "../utils/types";
export const verifyToken = (
  req: ReqUser,
  res: Response,
  next: NextFunction
) => {
  try {
    const { accessToken, refreshToken } = req.cookies.token;
    if (!accessToken) {
      return res.sendStatus(401);
    }
    try {
      const data = jwt.verify(accessToken, process.env.JWT_KEY as string);
      req.user = data as object; //
    } catch (err) {
      console.log(err);
    }

    next();
  } catch (err) {
    next();
  }
};

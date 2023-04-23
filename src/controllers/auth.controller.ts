import db from "../utils/db";
import * as jwt from "jsonwebtoken";
import { Request, Response, NextFunction } from "express";
import bcrypt from "bcryptjs";
export const userLogin = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const user = await db.user.findUnique({
      where: {
        email: req.body.email,
      },
    });
    if (user) {
      const statusLogin = await bcrypt.compare(
        req.body.password,

        user.password
      );
      if (!statusLogin) {
        res.sendStatus(401).json("incorrect password!");
        return next();
      }
      const accessToken = jwt.sign(user, process.env.JWT_KEY as string);
      const refreshToken = jwt.sign(user, process.env.JWT_KEY as string);
      res.cookie("refreshToken", refreshToken, {
        maxAge: 86400 * 1000,
        secure: true,
        httpOnly: true,
      });
      res
        .cookie("accesstoken", accessToken, {
          maxAge: 86400 * 1000,
          secure: true,
          httpOnly: true,
        })
        .status(200)
        .json("login success!");
    } else {
      res.status(500).json("User not found");
    }
  } catch (err) {
    if (typeof err === "string") {
      res.status(500).json(err);
    } else if (err instanceof Error) {
      res.status(500).json(err.message);
    }
  }
};

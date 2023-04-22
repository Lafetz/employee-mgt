import db from "../utils/db";
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
      // const accessToken = jwt.sign(user.toJSON(), process.env.TOP_KEY);
      const accessToken = 0;
      res
        .cookie("token", accessToken, {
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

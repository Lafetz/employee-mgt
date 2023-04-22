import db from "../utils/db";
import { Request, Response, NextFunction } from "express";
import bcrypt from "bcryptjs";
export const userLogin = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const admin = await db.user.findUnique({
      where: {
        email: req.body.email,
      },
    });
    if (admin) {
      const statusLogin = bcrypt.compare(req.body.password, admin.password);
      res.status(200).json(statusLogin);
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

import { Request, Response, NextFunction } from "express";
export const verifyUser = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    res.sendStatus(401);
  } catch (err) {
    if (typeof err === "string") {
      res.status(500).json(err);
    } else if (err instanceof Error) {
      res.status(500).json(err.message);
    }
  }
};

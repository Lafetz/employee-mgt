import db from "../utils/db";
import { Request, Response, NextFunction } from "express";

export const listLeaves = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const leaves = await db.leave.findMany({
      include: {
        User: true,
      },
    });
    res.json(leaves);
  } catch (err) {
    if (typeof err === "string") {
      res.status(500).json(err);
    } else if (err instanceof Error) {
      res.status(500).json(err.message);
    }
  }
};
export const addLeave = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    console.log("running", req.body);
    const leave = await db.leave.create({
      data: {
        name: req.body.name,
        content: req.body.content,
        startDate: req.body.startDate,
        endDate: req.body.endDate,
        status: req.body.status,
        userId: req.body.userId,
      },
    });
    res.sendStatus(201);
  } catch (err) {
    if (typeof err === "string") {
      res.status(500).json(err);
    } else if (err instanceof Error) {
      res.status(500).json(err.message);
    }
  }
};
export const removeLeave = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    await db.leave.delete({
      where: {
        id: req.params.leaveId,
      },
    });
    res.sendStatus(200);
  } catch (err) {
    if (typeof err === "string") {
      res.status(500).json(err);
    } else if (err instanceof Error) {
      res.status(500).json(err.message);
    }
  }
};
export const updateLeave = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    await db.leave.update({
      where: {
        id: req.params.leaveId,
      },
      data: {
        name: req.body.name,
        content: req.body.content,
        startDate: req.body.startDate,
        endDate: req.body.endDate,
        status: req.body.status,
      },
    });
    res.sendStatus(200);
  } catch (err) {
    if (typeof err === "string") {
      res.status(500).json(err);
    } else if (err instanceof Error) {
      res.status(500).json(err.message);
    }
  }
};

import { Request, Response, NextFunction } from "express";
import db from "../db/db";

export const listTasks = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const tasks = await db.task.findMany();
    res.sendStatus(200).json(tasks);
  } catch (err) {
    //  res.status(500).json(err.message);
  }
};
export const addTask = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const task = await db.task.create({
      data: {
        name: req.body.name,
        content: req.body.name,
        duedate: req.body.name,
        userId: req.body.name,
      },
    });
    res.sendStatus(201);
  } catch (err) {
    //res.status(500).json(err.message);
  }
};
export const removeTask = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    await db.task.delete({
      where: {
        id: req.body.id,
      },
    });
    res.sendStatus(200);
  } catch (err) {
    //  res.status(500).json(err.message);
  }
};
export const updateTask = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    await db.task.update({
      where: {
        id: req.body.id,
      },
      data: {
        name: req.body.name,
        content: req.body.name,
        duedate: req.body.name,
        userId: req.body.name,
        taskDone: req.body.taskDone,
      },
    });
    res.sendStatus(200);
  } catch (err) {
    // res.status(500).json(err.message);
  }
};

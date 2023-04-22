import db from "../utils/db";
import { Request, Response, NextFunction } from "express";
import bcrypt from "bcryptjs";
export const listEmployees = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const employees = await db.user.findMany({
      where: {
        isAdmin: false,
      },
    });
    res.json(employees);
  } catch (err) {
    if (typeof err === "string") {
      res.status(500).json(err);
    } else if (err instanceof Error) {
      res.status(500).json(err.message);
    }
  }
};
export const addEmployee = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const hashedPassword = await bcrypt.hash(req.body.password, 10);
    const employee = await db.user.create({
      data: {
        firstname: req.body.firstname,
        lastname: req.body.lastname,
        email: req.body.email,
        password: hashedPassword,
        isAdmin: false,
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
export const removeEmployee = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    await db.user.delete({
      where: {
        id: req.params.employeeId,
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
export const updateEmployee = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    await db.user.update({
      where: {
        id: req.params.employeeId,
      },
      data: {
        firstname: req.body.firstname,
        lastname: req.body.lastname,
        email: req.body.email,
        password: req.body.password,
        isAdmin: false,
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

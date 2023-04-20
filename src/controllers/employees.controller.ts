import db from "../db/db";
import { Request, Response, NextFunction } from "express";

export const listEmployees = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const employees = await db.user.findMany({
      where: {
        isAdmin: {
          not: true,
        },
      },
    });
    res.sendStatus(200).json(employees);
  } catch (err) {
    // res.status(500).json(err.message);
  }
};
export const addEmployee = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const employee = await db.user.create({
      data: {
        firstname: req.body.firstname,
        lastname: req.body.lastname,
        email: req.body.email,
        password: req.body.password,
        isAdmin: false,
      },
    });
    console.log(employee);
  } catch (err) {
    //res.status(500).json(err.message);
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
        id: req.body.id,
      },
    });
    res.sendStatus(200);
  } catch (err) {
    //res.status(500).json(err.message);
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
        id: req.body.id,
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
    //res.status(500).json(err.message);
  }
};

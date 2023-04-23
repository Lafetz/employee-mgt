import { Request, Response, NextFunction } from "express";
export interface ReqUser extends Request {
  user: object;
}

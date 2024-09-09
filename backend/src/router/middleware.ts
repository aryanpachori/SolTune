import { NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken";

export function middleware(req: Request, res: Response, next: NextFunction) {
  const authHeader = req.headers["authorization"] ?? "";

  if (!authHeader) {
    return res.status(403).json({ message: "Token not provided!" });
  }

  try {
    const decoded = jwt.verify(authHeader, process.env.JWT_SECRET!);

    //@ts-ignore
    if (decoded.userId) {
      //@ts-ignore
      req.userId = decoded.userId;

      return next();
    } else {
      return res.status(403).json({
        message: "Invalid token!",
      });
    }
  } catch (e: any) {
    return res.status(403).json({
      message: "You are not logged in",
    });
  }
}

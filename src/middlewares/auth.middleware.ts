import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";

export const authMiddleware = (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const token = req.cookies?.access_token;
    // console.log("token from authMiddleware-->", token);
    if (!token) {
      res.status(401).json({ message: "Unauthenticated" });
      return;
    }
    // console.log("block");
    const decoded = jwt.verify(token, process.env.JWT_SECRET!) as {
      id: string;
      name: string;
    };

    // attach user to request
    req.user = { id: decoded.id, name: decoded.name };

    next();
  } catch (error) {
    return res.status(401).json({ message: "Invalid token" });
  }
};

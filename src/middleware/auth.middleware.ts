import { Request, Response, NextFunction } from "express";

const authMiddleware = (req: Request, res: Response, next: NextFunction) => {
  const isAuthenticated = req.cookies.isAuthenticated;
  if (isAuthenticated === "true") {
    next();
  } else {
    res.status(401).json({ message: "Access denied. Please login." });
  }
};
module.exports = authMiddleware;

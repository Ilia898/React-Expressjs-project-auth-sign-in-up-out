import { Request, Response, NextFunction } from "express";
import { SECRET } from "../utils/envConfig";
import * as jwt from "jsonwebtoken";
import { userData } from "../models/user";

export const isAuthenticated = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { access_token: token } = req.cookies;
    if (token) {
      jwt.verify(token, SECRET, {}, (err) => {
        if (err) throw err;
        next();
      });
    } else {
      res.status(401).json("Unauthorized");
    }
  } catch (err) {
    res.status(500).json({ error: "Internal Server Error" });
  }
};

import { Request, Response } from "express";
import { SECRET } from "../utils/envConfig";
import * as jwt from "jsonwebtoken";

export const userCookieTokenRes = async (
  firstName: string | undefined,
  email: string | undefined,
  res: Response
) => {
  jwt.sign(
    { email, firstName },
    SECRET,
    { expiresIn: Math.floor(Date.now() / 1000) + 5 * 60 * 60 },
    (err, token) => {
      if (err) throw err;

      res
        .cookie("access_token", token)
        .json({ email: email, firstName: firstName });
    }
  );
};

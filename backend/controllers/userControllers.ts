import { Request, Response, response } from "express";
import mongoose from "mongoose";
import bcrypt from "bcrypt";
import { userData } from "../models/user";
import { SECRET } from "../utils/envConfig";
import * as jwt from "jsonwebtoken";
import * as emails from "../utils/emailBodies";
import crypto from "crypto";
import * as myfunction from "../utils/requiredFunctions";

export const rootGet = (req: Request, res: Response) => {
  res.send("hello");
};

export const authGet = (req: Request, res: Response) => {
  try {
    const { access_token: token } = req.cookies;
    if (!token) {
      res.status(401).json("Unauthorized");
    }

    jwt.verify(token, SECRET, {}, (err, user) => {
      if (err) throw err;
      res.status(200).json(user);
    });
  } catch (err) {
    res.status(500).json({ error: "Internal Server Error" });
  }
};

export const loginPost = async (req: Request, res: Response) => {
  try {
    const { email, password } = req.body.data;
    const user = await userData.findOne({ email });

    if (!user) {
      return res.status(404).send({ error: "User not found" });
    }

    const paswordCorrect =
      user == null
        ? false
        : await bcrypt.compare(password, user.passwordHash || "");

    if (user && paswordCorrect) {
      myfunction.userCookieTokenRes(user.firstName, user.email, res);
    }

    if (!(user && paswordCorrect)) {
      return res.status(404).json("invalid email or password");
    }
  } catch (err) {
    res.status(500).json({ error: "Internal Server Error" });
  }
};

export const registerPost = async (req: Request, res: Response) => {
  try {
    const { firstName, lastName, email, password } = req.body.data;
    const user = await userData.findOne({ email });

    if (user) {
      return res.status(400).json("A user with this email already exists.");
    }

    const saltRoinds = 10;
    const passwordHash = await bcrypt.hash(password, saltRoinds);
    const registeredwith = "";
    const registrationDate = Date.now();
    const identify = false;
    const identifyToken = await crypto.randomBytes(32).toString("hex");
    const identifyDate = Date.now() + 60 * 60 * 1000;

    const identifyUrl = `${req.protocol}://${req.get(
      "host"
    )}/identifyemail/${identifyToken}`;

    emails.registerEmailIdentify(email, firstName, identifyUrl);

    const newUser = new userData({
      firstName,
      lastName,
      email,
      passwordHash,
      registeredwith,
      registrationDate,
      identify,
      identifyToken,
      identifyDate,
    });

    await newUser.save();
    res.json({ message: "User registered successfully" });
  } catch (err) {
    res.status(500).json({ error: "Internal Server Error" });
  }
};

export const logoutGet = (req: Request, res: Response) => {
  try {
    res.clearCookie("access_token");
    res.status(200).json("Logout");
  } catch (err) {
    res.status(500).json({ error: "Internal Server Error" });
  }
};

export const forgotPasswordPost = async (req: Request, res: Response) => {
  try {
    const { email, password } = req.body.data;
    const user = await userData.findOne({
      identifyToken: req.params.resetToken,
    });

    if (!email && (!password || !user)) {
      return res
        .status(404)
        .send(
          "The email is invalid or the update link has expired. Please try again"
        );
    }

    if (email) {
      const newIdentifyToken = await crypto.randomBytes(32).toString("hex");
      const resetUrl = `${req.get("origin")}/passwordreset/${newIdentifyToken}`;
      await userData.findOneAndUpdate(
        { email: email, identifyToken: "" },
        {
          $set: {
            identifyToken: newIdentifyToken,
            identifyDate: Date.now() + 60 * 60 * 1000,
          },
        }
      );

      emails.passwordResetMailer(email, resetUrl);

      return res.status(200).send("Please check your email");
    }

    if (user && password) {
      const saltRoinds = 10;
      const updatedPasswordHash = await bcrypt.hash(password, saltRoinds);
      user.identifyToken = "";
      user.passwordHash = updatedPasswordHash;
      await user.save();

      return res.status(200).send("Password changed successfully");
    }
  } catch (err) {
    res.status(500).json({ error: "Internal Server Error" });
  }
};

export const dashboardGet = (req: Request, res: Response) => {
  try {
    res.status(400).json({ status: "success" });
    console.log(res);
  } catch (err) {
    res.status(500).json({ error: "Internal Server Error" });
  }
};

export const identifyEmailGet = async (req: Request, res: Response) => {
  try {
    const user = await userData.findOne({ identifyToken: req.params.token });

    if (!user || user.identify === true) {
      return res.status(400).send("Invalid confirmation link");
    }

    const userIdentifyDate = user.identifyDate;
    const currentDate = new Date();

    if (!userIdentifyDate || userIdentifyDate < currentDate) {
      return res
        .status(410)
        .send("You are no longer able to access this link.");
    }

    user.identify = true;
    user.identifyToken = "";
    user.identifyDate = new Date();

    await user.save();

    console.log(user);
    res.status(200).redirect("http://localhost:5173/");
  } catch (err) {
    res.status(500).json({ error: "Internal Server Error" });
  }
};

export const authWithPost = async (req: Request, res: Response) => {
  try {
    const { given_name, family_name, email, email_verified, iss } =
      req.body.userCredential;

    const password =
      given_name + family_name + email + email_verified + iss + SECRET;

    const user = await userData.findOne({ email: email });

    if (!user) {
      const firstName = given_name;
      const lastName = family_name;
      const saltRoinds = 10;
      const passwordHash = await bcrypt.hash(password, saltRoinds);
      const registeredwith = iss;
      const registrationDate = Date.now();
      const identify = email_verified;
      const identifyToken = "";
      const identifyDate = Date.now() + 60 * 60 * 1000;

      const newUser = new userData({
        firstName,
        lastName,
        email,
        passwordHash,
        registeredwith,
        registrationDate,
        identify,
        identifyToken,
        identifyDate,
      });

      await newUser.save();
      console.log("user saved!");

      await myfunction.userCookieTokenRes(firstName, email, res);
    }

    const paswordCorrect =
      user == null
        ? false
        : await bcrypt.compare(password, user.passwordHash || "");
    if (user && paswordCorrect) {
      myfunction.userCookieTokenRes(user.firstName, user.email, res);
    }
  } catch (err) {
    res.status(500).json({ error: "Internal Server Error" });
  }
};

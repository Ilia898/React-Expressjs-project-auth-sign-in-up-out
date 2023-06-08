import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import * as userControlers from "../controllers/userControllers";
import bodyParser from "body-parser";
import * as authControlers from "../controllers/authControlers";
import * as limit from "../controllers/limitControlers";
const router = express.Router();

const corsOptions = {
  origin: "http://localhost:5173",
  credentials: true, //access-control-allow-credentials:true
  optionSuccessStatus: 200,
};

router.use(cors(corsOptions));
router.use(bodyParser.json());
router.use(cookieParser());

router.get("/", userControlers.rootGet);

router.get("/auth", userControlers.authGet);

router.post("/login", limit.passwordlimiter, userControlers.loginPost);
router.post("/register", userControlers.registerPost);
router.get("/logout", authControlers.isAuthenticated, userControlers.logoutGet);
router.post("/forgotpassword", userControlers.forgotPasswordPost);
router.post("/passwordreset/:resetToken", userControlers.forgotPasswordPost);
router.get(
  "/dashboard",
  authControlers.isAuthenticated,
  userControlers.dashboardGet
);
router.get("/identifyemail/:token", userControlers.identifyEmailGet);

router.post("/authwith", userControlers.authWithPost);

export default router;

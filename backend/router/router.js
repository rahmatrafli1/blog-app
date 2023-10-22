import { Router } from "express";
import roleRoutes from "./roles.js";
import userRoutes from "./users.js";
import loginRoutes from "./login.js";
import registerRoutes from "./register.js";
import logoutRoutes from "./logout.js";
import { refreshToken } from "../controller/refreshToken.js";
import postRoutes from "./posts.js";
import contactRoutes from "./contact.js";

const router = Router();

router.get("/", (req, res) => {
  res.send("Hai");
});

router.use("/role", roleRoutes);
router.use("/user", userRoutes);
router.use("/login", loginRoutes);
router.use("/register", registerRoutes);
router.use("/logout", logoutRoutes);
router.get("/token", refreshToken);
router.use("/posts", postRoutes);
router.use("/contact", contactRoutes);

export default router;

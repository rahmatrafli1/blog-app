import { Router } from "express";
import userController from "../controller/userController.js";
import loginController from "../controller/loginController.js";

const userRoutes = Router();

userRoutes.get("/", loginController.cektoken, userController.getAll);
userRoutes.put("/:id", loginController.cektoken, userController.editUser);

export default userRoutes;

import { Router } from "express";
import loginController from "../controller/loginController.js";

const loginRoutes = Router();

loginRoutes.post("/", loginController.login);

export default loginRoutes;

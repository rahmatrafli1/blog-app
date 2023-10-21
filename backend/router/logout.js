import { Router } from "express";
import logoutController from "../controller/logoutController.js";

const logoutRoutes = Router();

logoutRoutes.delete("/", logoutController.logout);

export default logoutRoutes;

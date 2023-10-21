import { Router } from "express";
import registerController from "../controller/registerController.js";

const registerRoutes = Router();

registerRoutes.post("/", registerController.addUser);

export default registerRoutes;

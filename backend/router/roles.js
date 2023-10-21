import { Router } from "express";
import roleController from "../controller/roleController.js";

const roleRoutes = Router();

roleRoutes.get("/", roleController.getRole);
roleRoutes.post("/add", roleController.addRole);

export default roleRoutes;

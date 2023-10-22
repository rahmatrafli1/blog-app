import { Router } from "express";
import contactController from "../controller/contactController.js";

const contactRoutes = Router();

contactRoutes.post("/", contactController.postContact);

export default contactRoutes;

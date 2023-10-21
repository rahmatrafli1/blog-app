import { Router } from "express";
import postController from "../controller/postController.js";
import loginController from "../controller/loginController.js";

const postRoutes = Router();

postRoutes.get("/", postController.getAll);
postRoutes.get("/:id", postController.getById);
postRoutes.post("/", loginController.cektoken, postController.addPost);
postRoutes.put("/:id", loginController.cektoken, postController.editPost);
postRoutes.delete("/:id", loginController.cektoken, postController.deletePost);

export default postRoutes;

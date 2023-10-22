import "dotenv/config";
import express from "express";
import FileUpload from "express-fileupload";
import cors from "cors";
import cookieParser from "cookie-parser";
import router from "./router/router.js";

const app = express();

app.use(cors());

app.use(cookieParser());

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(FileUpload());
app.use(express.static("public"));
app.use(router);

const port = process.env.PORT;

app.listen(port, () => {
  console.log(`Server berjalan di port ${port}`);
});

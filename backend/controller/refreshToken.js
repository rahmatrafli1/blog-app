import { errorHandling } from "../helper/errorHandling.js";
import models from "../models/init-models.js";
import jwt from "jsonwebtoken";

export const refreshToken = async (req, res) => {
  try {
    const reftok = req.cookies.token;
    if (!reftok) res.send(errorHandling("Error!!", 401, "Tidak autorisasi!"));
    const user = await models.users.findAll({
      where: { refresh_token: reftok },
    });

    if (!user[0]) {
      res.send(errorHandling("Error!!", 403, "Tidak bisa diakses!"));
    }
    jwt.verify(reftok, process.env.REFRESH_KEY, (err, decoded) => {
      if (err) {
        res.send(errorHandling("Error!!", 403, "Tidak bisa diakses!"));
      }
      const userId = user[0].id;
      const userName = user[0].username;
      const email = user[0].email;
      const accessToken = jwt.sign(
        { userId, userName, email },
        process.env.SECRET_KEY,
        { expiresIn: "30s" }
      );
      res.json({ accessToken });
    });
  } catch (error) {
    res.send(errorHandling("Error!!", 500, error.message));
  }
};

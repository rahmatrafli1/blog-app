import models from "../models/init-models.js";
import jwt from "jsonwebtoken";

export const refreshToken = async (req, res) => {
  try {
    const reftok = req.cookies.token;
    if (!reftok) {
      // res.send(errorHandling("Error!!", 401, "Tidak autorisasi!"));
      res.status(401).json({ message: "Tidak autorisasi!" });
    } else {
      const user = await models.users.findAll({
        where: { refresh_token: reftok },
      });

      if (!user[0]) {
        // res.send(errorHandling("Error!!", 403, "Tidak bisa diakses!"));
        res.status(403).json({ message: "Tidak bisa diakses" });
      } else {
        jwt.verify(reftok, process.env.REFRESH_KEY, (err, decoded) => {
          if (err) {
            res.status(403).json({ message: "Tidak bisa diakses" });
          } else {
            const userId = user[0].id;
            const userName = user[0].username;
            const email = user[0].email;
            const name = user[0].name;
            const accessToken = jwt.sign(
              { userId, userName, email, name },
              process.env.SECRET_KEY,
              { expiresIn: "30s" }
            );
            res.status(200).json({ accessToken });
          }
        });
      }
    }
  } catch (error) {
    // res.send(errorHandling("Error!!", 500, error.message));
    res.status(500).json({ message: error.message });
  }
};

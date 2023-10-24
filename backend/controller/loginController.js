import models from "../models/init-models.js";
import { errorHandling } from "../helper/errorHandling.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

class loginController {
  static async login(req, res) {
    try {
      const { username, password } = req.body;

      const userdatbase = await models.users.findOne({
        where: { username: username },
      });

      if (userdatbase) {
        if (bcrypt.compareSync(password, userdatbase.password)) {
          const userId = userdatbase.dataValues.id;
          const token = jwt.sign(
            {
              id: userId,
              username: userdatbase.username,
              createdat: userdatbase.createdat,
            },
            process.env.SECRET_KEY,
            { expiresIn: "30s" }
          );
          const reftoken = jwt.sign(
            {
              id: userId,
              username: userdatbase.username,
              createdat: userdatbase.createdat,
            },
            process.env.REFRESH_KEY,
            { expiresIn: "1d" }
          );

          await models.users.update(
            { refresh_token: reftoken },
            { where: { id: userId } }
          );
          res.cookie("token", reftoken, {
            httpOnly: true,
            maxAge: 24 * 60 * 60 * 1000,
          });
          res.send(errorHandling(token, 200, "Berhasil Login!"));
        } else {
          // res.send(errorHandling("Error!!!", 400, "Password anda salah!"));
          res.status(400).json({ message: "Password anda salah!" });
        }
      } else {
        res.send(
          // errorHandling("Error!!!", 404, "Username anda tidak terdaftar!")
          res.status(404).json({ message: "Username anda tidak terdaftar!" })
        );
      }
    } catch (error) {
      // res.send(errorHandling("Error!!!", 500, error.message));
      res.status(500).json({ message: error.message });
    }
  }

  static async cektoken(req, res, next) {
    try {
      const authHeader = req.headers["authorization"];
      const token = authHeader && authHeader.split(" ")[1];
      if (token) {
        jwt.verify(token, process.env.SECRET_KEY, (err, decoded) => {
          if (err)
            // return res.send(
            //   errorHandling("Error!", 403, "Tidak bisa diakses!")
            // );
            res.status(403).json({ message: "Tidak bisa diakses!" });
          req.username = decoded.username;
          next();
        });
      } else {
        // res.send(
        //   errorHandling(
        //     "Error!",
        //     401,
        //     "Tidak bisa masuk ke halaman ini. karena anda belum login."
        //   )
        // );
        res.status(401).json({ message: "Tidak authorisasi!" });
      }
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  }
}

export default loginController;

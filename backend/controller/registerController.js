import models from "../models/init-models.js";
import { errorHandling } from "../helper/errorHandling.js";
import bcrypt from "bcrypt";

class registerController {
  static async addUser(req, res) {
    try {
      const { name, email, username, password, confirmpassword } = req.body;
      const userdatabase = await models.users.findAll({
        where: { username: username },
        attributes: ["username"],
      });
      const emaildatabase = await models.users.findAll({
        where: { email: email },
        attributes: ["email"],
      });

      if (username == userdatabase) {
        if (email == emaildatabase) {
          if (password == confirmpassword) {
            const salt = bcrypt.genSaltSync(10);
            const passhash = bcrypt.hashSync(password, salt);

            const result = await models.users.create(
              {
                name: name,
                email: email,
                username: username,
                password: passhash,
              },
              { returning: true }
            );

            res.send(errorHandling(result, 201, "Berhasil daftar!"));
          } else {
            res.status(400).json({ message: "Password anda tidak cocok!" });
            // res.send(errorHandling("Error!", 400, "Password anda tidak cocok!"));
          }
        } else {
          res.status(400).json({ message: "Email anda sudah terdaftar!" });
        }
      } else {
        res.status(400).json({ message: "Username anda sudah terdaftar!" });
      }
    } catch (error) {
      res.status(500).json({ message: error.message });
      // res.send(errorHandling("Error!", 500, error.message));
    }
  }
}

export default registerController;

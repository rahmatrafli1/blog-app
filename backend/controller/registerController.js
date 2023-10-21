import models from "../models/init-models.js";
import { errorHandling } from "../helper/errorHandling.js";
import bcrypt from "bcrypt";

class registerController {
  static async addUser(req, res) {
    try {
      const { name, email, username, password, confirmpassword } = req.body;
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
        res.send(errorHandling("Error!", 400, "Password anda tidak cocok!"));
      }
    } catch (error) {
      res.send(errorHandling("Error!", 500, error.message));
    }
  }
}

export default registerController;

import models from "../models/init-models.js";
import { errorHandling } from "../helper/errorHandling.js";
import bcrypt from "bcrypt";

class userController {
  static async getAll(req, res) {
    try {
      const result = await models.users.findAll({
        attributes: ["id", "name", "email", "username"],
        include: {
          model: models.roles,
          as: "role",
          attributes: ["name"],
          required: true,
        },
        order: [["id", "ASC"]],
      });

      res.send(errorHandling(result, 200, "Berhasil menampilkan user!"));
    } catch (error) {
      res.send(errorHandling("Error!", 500, error.message));
    }
  }

  static async editUser(req, res) {
    try {
      const { name, email, username, password } = req.body;
      const salt = bcrypt.genSaltSync(10);
      const passhash = bcrypt.hashSync(password, salt);

      const result = await models.users.update(
        {
          name: name,
          email: email,
          username: username,
          password: passhash,
          updatedat: Date.now(),
        },
        { where: { id: req.params.id }, returning: true }
      );

      res.send(errorHandling(result, 200, "Berhasil ubah user!"));
    } catch (error) {
      res.send(errorHandling("Error!", 500, error.message));
    }
  }
}

export default userController;

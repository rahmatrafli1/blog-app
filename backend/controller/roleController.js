import models from "../models/init-models.js";
import { errorHandling } from "../helper/errorHandling.js";

class roleController {
  static async getRole(req, res) {
    try {
      const result = await models.roles.findAll({ order: [["id", "ASC"]] });

      res.send(errorHandling(result, 200, "Berhasil menampilkan role!"));
    } catch (error) {
      res.send(errorHandling("Error!", 500, error.message));
    }
  }

  static async addRole(req, res) {
    try {
      const { name } = req.body;

      const result = await models.roles.create(
        {
          name: name,
        },
        { returning: true }
      );

      res.send(errorHandling(result, 201, "Berhasil menambahkan role!"));
    } catch (error) {
      res.send(errorHandling("Error!", 500, error.message));
    }
  }
}

export default roleController;

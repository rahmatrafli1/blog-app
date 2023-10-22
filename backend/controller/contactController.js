import { errorHandling } from "../helper/errorHandling.js";
import models from "../models/init-models.js";

class contactController {
  static async postContact(req, res) {
    try {
      const { name, email, message } = req.body;

      const result = await models.contact.create(
        {
          name: name,
          email: email,
          message: message,
        },
        { returning: true }
      );

      res.send(errorHandling(result, 200, "Terima kasih atas masukkannya!!"));
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  }
}

export default contactController;

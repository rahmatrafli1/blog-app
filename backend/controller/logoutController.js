import { errorHandling } from "../helper/errorHandling.js";
import models from "../models/init-models.js";

class logoutController {
  static async logout(req, res) {
    try {
      const refreshToken = req.cookies.token;
      if (!refreshToken)
        res.send(errorHandling("Error!", 204, "Tidak ada konten ini!"));
      const user = await models.users.findAll({
        where: { refresh_token: refreshToken },
      });

      if (!user[0])
        res.send(errorHandling("Error", 204, "Tidak ada konten ini!"));
      const userId = user[0].id;
      await models.users.update(
        { refresh_token: null },
        { where: { id: userId } }
      );
      res.clearCookie("token");
      res.send(errorHandling("", 200, "Berhasil logout!"));
    } catch (error) {
      res.send(errorHandling("Error!", 500, error.message));
    }
  }
}

export default logoutController;

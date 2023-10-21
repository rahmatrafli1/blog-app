import { errorHandling } from "../helper/errorHandling.js";
import models from "../models/init-models.js";
import path from "path";
import fs from "fs";

class postController {
  static async getAll(req, res) {
    try {
      const result = await models.posts.findAll({
        include: {
          model: models.users,
          as: "user",
          attributes: ["name"],
          required: true,
        },
        where: { posting: true },
        order: [["id", "ASC"]],
      });

      res.send(errorHandling(result, 200, "Berhasil menampilkan Posts!"));
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  }

  static async getById(req, res) {
    try {
      const result = await models.posts.findOne({
        include: {
          model: models.users,
          as: "user",
          attributes: ["name"],
          required: true,
        },
        where: { id: req.params.id },
      });

      res.send(errorHandling(result, 200, "Berhasil menampilkan Posts!"));
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  }

  static async addPost(req, res) {
    if (req.files === null) {
      res.status(400).json({ message: "Gambar tidak boleh kosong!" });
    } else {
      const { title, content, posting, user_id } = req.body;

      const file = req.files.image;
      const fileSize = file.data.length;

      const ext = path.extname(file.name);
      const filename = file.md5 + ext;
      const url = `${req.protocol}://${req.get("host")}/images/${filename}`;
      const allowedtype = [".png", ".jpg", ".jpeg"];

      if (!allowedtype.includes(ext.toLowerCase())) {
        res.status(422).json({
          message: "Gambar harus berupa format .jpg, .jpeg, dan .png!",
        });
      } else {
        if (fileSize > 1000000) {
          res.status(422).json({ message: "Gambar tidak boleh melebihi 1 MB" });
        } else {
          file.mv(`./public/images/${filename}`, async (err) => {
            if (err) {
              res.send(errorHandling("Error!", 500, err));
            } else {
              try {
                const result = await models.posts.create(
                  {
                    title: title,
                    content: content,
                    image: filename,
                    url: url,
                    posting: posting,
                    user_id: user_id,
                  },
                  { returning: true }
                );

                res.send(
                  errorHandling(result, 201, "Post berhasil ditambahkan!")
                );
              } catch (error) {
                res.status(500).json({ message: error.message });
              }
            }
          });
        }
      }
    }
  }

  static async editPost(req, res) {
    const posts = await models.posts.findOne({
      where: {
        id: req.params.id,
      },
    });

    if (!posts) {
      res.status(404).json({ message: "Data Post ini tidak ditemukan!" });
    } else {
      const { title, content, posting, user_id } = req.body;
      let filename = "";
      if (req.files === null) {
        filename = models.posts.image;
      } else {
        const file = req.files.image;
        const fileSize = file.data.length;

        const ext = path.extname(file.name);
        filename = file.md5 + ext;
        const url = `${req.protocol}://${req.get("host")}/images/${filename}`;
        const allowedtype = [".png", ".jpg", ".jpeg"];

        if (!allowedtype.includes(ext.toLowerCase())) {
          res.status(422).json({
            message: "Gambar harus berupa format .jpg, .jpeg, dan .png!",
          });
        } else {
          if (fileSize > 1000000) {
            res
              .status(422)
              .json({ message: "Gambar tidak boleh melebihi 1 MB" });
          } else {
            const filepath = `./public/images/${posts.image}`;
            fs.unlinkSync(filepath);

            file.mv(`./public/images/${filename}`, async (err) => {
              if (err) {
                res.send(errorHandling("Error!", 500, err));
              } else {
                try {
                  const result = await models.posts.update(
                    {
                      title: title,
                      content: content,
                      image: filename,
                      url: url,
                      posting: posting,
                      user_id: user_id,
                    },
                    { where: { id: req.params.id }, returning: true }
                  );

                  res.send(errorHandling(result, 200, "Post berhasil diubah!"));
                } catch (error) {
                  res.status(500).json({ message: error.message });
                }
              }
            });
          }
        }
      }
    }
  }

  static async deletePost(req, res) {
    const posts = await models.posts.findOne({
      where: {
        id: req.params.id,
      },
    });

    if (!posts) {
      res.status(404).json({ message: "Data Post ini tidak ditemukan!" });
    } else {
      try {
        const filepath = `./public/images/${posts.image}`;
        fs.unlinkSync(filepath);
        const result = await models.posts.destroy({
          where: {
            id: req.params.id,
          },
        });
        res.send(errorHandling(result, 200, "Post berhasil dihapus!"));
      } catch (error) {
        res.status(500).json({ message: error.message });
      }
    }
  }
}

export default postController;

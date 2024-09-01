const express = require("express");
const Users = require("../models/UserModels.js");
const validator = require("validator");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const multer = require("multer");
const path = require("path");
const fs = require("fs");

const app = express.Router();
app.post("/register", async (req, res) => {
  const { email, password, confirm_password } = req.body;
  if (!validator.isEmail(email))
    return res.status(400).json({ msg: "Email tidak sesuai" });
  if (password.length < 8)
    return res.status(400).json({ msg: "password harus 8 kharakter" });
  if (password != confirm_password)
    return res.status(400).json({ msg: "password tidak sesuai" });
  const salt = await bcrypt.genSalt();
  const hashPassword = await bcrypt.hash(password, salt);
  try {
    const CekUser = await Users.findOne({ where: { email: email } });
    if (CekUser) return res.status(400).json({ msg: "Email telah terdaftar" });

    await Users.create({
      email: email,
      first_name: req.body.first_name,
      last_name: req.body.last_name,
      password: hashPassword,
    });
    res.status(200).json({
      status: 0,
      message: "Registrasi Berhasil Silahkan Login",
      data: null,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      status: 102,
      message: "Parameter Email Tidak Sesuai Format",
      data: null,
    });
  }
});

app.post("/login", async (req, res) => {
  try {
    const user = await Users.findAll({
      where: {
        email: req.body.email,
      },
    });
    const match = await bcrypt.compare(req.body.password, user[0].password);
    if (!match) {
      return res.status(401).json({
        status: 103,
        message: "password salah",
        data: null,
      });
    }
    const userId = user[0].id;
    const email = user[0].email;
    const password = user[0].password;
    const accessToken = jwt.sign(
      { userId, email, password },
      process.env.ACCESS_TOKEN_SECRET,
      {
        expiresIn: "12h",
      }
    );
    res.status(200).json({
      status: 0,
      message: "Login Sukses",
      data: accessToken,
    });
  } catch (error) {
    res.status(404).json({
      status: 102,
      message: "Parameter Email Tidak Sesuai Format",
      data: null,
    });
  }
});

app.delete("/logout", async (req, res) => {
  const refreshToken = req.cookies.refreshToken;
  if (!refreshToken) return res.sendStatus(204);

  const user = await Users.findAll({
    where: {
      refresh_token: refreshToken,
    },
  });
  if (!user[0]) return res.sendStatus(204);
  const userId = user[0].id;
  await Users.update(
    { refresh_token: null },
    {
      where: {
        id: userId,
      },
    }
  );
  res.clearCookie("refreshToken");
  return res.sendStatus(200);
});

// const fileFilter = (req, file, cb) => {
//   const allowedTypes = ["image/jpeg", "image/png"];
//   if (!allowedTypes.includes(file.mimetype)) {
//     return cb(new Error("Format Image  Tidak Sesuai"), false);
//   }
//   cb(null, true);
// };

// const upload = multer({
//   storage: storage,
//   fileFilter: fileFilter,
// });

// app.put(
//   "/images/:id",
//   upload.single("profileImage"),
//   VerifyToken,
//   async (req, res) => {
//     const { id } = req.params;
//     const file = req.file;
//     if (!file) {
//       return res.status(400).json({
//         status: 106,
//         message: "Tidak ada file yang diunggah",
//         data: null,
//       });
//     }
//     const profileImage = file.filename;
//     try {
//       const user = await Users.findOne({
//         where: { id: id },
//       });

//       if (!user)
//         return res.status(404).json({
//           status: 104,
//           message: "User tidak ditemukan",
//           data: null,
//         });
//       if (user.profile_image) {
//         const oldImagePath = path.join(
//           __dirname,
//           "uploads",
//           user.profile_image
//         );
//         if (fs.existsSync(oldImagePath)) {
//           fs.unlinkSync(oldImagePath);
//         }
//       }
//       await Users.update(
//         {
//           profile_image: profileImage,
//         },
//         {
//           where: { id: id },
//         }
//       );

//       const updatedUser = await Users.findOne({
//         where: { id: id },
//       });
//       res.status(200).json({
//         status: 0,
//         message: "Update Profile Image berhasil",
//         data: {
//           id: updatedUser.id,
//           email: updatedUser.email,
//           first_name: updatedUser.first_name,
//           last_name: updatedUser.last_name,
//           profile_image: updatedUser.profile_image,
//         },
//       });
//     } catch (error) {
//       res.status(401).json({
//         status: 102,
//         message: "Terjadi Kesalahan pada Server",
//         data: nul,
//       });
//     }
//   }
// );

// app.put("/users/:id", VerifyToken, async (req, res) => {
//   try {
//     const users = await Users.findAll({
//       attributes: ["email", "first_name", "last_name", "profile_image"],
//     });
//     res.status(200).json({
//       status: 0,
//       message: "Sukses",
//       data: users,
//     });
//   } catch (error) {
//     res.status(500).json({
//       status: 102,
//       message: "Terjadi Kesalahan pada Server",
//     });
//   }
// });

// app.get("/users", VerifyToken, async (req, res) => {
//   try {
//     const users = await Users.findAll({
//       attributes: ["email", "first_name", "last_name", "profile_image"],
//     });
//     res.status(200).json({
//       status: 0,
//       message: "Sukses",
//       data: users,
//     });
//   } catch (error) {
//     res.status(500).json({
//       status: 102,
//       message: "Terjadi Kesalahan pada Server",
//     });
//   }
// });

module.exports = app;

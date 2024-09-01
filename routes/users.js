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

module.exports = app;

const express = require("express");
const VerifyToken = require("../middleware/VerifyToken.js");
const Banner = require("../models/BannerModels.js");
const Service = require("../models/ServiceModels.js");

const app = express.Router();

app.post("/banner", VerifyToken, async (req, res) => {
  const { banner_name, banner_image, description } = req.body;
  try {
    await Banner.create({
      banner_name: banner_name,
      banner_image: banner_image,
      description: description,
    });
    res.status(200).json({
      status: 0,
      message: "Tambah Banner Berhasil",
      data: null,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      status: 102,
      message: "Terjadi Kesalahan Pada Server",
      data: null,
    });
  }
});

module.exports = app;

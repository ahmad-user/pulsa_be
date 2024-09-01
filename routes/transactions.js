const express = require("express");
const Transaction = require("../models/TransaksiModels.js");
const Service = require("../models/ServiceModels.js");
const Users = require("../models/UserModels.js");
const VerifyToken = require("../middleware/VerifyToken.js");

const app = express.Router();

app.get("/", VerifyToken, async (req, res) => {
  try {
    const users = await Users.findAll({
      attributes: ["top_up_amount"],
    });
    res.status(200).json({
      status: 0,
      message: "Get Balance Berhasil",
      data: {
        balance: users[0].top_up_amount,
      },
    });
  } catch (error) {
    res.status(500).json({
      status: 102,
      message: "Terjadi Kesalahan pada Server",
    });
  }
});

module.exports = app;

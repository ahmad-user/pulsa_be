const Transaction = require("../models/TransaksiModels.js");
const Service = require("../models/ServiceModels.js");
const Users = require("../models/UserModels.js");

// POST TRANSACTION
const TambahTransaction = async (req, res) => {
  const { invoice_number, service_code } = req.body;

  try {
    const service = await Service.findOne({
      where: { service_code: service_code },
    });

    if (!service) {
      return res.status(404).json({
        status: 102,
        message: "Service atau Layanan Tidak Ditemukan",
        data: null,
      });
    }

    const user = await Users.findOne({ where: { email: req.email } });

    if (!user) {
      return res.status(404).json({
        status: 103,
        message: "User tidak ditemukan",
        data: null,
      });
    }

    const totalAmount = service.service_tarif;

    if (user.balance < totalAmount) {
      return res.status(400).json({
        status: 104,
        message: "Saldo tidak cukup",
        data: null,
      });
    }
    const newTransaction = await Transaction.create({
      invoice_number: invoice_number,
      service_code: service.service_code,
      service_name: service.service_name,
      transaction_type: "PAYMENT",
      total_amount: totalAmount,
    });
    user.top_up_amount -= totalAmount;
    await user.save();

    res.status(200).json({
      status: 0,
      message: "Transaksi Berhasil",
      data: {
        invoice_number: newTransaction.invoice_number,
        service_code: newTransaction.service_code,
        service_name: newTransaction.service_name,
        transaction_type: newTransaction.transaction_type,
        total_amount: newTransaction.total_amount,
        created_on: newTransaction.createdAt,
      },
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      status: 102,
      message: "Terjadi Kesalahan Pada Server",
      data: null,
    });
  }
};

// TOP UP AMMOUNT
const TopUpAmount = async (req, res) => {
  const { top_up_amount } = req.body;
  if (isNaN(top_up_amount) || top_up_amount < 5000) {
    return res.status(400).json({
      status: 102,
      message:
        "Parameter amount hanya boleh angka dan tidak boleh lebih kecil dari 5000",
      data: null,
    });
  }
  try {
    const user = await Users.findOne({
      where: { email: req.email },
    });

    if (!user) {
      return res.status(404).json({
        status: 103,
        message: "User tidak ditemukan",
        data: null,
      });
    }
    user.top_up_amount =
      (user.top_up_amount || 0) + parseInt(top_up_amount, 10);
    await user.save();

    res.status(200).json({
      status: 0,
      message: "Top Up Amount berhasil",
      data: {
        top_up_amount: user.top_up_amount,
      },
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      status: 102,
      message: "Terjadi Kesalahan Pada Server",
      data: null,
    });
  }
};

// GET TTRANSACTION
const GetAmount = async (req, res) => {
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
};

// GET HISTORI TRANSACTION
const GetHistory = async (req, res) => {
  try {
    const { offset = 0, limit = 1 } = req.query;

    const offsetNumber = parseInt(offset, 10);
    const limitNumber = parseInt(limit, 10);
    if (
      isNaN(offsetNumber) ||
      isNaN(limitNumber) ||
      offsetNumber < 0 ||
      limitNumber <= 0
    ) {
      return res.status(400).json({
        status: 1,
        message: "Invalid offset or limit parameter",
        data: null,
      });
    }

    const history = await Transaction.findAndCountAll({
      attributes: [
        "invoice_number",
        "service_code",
        "service_name",
        "transaction_type",
        "total_amount",
        "createdAt",
      ],
      offset: offsetNumber,
      limit: limitNumber,
    });

    res.status(200).json({
      status: 0,
      message: "Get History Berhasil",
      data: {
        offset: offsetNumber,
        limit: limitNumber,
        total: history.count,
        records: history.rows.map((transaction) => ({
          invoice_number: transaction.invoice_number,
          transaction_type: transaction.transaction_type,
          total_amount: transaction.total_amount,
          created_on: transaction.createdAt,
        })),
      },
    });
  } catch (error) {
    res.status(500).json({
      status: 108,
      message: "Terjadi Kesalahan Pada Server",
      data: null,
    });
  }
};

module.exports = {
  TambahTransaction,
  TopUpAmount,
  GetAmount,
  GetHistory,
};

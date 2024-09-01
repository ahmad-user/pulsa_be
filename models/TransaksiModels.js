const { Sequelize } = require('sequelize');
const db = require('../config/database.js');


const { DataTypes } = Sequelize;

const Transaction = db.define('transaction', {
    invoice_number: {
        type: DataTypes.STRING
    },
    service_code: {
        type: DataTypes.STRING
    },
    service_name: {
        type: DataTypes.STRING
    },
    transaction_type: {
        type: DataTypes.STRING
    },
    total_amount: {
        type: DataTypes.INTEGER
    },
})


module.exports = Transaction;
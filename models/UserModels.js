const { Sequelize, Transaction } = require('sequelize');
const db = require('../config/database.js');


const { DataTypes } = Sequelize;

const Users = db.define('users',{
    email:{
        type: DataTypes.STRING
    },
    first_name:{
        type: DataTypes.STRING
    },
    last_name:{
        type: DataTypes.STRING
    },
    password:{
        type: DataTypes.STRING
    },
    profile_image:{
        type: DataTypes.STRING
    },
    top_up_amount:{
        type: DataTypes.INTEGER
    }
},{
    freezeTableName: true,
});



module.exports = Users;
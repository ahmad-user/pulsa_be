const { Sequelize } = require('sequelize');
const db = require('../config/database.js');

const { DataTypes } = Sequelize;

const Service = db.define('service',{
    service_code:{
        type: DataTypes.STRING
    },
    service_name:{
        type: DataTypes.STRING
    },
    service_icon:{
        type: DataTypes.STRING
    },
    service_tarif:{
        type: DataTypes.INTEGER
    },
},{
    freezeTableName: true,
});

module.exports =  Service;
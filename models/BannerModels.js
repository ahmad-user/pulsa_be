const { Sequelize } = require('sequelize');
const db = require('../config/database.js');

const { DataTypes } = Sequelize;

const Banner = db.define('banner',{
    banner_name:{
        type: DataTypes.STRING
    },
    banner_image:{
        type: DataTypes.STRING
    },
    description:{
        type: DataTypes.STRING
    },
},{
    freezeTableName: true,
});

module.exports = Banner;
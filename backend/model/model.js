const Sequelize = require('sequelize');

const sequelize = require('../util/database');

const General = sequelize.define('general',{
    id: {
        type : Sequelize.INTEGER,
        autoIncrement : true,
        allownull : false,
        primaryKey : true
    },
    bookName: Sequelize.STRING,
    takenOn: Sequelize.STRING,
    returnOn: Sequelize.STRING,
    penalty: Sequelize.INTEGER
})
module.exports =General;
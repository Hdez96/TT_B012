const Sequelize = require("sequelize")
const db = {}
const sequelize = new Sequelize("mb","admin","password", {
    host: '127.0.0.1',
    dialect: 'mysql',
    operatorsAliases: false,
    port:'3306',
    pool: {
        max: 200,
        min: 0,
        acquire: 30000,
        idle: 10000
    }
    
})

db.sequelize = sequelize
db.Sequelize = Sequelize

module.exports = db 

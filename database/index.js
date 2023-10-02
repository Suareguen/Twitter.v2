const { Sequelize } = require('sequelize')
require('dotenv').config()

const connection = new Sequelize(
  process.env.DB_NAME,
  process.env.DB_USERNAME,
  process.env.DB_PASS,
  {
    port: process.env.DB_PORT,
    dialect: process.env.DIALECT,
    host: process.env.DB_HOST,
    logging: false
  }
);


const checkConnection = async () => {
    try {
        await connection.authenticate()
        console.log('Connected to DB :)')
    } catch (error) {
        throw error
    }
}

const syncModels = async () => {
    try {
        await connection.sync()
    } catch (error) {
        throw error
    }
}



module.exports = {
  connection,
  checkConnection,
  syncModels
};
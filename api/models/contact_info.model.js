const { DataTypes } = require("sequelize");
const { connection } = require("../../database/index.js");


const ContactInfo = connection.define('contact_info', {
    address: {
        type: DataTypes.STRING
    },
    phone: {
        type: DataTypes.INTEGER
    },
    zip_code: {
        type: DataTypes.INTEGER
    }
})

module.exports = ContactInfo
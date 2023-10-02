const { DataTypes} = require('sequelize')
const { connection } = require('../../database/index.js')

const Comments = connection.define("comment", {
    body: {
        type: DataTypes.STRING
    }
});

module.exports = Comments;


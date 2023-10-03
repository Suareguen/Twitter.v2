const express = require('express')
const addRelationsToModels = require('./database/relations.js')
const { checkConnection, syncModels } = require('./database/index.js')
const morgan = require('morgan')
const cors = require('cors')
require('dotenv').config()



const listenWithExpress = () => {
    try {
        const app = express()
                            .use(express.json())
                            .use(morgan('dev'))
                            .use(cors())
                            .use('/api', require('./api/routes/index.js'))
                            .listen(process.env.PORT, () => {
                                console.log(
                                  `Listening on PORT ${process.env.PORT}`
                                );
                            })
    } catch (error) {
        throw error
    }
}

const checkAndSyncMySQL = async () => {
    try {
        await checkConnection()
        addRelationsToModels()
        await syncModels()
    } catch (error) {
        throw error
    }
}


const startAPI = async () => {
    try {
        await checkAndSyncMySQL()
        listenWithExpress()
    } catch (error) {
        throw error
    }
}

startAPI()
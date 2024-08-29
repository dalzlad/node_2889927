import express from 'express'
import 'dotenv/config'
import dbConnection from '../database/config.js'
import {getVehicle, postVehicle, putVehicle, deleteVehicle} from '../controllers/vehicleController.js'
import {createUser} from '../controllers/userController.js'

export default class Server{
    constructor(){
        
        this.app = express()
        this.listen()
        this.dbConnect()
        this.pathVehicle = '/api/vehicle' //Link public API
        this.route()
    }

    listen(){//Method to listen the port
        this.app.listen(process.env.PORT, () => {
            console.log(`Server is running in PORT ${process.env.PORT}`)
        })
    }

    async dbConnect(){ //Call method dbConnection to connect to Mongo
        await dbConnection()
    }

    route(){
        this.app.use(express.json())//Convert data to json
        this.app.get(this.pathVehicle, getVehicle)
        this.app.post(this.pathVehicle, postVehicle)
        this.app.put(this.pathVehicle, putVehicle)
        this.app.delete(this.pathVehicle+('/:id'), deleteVehicle)
        this.app.post('/user', createUser)
    }
}
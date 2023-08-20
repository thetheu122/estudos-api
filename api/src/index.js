import 'dotenv/config' 

import usuarioController from './controller/usuarioController.js'
import filmeController from './controller/filmeCOntroller.js'

import express from 'express'
import cors from 'cors'


const server = express()
server.use(cors())
server.use(express.json())



server.use('/storage/capasFilmes', express.static('storage/capasFilmes'));


server.use(usuarioController)
server.use(filmeController)

server.listen(process.env.PORT, () => console.log(`API CONECTADA na porta: ${process.env.PORT}`))
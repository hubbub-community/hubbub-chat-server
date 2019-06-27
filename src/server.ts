/***
 * Express/Socket.io server
 * @module src/server
 ***/

// Express
import express from 'express'
import { createServer, Server } from 'http'
const app = express() // Express app
export const server: Server = createServer(app) // Integrated Express/Socket.io server

// Events
import SocketIO from 'socket.io'
const io = SocketIO(server)

import events from './events/v1.events'
events(io)

// Middleware
import cors from 'cors'
import morgan from 'morgan'
app.use(morgan('tiny'))
app.use(cors())

// Parsers
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

// Documentation
// Ensure package.json scripts move TypeDocs to the right place on build
app.use('/docs', express.static(`./docs`))

import swaggerUI from 'swagger-ui-express'
import swaggerDocument from './docs/swagger.json'
app.use('/api/v1/docs', swaggerUI.serve, swaggerUI.setup(swaggerDocument))

// Routes
import v1Router from './routes'
app.use(v1Router)

// Error handling
import notFound from './middleware/404'
import serverError from './middleware/500'
app.use('*', notFound)
app.use(serverError)

function start(port: string): Server {
  return server.listen(port, () => {
    console.log(`You are connected to the Express server on port ${port}...`)
    console.log(`Socket.io server up and running!`)
  })
}

export default start

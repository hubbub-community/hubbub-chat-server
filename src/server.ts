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

/**** START AUTH BLOCK ****/
import session from 'express-session'

// config express-session
const sess = {
  cookie: {
    secure: false,
  },
  resave: false,
  saveUninitialized: true,
  secret:
    process.env.AUTH0_CLIENT_SECRET ||
    process.env.SECRET ||
    'SOME STUPID SECRET',
}

if (app.get('env') === 'production') {
  sess.cookie.secure = true // serve secure cookies, requires https
}

app.use(session(sess))

// Configure passport with application settings
import passport from 'passport'
import * as Auth0 from 'passport-auth0'

const strategy = new Auth0.Strategy(
  {
    callbackURL: process.env.AUTH0_CALLBACK_URL || '/callback',
    clientID: process.env.AUTH0_CLIENT_ID || 'your-client-id',
    clientSecret: process.env.AUTH0_CLIENT_SECRET || 'your-client-secret',
    domain: process.env.AUTH0_DOMAIN || 'your-domain.auth0.com',
  },
  (
    accessToken: any,
    refreshToken: any,
    extraParams: any,
    profile: any,
    done: any
  ) => {
    // accessToken is the token to call Auth0 API (not needed in the most cases)
    // extraParams.id_token has the JSON Web Token
    // profile has all the information from the user
    return done(null, profile)
  }
)

passport.use(strategy)

app.use(passport.initialize())
app.use(passport.session())

// Storing and retrieving user data from the session
// You can use this section to keep a smaller payload
passport.serializeUser((user: any, done: any) => {
  done(null, user)
})

passport.deserializeUser((user: any, done: any) => {
  done(null, user)
})

// Implement login, user profile and logout
import userInViews from './middleware/user-in-views'
import authRouter from './routes/auth'
import userRouter from './routes/user'

app.use(userInViews())
app.use('/', authRouter)
app.use('/', userRouter)

/**** END AUTH BLOCK ****/

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

import { error, info, success } from './helpers/display'
import checkEnv from './helpers/checkEnv'
import { connect } from './database'
import { init } from './database'
import dotenv from 'dotenv'
import express, { Express } from 'express'
import api from './routes/api'
import bodyParser from 'body-parser'


async function main() {
  dotenv.config

  const app: Express = express()
  const port: number = parseInt(process.env.PORT as string)
  try {
    checkEnv(['PORT', 'HOST', 'DATABASE_URI'])
    info('Server initialization...')
    await connect(process.env.DATABASE_URI as string)
    success('Database successfully connected!')
    await init()
    app.use(bodyParser.json())
    app.use(bodyParser.urlencoded({ extended: false }))
    app.use('/api',api)
    app.listen(port, () => {
      info(`✨ Server is listening on ${process.env.HOST}:${port}`)
    })
  } catch (e) {
    error(e.message)
  }

}

// Entry point 😎
main()

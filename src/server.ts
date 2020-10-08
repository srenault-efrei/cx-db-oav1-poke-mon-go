import { error, info, success } from './helpers/display'
import checkEnv from './helpers/checkEnv'
import { connect } from './database'
import { init } from './database'

import dotenv from 'dotenv'


async function main() {
  dotenv.config
  try {
    checkEnv(['PORT', 'HOST', 'DATABASE_URI'])
    info('Server initialization...')
    await connect(process.env.DATABASE_URI as string)
    success('Database successfully connected!')

  } catch (e) {
    error(e.message)
  }
 init()
}

// Entry point 😎
main()

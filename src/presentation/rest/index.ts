import express from 'express'
import bodyParser from 'body-parser'
import type { Config } from '../..'
import { authorRoutesFactory } from './author'
import { bookRoutesFactory } from './book'

const app = express()

export const restLayer = (config: Config) => {
  app.use(bodyParser.json())

  app.use('/authors', authorRoutesFactory(config.services))
  app.use('/books', bookRoutesFactory(config.services))

  app.listen(config.port, () => console.log(`Listening at  http://localhost:${config.port}`))
}

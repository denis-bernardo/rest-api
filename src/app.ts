import * as bodyParser from 'body-parser'
import * as cors from 'cors'
import * as express from 'express'
import { createConnection } from 'typeorm'

class Application {
  public express: express.Application;

  public constructor () {
    this.express = express()
  }

  public async init () {
    this.middlewares()
    await this.database()
    this.routes()
  }

  private middlewares () {
    this.express.use(cors())
    this.express.use(bodyParser.json())
    this.express.use(bodyParser.urlencoded({ extended: true }))
  }

  private async database () {
    await createConnection()
  }

  private routes () {
    this.express.get('/', (req, res) => res.send('Hello world!'))
  }
}

export default new Application()

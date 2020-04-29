import * as bodyParser from 'body-parser'
import * as cors from 'cors'
import * as helmet from 'helmet'
import * as express from 'express'
import { createConnection } from 'typeorm'
import routes from './routes'
import errorMiddleware from './middlewares/errorMiddleware'

class Application {
  public express: express.Application;

  public constructor () {
    this.express = express()
  }

  public async listen () {
    this.middlewares()
    await this.database()
    this.routes()
    this.errorHandler()

    this.express.listen(process.env.PORT, () => {
      console.log(`App is running at http://localhost:${process.env.PORT} in ${this.express.get('env')} mode`)
      console.log('Press CTRL-C to stop\n')
    })
  }

  private middlewares () {
    this.express.use(helmet())
    this.express.use(cors())
    this.express.use(bodyParser.json())
    this.express.use(bodyParser.urlencoded({ extended: true }))
  }

  private async database () {
    await createConnection()
  }

  private routes () {
    this.express.use(routes)
  }

  private errorHandler () {
    this.express.use(errorMiddleware)
  }
}

export default new Application()

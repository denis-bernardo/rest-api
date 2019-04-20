import './config/env'

import app from './app'

app.init()

app.express.listen(process.env.PORT, () => {
  console.log(`App is running at http://localhost:${process.env.PORT} in ${app.express.get('env')} mode`)
  console.log('Press CTRL-C to stop\n')
})

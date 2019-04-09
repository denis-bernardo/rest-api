import './config/env';

import * as bodyParser from 'body-parser';
import * as cors from 'cors';
import * as express from 'express';

const app = express();

app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.get('/', (req, res) => res.send('Hello world!'));

app.listen(process.env.PORT, () => {
  console.log(`App is running at http://localhost:${process.env.PORT} in ${app.get('env')} mode`);
  console.log('Press CTRL-C to stop\n');
});

module.exports = app;

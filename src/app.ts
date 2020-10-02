import {json, urlencoded} from 'body-parser';
import express from 'express';
import morgan from 'morgan';
import {join} from 'path';
import {createConnection} from 'typeorm';
import {promisify} from 'util';
import api from './api';
import {Post} from './post';

const db = {
  host: process.env.DB_HOST || 'localhost',
  port: parseInt(process.env.DB_PORT) || 3306,
  name: process.env.DB_NAME || 'untitled',
  user: process.env.DB_USER || 'root',
  pass: process.env.DB_PASS || ''
};
const port = parseInt(process.env.PORT) || 3000;
const assets = join(__dirname, 'assets');

const app = express();

app.use(morgan('combined'));
app.use(json());
app.use(urlencoded({extended: false}));

app.use('/', express.static(assets));

app.use('/api', api);

(async () => {

  await createConnection({
    type: 'mariadb',
    host: db.host,
    port: db.port,
    database: db.name,
    username: db.user,
    password: db.pass,
    entities: [Post],
    synchronize: true,
    logging: 'all'
  });

  let listen = app.listen.bind(app);
  await promisify(listen)(port);
  console.log('server started on port', port);

})();

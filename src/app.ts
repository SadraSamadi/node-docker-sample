import {json, urlencoded} from 'body-parser';
import express from 'express';
import morgan from 'morgan';
import {createConnection} from 'typeorm';
import {promisify} from 'util';
import api from './api';
import {Post} from './post';
import {asset} from './utils';

const port = parseInt(process.env.PORT) || 3000;
const db = {
  host: process.env.DB_HOST || 'localhost',
  name: process.env.DB_NAME || 'untitled',
  user: process.env.DB_USER || 'root',
  pass: process.env.DB_PASS || ''
};

const app = express();

app.use(json());
app.use(urlencoded({extended: false}));
app.use(morgan('combined'));

app.get('/', (req, res) => {
  let index = asset('index.html');
  res.sendFile(index);
});

app.use('/api', api);

(async () => {

  await createConnection({
    type: 'mariadb',
    host: db.host,
    port: 3306,
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

import express from 'express';
import api from './api/index.js';
import cors from 'cors';
import {errorHandler, notFoundHandler} from './middlewares.js';

const app = express();

app.use(express.json());
app.use(express.urlencoded({extended: true}));


app.use('/public', express.static('public'));

app.get('/', (req, res) => {
  res.send('Hello  World');
});

app.use('/api/v1', api);

app.use(notFoundHandler);
app.use(errorHandler)
app.use(cors());

export default app;

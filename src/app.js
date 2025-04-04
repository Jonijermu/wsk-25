import express from 'express';
import api from './api/index.js';
import cors from 'cors';
const app = express();

// const corsOptions = {
//   origin: 'http://127.0.0.1:3000',
//   methods: 'GET,POST,PUT,DELETE',
//   allowedHeaders: 'Content-Type,Authorization'
// };

app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.use(cors());



app.use('/public', express.static('public'));

app.get('/', (req, res) => {
  res.send('Hello  World');
});

app.use('/api/v1', api);

export default app;

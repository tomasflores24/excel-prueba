import express from 'express';
import morgan from 'morgan';
import cors from 'cors';
import 'dotenv/config';
import { getSheet, readData, readProperties } from './service';

const {} = process.env;
const app = express(); 
const PORT = process.env.PORT || 4000;

app.use(morgan('dev'));
app.use(cors());
app.use(express.json());
// TODO

const flujo = async () => {
  const sheet = await getSheet();
  const { dataColumns } = await readProperties(sheet);
  await readData(sheet, dataColumns);
};
flujo();

// TODO
app.get('/', async (req, res) => {
  return res.json({ message: 'Home Route' });
});

app.listen(PORT, () => {
  console.log(`%s listening on ${PORT}`);
});

const mongoose = require('mongoose');
const fs = require('fs');
const tourModel = require('./../../models/tourModel');
const dotenv = require('dotenv');

dotenv.config({ path: './config.env' });
console.log(process.env.DATABASE);

const DB = process.env.DATABASE.replace(
  '<username>',
  process.env.LOGIN
).replace('<password>', process.env.PASSWORD);

mongoose
  .connect(DB, {})
  .then(() => {
    console.log('DB Connected');
  })
  .catch((err) => {
    console.log(`ERROR: ${err}`);
  });

const data = JSON.parse(
  fs.readFileSync('./dev-data/data/tours-simple.json', 'utf-8')
);

const addData = async () => {
  try {
    const add = await tourModel.create(data);
    console.log('Narmalni saqladi');
  } catch (err) {
    console.log('Kalla quydi: ' + err);
  }
};
const deleteData = async () => {
  try {
    const deleted = await tourModel.deleteMany();
    console.log('Top toza');
  } catch (err) {
    console.log('Kir');
  }
};
addData();

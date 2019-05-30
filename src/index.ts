import dotenv from 'dotenv';
dotenv.config();

import mongoose from 'mongoose';
import start from './server';

const DB_NAME: string = process.env.DB_NAME || 'anonymous_collection';
const PORT: string = process.env.PORT || '3000';
const MONGODB_URI: string =
  process.env.MONGODB_URI || `mongodb://localhost:27017/${DB_NAME}`;

const options: object = {
  useCreateIndex: true,
  useNewUrlParser: true,
};

// Start up database server with options
mongoose.connect(MONGODB_URI, options, err => {
  if (err) {
    console.error(err);
  } else {
    console.log(`Mongoose connected...`);
  }
});

start(PORT);

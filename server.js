import express from 'express';
import colors from 'colors';
import dotenv from 'dotenv';

//env config
dotenv.config();

//rest object
const app = express();

//rest api
app.get('/', (req, res) => {
  res.send('<h1>Welcome to Doggie Domain</h1>');
});

//PORT

const PORT = process.env.PORT || 8080;

//listen
app.listen(PORT, () => {
  console.log(`Server Running on port ${process.env.PORT} in ${process.env.DEV_MODE} mode`.bgCyan.white);
});

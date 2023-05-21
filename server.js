import express from 'express';
import dotenv from 'dotenv';
import connectDB from './config/db.js';
import morgan from 'morgan';
import colors from 'colors';
import authRoutes from './routes/authRoute.js';
import categoryRoute from './routes/categoryRoute.js';
import productRoute from './routes/productRoute.js';
import cors from 'cors';

//env config
dotenv.config();

//Database configuration
connectDB();

//rest object
const app = express();

//middlewears
app.use(cors());
app.use(express.json());
app.use(morgan('dev'));

//routes
app.use('/api/dd/auth', authRoutes);
app.use('/api/dd/category', categoryRoute);
app.use("/api/dd/product", productRoute);

//rest api
app.get('/', (req, res) => {
  res.send('<h1>Welcome to Doggie Domain</h1>');
});

//PORT

const PORT = process.env.PORT || 8080;

//listen
app.listen(PORT, () => {
  console.log(
    `Server Running on port ${process.env.PORT} in ${process.env.DEV_MODE} mode`
      .bgCyan.white
  );
});

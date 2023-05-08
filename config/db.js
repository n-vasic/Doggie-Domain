import mongoose from 'mongoose';

const connectDB = async () => {
  try {
    const con = await mongoose.connect(process.env.MONGO_URL);
    console.log(`Connected To MongoDB Database ${con.connection.host}`.bgMagenta.white);
  } catch (error) {
    console.log(`MongoDB error ${error}`.bgRed.white);
  }
};

export default connectDB;
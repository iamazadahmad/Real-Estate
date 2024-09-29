const MONGO = "";


import express from 'express';
import dotenv from 'dotenv';
import mongoose from 'mongoose';
import userRouter from './routes/user.route.js';
import authRouter from './routes/auth.route.js';
import listingRouter from './routes/listing.route.js';
import cookieParser from 'cookie-parser';
import consultRouter from './routes/consult.route.js';
import getConsultRouter from './routes/consult.route.js'

dotenv.config();

mongoose
     .connect(MONGO)
     .then(() => {
          console.log('Connected to MongoDB!');
     })
     .catch((err) => {
          console.log('NOT Connected to MongoDB!');
          console.log(err);
     });

const app = express();
const __dirname = path.resolve();

app.use(express.json());
app.use(cookieParser());

app.listen(3000, () => {
     console.log('Server is running on port 3000!');
}
);

app.use(express.static(path.join(__dirname, '/client/dist')));

app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'client', 'dist', 'index.html'));
})

app.use('/api/user', userRouter);
app.use('/api/auth', authRouter);
app.use('/api/listing', listingRouter);
app.use('/api/consult', consultRouter);
app.use('/api/getConsult', consultRouter);

app.use((err, req, res, next) => {
     const statusCode = err.statusCode || 500;
     const message = err.message || 'Internal Server Error';
     return res.status(statusCode).json({
          success: false,
          statusCode,
          message,
     });
});

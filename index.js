import express from 'express';
import authRoutes from './routes/authRoutes.js';
import 'dotenv/config'
import mongoose from 'mongoose';
import { errorHandler, notFoundPathHandler } from './middleware/errorMiddleware.js';

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use('/api/v1/auth', authRoutes);
app.use(notFoundPathHandler)
app.use(errorHandler)

// connect to database MongoDB
try {
    await mongoose.connect(process.env.DATABASE)
    console.log('successfully connect to database')
} catch (error) {
    console.log('error connecting to database');    
}


const port = process.env.PORT || 3000;

app.listen(port, () => {
  console.log(`server listening on http://localhost:${port}`);
});
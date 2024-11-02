import express from 'express';
import authRoutes from './routes/authRoutes.js';
import 'dotenv/config'
import mongoose from 'mongoose';
const app = express();

// app.get('/', (req, res) => {
//   res.send('Hello World!');
// });


app.use('/auth/api/v1', authRoutes);

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
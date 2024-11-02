import express from 'express';
import authRoutes from './routes/authRoutes.js';
const app = express();

// app.get('/', (req, res) => {
//   res.send('Hello World!');
// });


app.use('/auth/api/v1', authRoutes);




const port = process.env.PORT || 3000;

app.listen(port, () => {
  console.log(`server listening on http://localhost:${port}`);
});
import express from 'express';

const router = express.Router();

router.get('/', (req, res) => {
  res.send('auth routes');
});

router.post('/login', (req, res) => {
  res.send('login');
});

router.post('/register', (req, res) => {
  res.send('register');
});

router.post('/logout', (req, res) => {
  res.send('logout');
});

router.get('/user', (req, res) => {
  res.send('user');
});

export default router;
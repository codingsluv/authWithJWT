import express from 'express';

const router = express.Router();

router.get('/', (req, res) => {
  res.send('auth routes');
});

router.post('/login', (req, res) => {
  res.json({
    mssg: 'route to login',
  })
});

router.post('/register', (req, res) => {
  res.json({
    mssg: 'route to register',
  })
});

router.post('/logout', (req, res) => {
  res.json({
    mssg: 'route to logout',
  })
});

router.get('/user', (req, res) => {
  res.send('user');
});

export default router;
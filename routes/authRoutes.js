import express from 'express';
import User from '../models/User.js';

const router = express.Router();

router.get('/', (req, res) => {
  res.send('auth routes');
});

router.post('/login', (req, res) => {
  res.json({
    mssg: 'route to login',
  })
});

router.post('/register', async(req, res) => {
  try {
    await User.create(req.body);
    res.json({
      mssg: 'user registered successfully',
      user: req.body,
    })
  } catch (error) {
    res.status(422).json({
        mssg: 'error registering user',
        error
    })
  }
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
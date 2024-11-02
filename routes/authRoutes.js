import express from 'express';
import { loginUser, registerUser, findUserById } from '../controller/authController.js';
import { protectedMiddleware } from '../middleware/authMiddleware.js';

const router = express.Router();

router.get('/', (req, res) => {
  res.send('auth routes');
});

router.post('/login', loginUser);

router.post('/register', registerUser);

router.post('/logout', (req, res) => {
  res.json({
    mssg: 'route to logout',
  })
});

router.get('/getuser', protectedMiddleware, findUserById);

export default router;
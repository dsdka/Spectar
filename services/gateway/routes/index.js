import express from 'express';
import userRouters from './user.js';

const router = express.Router();

userRouters(router);

export default router;

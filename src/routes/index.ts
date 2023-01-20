import express from 'express';
import api from './api/index.js';
import { getHome } from '../controllers/index.js';
const router = express.Router();

router.get('/', getHome);

router.use('/api', api);

export default router;

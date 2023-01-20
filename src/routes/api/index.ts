import express from 'express';
import { getImage } from '../../controllers/api/image.js';

const router = express.Router();

router.get('/image', getImage);

export default router;

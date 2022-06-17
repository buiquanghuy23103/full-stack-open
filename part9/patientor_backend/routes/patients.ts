import express from 'express';

const router = express.Router();

router.get('/', (_req, res) => {
	return res.send('pong');
});

export default router;
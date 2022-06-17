import express from 'express';
import diagnoseRouter from './routes/diagnoses';

const app = express();
app.use(express.json());

app.get('/api/ping', (_req, res) => {
	res.send('pong');
});

app.use('/api/diagnoses', diagnoseRouter);

const PORT = 3003;
app.listen(PORT, () => {
	console.log(`Server is running at http://localhost:${PORT}`);
});
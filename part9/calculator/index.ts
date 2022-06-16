import express from 'express';
import calculateBmi from './bmiCalculator';

const app = express();

app.get('/ping', (_req, res) => {
	res.send('pong');
});

app.get('/bmi', (req, res) => {
	const query = req.query;
	const height = Number(query.height);
	const weight = Number(query.weight);
	if (isNaN(height) || isNaN(weight))
	{
		console.log('here');
		return res.send({ error: "malformatted parameters" });
	}
	return res.send(calculateBmi(height, weight));
});

const PORT = 3003;

app.listen(PORT, () => {
	console.log(`Server is running on port ${PORT}`);
});
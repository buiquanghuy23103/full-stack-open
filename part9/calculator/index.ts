import express, { Request, Response } from 'express';
import calculateBmi from './bmiCalculator';
import calculateExercises from './exerciseCalculator';

const app = express();
app.use(express.json());

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

interface ExerciseRequest {
	daily_exercises: number[],
	target: number
}
app.post('/exercise', (
	req: Request<unknown, unknown, ExerciseRequest>,
	res: Response
) => {
	const { daily_exercises, target }: ExerciseRequest = req.body;
	if (!daily_exercises || !target)
		return res.status(400).send({ error: "parameters missing" });
	return res.send(calculateExercises(daily_exercises, target));
});

const PORT = 3003;

app.listen(PORT, () => {
	console.log(`Server is running on port ${PORT}`);
});
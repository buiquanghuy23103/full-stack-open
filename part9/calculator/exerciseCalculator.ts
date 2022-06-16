interface Result {
	periodLength: number;
	trainingDays: number;
	success: boolean;
	rating: number;
	ratingDescription: string;
	target: number;
	average: number;
}

const calculateExercises = (exerciseHours: number[]): Result => {
	const target = 2
	const periodLength = exerciseHours.length
	const trainingDays = exerciseHours.filter(a => a !== 0).length
	const sum = exerciseHours.reduce((a, b) => a + b)
	const average = sum / periodLength
	const rating = 2
	const success = average > target
	return {
		periodLength, trainingDays, success, rating,
		ratingDescription: 'not too bad but could be better',
		target: 2,
		average
	}
}

console.log(calculateExercises([3, 0, 2, 4.5, 0, 3, 1]))
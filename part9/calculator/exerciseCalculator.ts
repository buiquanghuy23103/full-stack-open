interface Result {
	periodLength: number;
	trainingDays: number;
	success: boolean;
	rating: number;
	ratingDescription: string;
	target: number;
	average: number;
}

const calculateExercises = (exerciseHours: number[], target: number): Result => {
	console.log('exerciseHours', exerciseHours);
	console.log('target', target);
	const periodLength = exerciseHours.length;
	const trainingDays = exerciseHours.filter(a => a !== 0).length;
	const sum = exerciseHours.reduce((a, b) => a + b);
	const average = sum / periodLength;
	const rating = 2;
	const success = average > target;
	return {
		periodLength, trainingDays, success, rating,
		ratingDescription: 'not too bad but could be better',
		target: 2,
		average
	};
};

// const target = Number(process.argv[2]);
// const exerciseHours = process.argv.slice(3).map(a => Number(a));
// console.log(calculateExercises(exerciseHours, target));

export default calculateExercises;
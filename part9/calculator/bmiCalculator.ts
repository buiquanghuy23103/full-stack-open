const calculateBmi = (height: number, weight: number) => {
	console.log('height', height)
	console.log('weight', weight)
	const bmi = weight / (height * height / 10000)
	if (bmi < 16)
		return 'Underweight (Severe thinness)'
	else if (bmi >= 16 && bmi <= 16.9)
		return 'Underweight (Moderate thinness)'
	else if (bmi >= 17 && bmi <= 18.4)
		return 'Underweight (Mild thinness)'
	else if (bmi >= 18.5 && bmi <= 24.9)
		return 'Normal (healthy weight)'
	else if (bmi >= 25 && bmi <= 29.9)
		return 'Overweight (Pre-obese)'
	else if (bmi >= 30 && bmi <= 34.9)
		return 'Obese (Class I)'
	else if (bmi >= 35 && bmi <= 39.9)
		return 'Obese (Class II)'
	else if (bmi >= 40)
		return 'Obese (Class III)'
	return 'Unknown'
}

const height = Number(process.argv[2])
const weight = Number(process.argv[3])
console.log(calculateBmi(height, weight))
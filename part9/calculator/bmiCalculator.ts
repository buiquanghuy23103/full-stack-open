const calculateBmi = (height: number, weight: number) => {
	const bmi = weight / (height * height / 10000)
	return bmi
}

console.log(calculateBmi(180, 74))
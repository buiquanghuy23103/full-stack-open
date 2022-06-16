const uniqByName = arr => {
	const seen = new Set()
	return arr.filter(item => {
		const name = item.name
		return seen.has(name) ? false : seen.add(item)
	})
}

export default uniqByName
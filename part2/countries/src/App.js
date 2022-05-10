import axios from "axios"
import { useEffect, useState } from "react"

const Country = ({country}) => {
	return (
		<>
			<p>{country.name.common}</p>
		</>
	)
}

const Countries = ({countries}) => {
	return countries.map(country =>
		<Country key={country.name.common} country={country}/>
	)
}

const CountryDetail = ({country}) => {
	const languages = Object.entries(country.languages).map(
		entry => <p>{entry[1]}</p>
	)
	return (
		<>
			<h1>{country.name.common}</h1>
			<p>Capital: {country.capital[0]}</p>
			<p>Area: {country.area}</p>
			<h2>Languages</h2>
			{languages}
			<img alt={country.name.common} src={country.flags.png}/>
		</>
	)
}

const FilterResult = ({countries}) => {
	const length = countries.length
	if (length === 0)
		return (<p>No countries found.</p>)
	if (length === 1)
		return (<CountryDetail country={countries[0]}/>)
	if (length <= 10)
		return (<Countries countries={countries}/>)
	return (<p>Too many matches, specify another filter</p>)
}

const App = () => {
	const [filter, setFilter] = useState('')
	const [countries, setCountries] = useState([])

	useEffect(() => {
		axios.get('https://restcountries.com/v3.1/all')
			.then(response => setCountries(response.data))
	}, [])

	const handleInputChange = (event) => {
		setFilter(event.target.value)
	}

	const filteredCountries = countries.filter(country =>
		country.name.common.toLowerCase()
			.includes(filter.toLowerCase())
	)

	return (
		<>
			<p>Find countries</p>
			<input value={filter} onChange={handleInputChange}/>
			<FilterResult countries={filteredCountries}/>
		</>
	)
}

export default App;

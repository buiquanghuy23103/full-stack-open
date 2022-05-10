import axios from "axios"
import { useEffect, useState } from "react"

const Weather = ({lon, lat}) => {
	const [weatherInfo, setWeatherInfo] = useState(null)

	const apiUrl = "https://api.openweathermap.org/data/2.5/weather"
					+ `?appid=${process.env.REACT_APP_API_KEY}`
					+ `&lat=${lat}`
					+ `&lon=${lon}`



	useEffect(() => {
		axios.get(apiUrl)
			.then(response => setWeatherInfo(response.data))
	}, [lon, lat])

	if (weatherInfo)
	{
		const weatherIcon = "http://openweathermap.org/img/wn/"
						+ `${weatherInfo.weather[0].icon}@2x.png`
		console.log('weatherIcon', weatherIcon);
		return (
			<>
				<h2>Weather in {weatherInfo.name}</h2>
				<img src={weatherIcon} />
				<p>Temperature: {weatherInfo.main.temp} Celcius</p>
				<p>Wind: {weatherInfo.wind.speed}m/s</p>
			</>
		)
	}

	return (<p>No weather info</p>)
}
const CountryDetail = ({country}) => {
	const languages = Object.entries(country.languages).map(
		entry => <p key={entry[0]}>{entry[1]}</p>
	)
	return (
		<>
			<h1>{country.name.common}</h1>
			<p>Capital: {country.capital[0]}</p>
			<p>Area: {country.area}</p>
			<h2>Languages</h2>
			{languages}
			<img alt={country.name.common} src={country.flags.png}/>
			<Weather lat={country.latlng[0]} lon={country.latlng[1]}/>
		</>
	)
}

const CountryOverview = ({country}) => {
	const [show, setShow] = useState(false)

	const showCountryDetail = () => setShow(true)
	const hideCountryDetail = () => setShow(false)

	if (show)
		return (
			<>
				<CountryDetail country={country}/>
				<br/>
				<button onClick={hideCountryDetail}>hide</button>
			</>
		)

	return (
		<p>
			{country.name.common}
			<button onClick={showCountryDetail}>show</button>
		</p>
	)
}

const Countries = ({countries}) => {
	return countries.map(country =>
		<CountryOverview key={country.name.common} country={country}/>
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

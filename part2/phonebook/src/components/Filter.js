import { useState } from "react"
import PersonLine from "./PersonLine"

const Filter = ({persons}) => {
	const [filter, setFilter] = useState('')

	const handleFilterChange = (event) => {
		setFilter(event.target.value)
	}

	const filteredList = persons.filter(person =>
		person.name.toLowerCase().includes(filter.toLowerCase())
	).map(person => <PersonLine key={person.id} person={person}/>)

	return (
		<>
			<p>
				filter shown with
				<input value={filter} onChange={handleFilterChange} />
			</p>
			{filter ? filteredList : ''}
		</>
	)
}

export default Filter
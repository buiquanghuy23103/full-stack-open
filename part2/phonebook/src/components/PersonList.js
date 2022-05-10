import PersonLine from "./PersonLine"

const PersonList = ({persons, deletePerson}) => persons.map(person => 
	<PersonLine
		key={person.id}
		person={person}
		deletePerson={deletePerson}
	/>
)

export default PersonList
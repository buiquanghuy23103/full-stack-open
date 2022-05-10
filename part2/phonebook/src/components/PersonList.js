import PersonLine from "./PersonLine"

const PersonList = ({persons}) => persons.map(person => 
	<PersonLine key={person.id} person={person}/>
)

export default PersonList
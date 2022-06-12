import { useQuery } from "@apollo/client"
import queries from "../queries"

const Recommend = ({ show }) => {
	const currentUserQuery = useQuery(queries.CURRENT_USER)

	if (!show) return null
	if (currentUserQuery.loading) return <p>Loading...</p>

	const favouriteGenre = currentUserQuery.data.me.favouriteGenre
	return <h1>Recommend { favouriteGenre }</h1>
}

export default Recommend
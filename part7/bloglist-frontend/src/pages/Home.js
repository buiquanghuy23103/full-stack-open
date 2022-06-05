import BlogForm from '../components/BlogForm'
import BlogList from '../components/BlogList'
import LoginForm from '../components/LoginForm'

const Home = () => {
	return (
		<>
			<BlogForm  />
			<LoginForm />
			<BlogList />
		</>
	)
}

export default Home
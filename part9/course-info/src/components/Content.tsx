import { CoursePart } from "../types";
import Part from "./Part";

interface Props {
	courseParts: CoursePart[]
}
const Content = ({ courseParts }: Props) => {
	return (
		<>
			{courseParts.map(part => (<Part key={part.name} part={part} />))}
		</>
	)
}

export default Content;
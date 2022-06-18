import { CoursePart } from "../types";

interface Props {
	part: CoursePart
}
const assertNever = (part: never): never => {
	throw new Error(`Unhandled union member: ${JSON.stringify(part)}`)
}
const Part = ({ part }: Props) => {
	switch (part.type) {
		case 'normal':
			return (<>
				<h4>{`${part.name} ${part.exerciseCount}`}</h4>
				<p>{ part.description }</p>
			</>)
		case 'groupProject':
			return (
				<>
					<h4>{`${part.name} ${part.exerciseCount}`}</h4>
					<p>Group project count { part.groupProjectCount }</p>
				</>
			)
		case 'submission':
			return (
				<>
					<h4>{`${part.name} ${part.exerciseCount}`}</h4>
					<p>Exercise submission link: { part.exerciseSubmissionLink }</p>
				</>
			)
		case 'optional':
			return (
				<>
					<h4>{`${part.name} ${part.exerciseCount}`}</h4>
					<p>{part.description}</p>
				</>
			)
		case 'special':
			return (<>
				<h4>{`${part.name} ${part.exerciseCount}`}</h4>
				<p>{part.description}</p>
				<p>
					required skill: {" "}
					{part.requirements.join(', ')}
				</p>
			</>)
		default:
			return assertNever(part);
	}
}

export default Part;
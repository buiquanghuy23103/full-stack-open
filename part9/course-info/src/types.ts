interface CoursePartBase {
	name: string;
	exerciseCount: number;
	type: string;
}

interface CourseNormalPart extends CoursePartBase {
	type: "normal";
	description?: string;
}
interface CourseProjectPart extends CoursePartBase {
	type: "groupProject";
	groupProjectCount: number;
}

interface CourseSubmissionPart extends CoursePartBase {
	type: "submission";
	exerciseSubmissionLink: string;
	description?: string;
}

interface CourseOptionalPart extends CoursePartBase {
	type: "optional",
	description: string;
}

interface CourseSpecialPart extends CoursePartBase {
	type: "special";
	requirements: string[];
	description: string;
}

export type CoursePart =
	CourseNormalPart
	| CourseProjectPart
	| CourseSubmissionPart
	| CourseOptionalPart
	| CourseSpecialPart;

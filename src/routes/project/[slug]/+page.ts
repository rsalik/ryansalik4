import type { PageLoad } from './$types';
import projects from '$lib/projects.json';

export const load = (({ params }) => {
	const project = projects.find((project) => project.id === params.slug);

	if (!project) {
		return {
			status: 404
		};
	}

	const projectIndex = projects.indexOf(project);

	return {
		status: 200,
		project,
		next: projects[projectIndex + 1] || projects[0],
		prev: projects[projectIndex - 1] || projects[projects.length - 1]
	};
}) satisfies PageLoad;

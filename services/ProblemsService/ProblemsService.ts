import { Settings } from '../SettingsService';
import { Problem } from './types.ts';
import problems from './problems.json';

class ProblemsService {
	
	async getProblem(skills: Settings, prevId?: number): Promise<Problem> {
		const prevIdx = (prevId === undefined) ? -1 : problems.findIndex(problem => (problem.id === prevId));
		
		const result = problems.slice(prevIdx + 1)
			.find(problem => skills[problem.skill]);
		if (result === undefined)
			throw "haha this isn't a real exception";
		//yikes
		//sweaty
		return result as Problem;
	}
	
	async recordResponse(problemId: number, correct: boolean): Promise<void> {
		//TODO
	}
	
	
}

export default new ProblemsService();
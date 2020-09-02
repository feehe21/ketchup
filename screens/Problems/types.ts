export enum ProblemType {
	MULTIPLE_CHOICE,
    DRAG_N_DROP,
    MULTI_SELECTION,
    MATCH,
}

export interface Problem {
	id: number;
	/** Required skills to display problem */
	skill: string;
	question: string;
    answers: string[];
    correctAnswer: number;
    type: ProblemType;
}

export interface ProblemResponse {
	id: number;
    attempts: number;
    correctAttempts: number;
}
export const SHADOW_TYPES = [
	'baba',
	'child',
	'heehaw',
	'jigaku',
	'kemono',
	'lady',
	'majo',
	'oyaji',
	'priest',
	'youngmen',
	'youngwomen'
] as const;

export type ShadowType = (typeof SHADOW_TYPES)[number];

export type Reaction = 'good' | 'bad' | 'ok';

export type QuestionStep = 0 | 1;

export type ReactionRow = Reaction[];

export type Question = {
	uid: string;
	id: number;
	type: ShadowType;
	question: QuestionStep;
	chats: string[];
	choices: string[];
	reactionsTable: ReactionRow[];
};

const SHADOW_TYPE_SET: ReadonlySet<string> = new Set(SHADOW_TYPES);
const REACTIONS: ReadonlySet<string> = new Set(['good', 'bad', 'ok']);

export function defineQuestions(questions: readonly Question[]): readonly Question[] {
	const uids = new Set<string>();

	for (const question of questions) {
		if (uids.has(question.uid)) {
			throw new Error(`Duplicate question uid ${question.uid}`);
		}

		uids.add(question.uid);

		const expectedUid = `${question.type}_${question.question}_${question.id}`;
		if (question.uid !== expectedUid) {
			throw new Error(`Question uid ${question.uid} does not match ${expectedUid}`);
		}

		if (!SHADOW_TYPE_SET.has(question.type)) {
			throw new Error(`Unknown shadow type ${question.type} on ${question.uid}`);
		}

		if (question.question !== 0 && question.question !== 1) {
			throw new Error(`Question step must be 0 or 1 on ${question.uid}`);
		}

		if (question.chats.length !== 2) {
			throw new Error(`Question ${question.uid} must have 2 chats`);
		}

		if (question.choices.length !== 3) {
			throw new Error(`Question ${question.uid} must have 3 choices`);
		}

		if (question.reactionsTable.length !== 3) {
			throw new Error(`Question ${question.uid} must have 3 reaction rows`);
		}

		for (const row of question.reactionsTable) {
			if (row.length !== 4 || row.some((reaction) => !REACTIONS.has(reaction))) {
				throw new Error(`Question ${question.uid} has an invalid reaction row`);
			}
		}
	}

	return Object.freeze(questions);
}

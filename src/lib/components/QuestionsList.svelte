<script lang="ts" module>
	import TwemojiAngerSymbol from '#lib/icons/TwemojiAngerSymbol.svg';
	import TwemojiSparkles from '#lib/icons/TwemojiSparkles.svg';
	import TwemojiSweatDroplets from '#lib/icons/TwemojiSweatDroplets.svg';

	import type { Reaction, Question } from '#lib/types.ts';

	type QuestionsListProps = {
		questions?: readonly Question[];
		opened?: Question | null;
		onQuestionClicked?: (question: Question) => void;
	};

	const REACTION_TO_EMOJI = Object.freeze<Record<Reaction, string>>({
		good: TwemojiSparkles,
		ok: TwemojiSweatDroplets,
		bad: TwemojiAngerSymbol
	});
</script>

<script lang="ts">
	import { slide } from 'svelte/transition';

	let {
		questions = [],
		opened = $bindable(null),
		onQuestionClicked
	}: QuestionsListProps = $props();

	const clickedQuestion = (question: Question) => {
		opened = opened?.uid === question.uid ? null : question;
		onQuestionClicked?.(question);
	};
</script>

{#each questions as question (question.uid)}
	<div class="mb-4 w-full rounded-md bg-gray-800" transition:slide>
		<button
			class="w-full px-4 py-2 font-semibold text-balance"
			onclick={() => clickedQuestion(question)}
		>
			{question.chats[1]}
		</button>
		{#if opened?.uid === question.uid}
			<div transition:slide class="p-2">
				<table class="w-full">
					<thead>
						<tr>
							<th class="px-2"></th>
							<th class="px-2 text-fuchsia-500 after:content-['Ti'] sm:after:content-['Timid']"
							></th>
							<th class="px-2 text-red-500 after:content-['Ir'] sm:after:content-['Irritable']"
							></th>
							<th class="px-2 text-amber-500 after:content-['Up'] sm:after:content-['Upbeat']"></th>
							<th class="px-2 text-blue-500 after:content-['Gl'] sm:after:content-['Gloomy']"></th>
						</tr>
					</thead>
					<tbody>
						{#each question.choices as choice, i (i)}
							<tr>
								<td class="font-bold text-gray-300">
									{choice}
								</td>
								{#each question.reactionsTable[i] as response, column (column)}
									<td class="px-2">
										<div class="flex h-5 w-full min-w-5">
											<img src={REACTION_TO_EMOJI[response]} class="mx-auto" alt={response} />
										</div>
									</td>
								{/each}
							</tr>
						{/each}
					</tbody>
				</table>
			</div>
		{/if}
	</div>
{/each}

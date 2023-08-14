<script lang="ts">
  import { blur } from "svelte/transition";
  import QuestionsList from "$lib/components/QuestionsList.svelte";
  import type { Question } from "$lib/types";

  export let questions: Question[];

  let searchValue = "";
  let opened = null;
  let suggestedOpened = null;

  const sortedQuestions = questions.sort((a, b) => {
    if (a.question < b.question) {
      return -1;
    } else if (a.question > b.question) {
      return 1;
    } else {
      return 0;
    }
  });

  const normalizeString = (input: string): string => {
    return input.toLowerCase().replace(/[.,'/#!$%^&*;:{}=\-_`~()]/g, "");
  };

  const onSearchValueChange = (value: string) => {
    opened = null;
    suggestedOpened = null;
  };

  $: onSearchValueChange(searchValue);
  $: normalizedSearchValue = normalizeString(searchValue);
  $: matchingQuestions = sortedQuestions.filter((question) =>
    opened
      ? opened.uid === question.uid
      : normalizeString(question.chats[1]).includes(normalizedSearchValue),
  );
  $: matchingQuestionsToShow = matchingQuestions.length < 20 ? matchingQuestions : [];
  $: showSuggested = opened && opened.question == 0;
  $: suggestedQuestions = opened
    ? questions.filter((question) =>
        suggestedOpened
          ? suggestedOpened.uid === question.uid
          : question.question == 1 && question.type == opened.type,
      )
    : [];
</script>

<input
  class="mb-12 w-full max-w-xl rounded-md bg-gray-800 px-4 py-2 outline-0 transition focus:-translate-y-0.5 focus:bg-gray-700 focus:shadow-md"
  placeholder="Search questions"
  bind:value={searchValue}
/>

<QuestionsList
  questions={matchingQuestionsToShow}
  bind:opened
  on:questionClicked={() => (suggestedOpened = null)}
/>

{#if showSuggested}
  <h2 class="mb-4 text-xl" transition:blur>Suggested</h2>

  <QuestionsList questions={suggestedQuestions} bind:opened={suggestedOpened} transition={blur} />
{/if}

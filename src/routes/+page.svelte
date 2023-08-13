<script lang="ts">
  import questions from "$lib/questions.json";
  import { blur } from "svelte/transition";
  import QuestionsList from "$lib/components/QuestionsList.svelte";
  import Fa6BrandsGithub from "~icons/fa6-brands/github";

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

<div class="relative flex min-h-screen w-full flex-col items-center bg-gray-900 px-2 text-white">
  <a
    class="absolute right-0 top-0 mr-4 mt-4 transition hover:text-blue-500"
    target="_blank"
    href="https://github.com/sexnine/p5-negotiation-guide"
  >
    <Fa6BrandsGithub />
  </a>

  <h1 class="mb-6 mt-12 text-2xl font-semibold">Persona 5 Negotiation Guide</h1>
  <p class="mb-20 max-w-xl text-center">
    A guide for how to answer Persona 5 negotiation questions. <br /> <br />
    This guide does not include extra questions from Persona 5 Royal (~20 questions) and if you are playing
    Royal, some of the wording is changed. <br />
  </p>

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
</div>

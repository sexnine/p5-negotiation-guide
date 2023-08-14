<script lang="ts">
  import questions from "$lib/questions/p5.json";
  import QuestionCard from "$lib/fancy/QuestionCard.svelte";
</script>

<div class="bla min-h-screen font-inter text-white">
  <div class="flex w-full flex-col items-center backdrop-blur-md backdrop-brightness-[0.4]">
    <h1 class="my-12 text-3xl font-bold">Persona 5 Negotiation Guide</h1>
    <div class="max-w-xl">
      {#each questions as question}
        <QuestionCard {question} />
      {/each}
    </div>
  </div>
</div>

<style>
  .bla {
    background-image: url("../../lib/fancy/city-bg.jpg");
    background-repeat: no-repeat;
    background-attachment: fixed;
    background-position: center;
    background-size: cover;
  }
</style>

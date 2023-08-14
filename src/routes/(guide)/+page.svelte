<script lang="ts">
  import questions from "$lib/questions.json";
  import NegotiationPage from "$lib/components/NegotiationPage.svelte";
</script>

<h1 class="mb-6 mt-12 text-2xl font-semibold">Persona 5 Negotiation Guide</h1>
<p class="mb-20 max-w-xl text-center">
  A guide for how to answer Persona 5 negotiation questions. <br /> <br />
  This guide does not include extra questions from Persona 5 Royal (~20 questions) and if you are playing
  Royal, some of the wording is changed. <br />
</p>

<NegotiationPage {questions} />

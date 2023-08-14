<script lang="ts">
  import questions from "$lib/questions/p5-royal.json";
  import NegotiationPage from "$lib/components/NegotiationPage.svelte";
</script>

<h1 class="mb-6 mt-12 text-2xl font-semibold">
  Persona 5 <span
    class="bg-gradient-to-r from-amber-500 to-yellow-500 bg-clip-text font-bold text-transparent"
  >
    Royal
  </span>
  Negotiation Guide
</h1>
<p class="mb-20 max-w-xl text-center">
  A guide for how to answer Persona 5
  <span
    class="bg-gradient-to-r from-amber-500 to-yellow-500 bg-clip-text font-bold text-transparent"
  >
    Royal
  </span>
  negotiation questions. <br />
  <a href="/" class="font-semibold text-blue-500">Looking for the Persona 5 version?</a>
</p>

<NegotiationPage {questions} />

<script lang="ts">
  import type { Question } from "$lib/types";
  import P5TextBubble from "$lib/fancy/P5TextBubbleNew.svg";
  import TwemojiAngerSymbol from "$lib/icons/TwemojiAngerSymbol.svg";
  import TwemojiSweatDroplets from "$lib/icons/TwemojiSweatDroplets.svg";
  import TwemojiSparkles from "$lib/icons/TwemojiSparkles.svg";

  const reactionToEmoji = {
    good: TwemojiSparkles,
    ok: TwemojiSweatDroplets,
    bad: TwemojiAngerSymbol,
  };

  export let question: Question;
</script>

<div class="my-12 flex w-full flex-col">
  <div class="relative z-20 ml-2 w-[28rem] -rotate-6 scale-125">
    <img src={P5TextBubble} alt="" draggable="false" class="select-none" />
    <div class="absolute left-0 top-0 w-full pl-24 pr-11 pt-[1.375rem]">
      <p class="w-full rotate-[-4deg] text-xs font-extrabold text-black">
        {question.chats[1]}
      </p>
    </div>
  </div>
  <table class="w-full rotate-1">
    <tr>
      <th class="px-2" />
      <th class="px-2 text-fuchsia-500">Timid</th>
      <th class="px-2 text-red-500">Irritable</th>
      <th class="px-2 text-amber-500">Upbeat</th>
      <th class="px-2 text-blue-500">Gloomy</th>
    </tr>
    {#each question.choices as choice, i}
      <tr>
        <td>
          <div class="box-svg-background px-4 py-1">
            <p class="py-2 font-bold text-black">{choice}</p>
          </div>
        </td>
        {#each question.reactions_table[i] as response}
          <td class="px-2">
            <img src={reactionToEmoji[response]} class="mx-auto h-8 w-8" alt={response} />
          </td>
        {/each}
      </tr>
    {/each}
  </table>
</div>

<style>
  .box-svg-background {
    background-image: url("./box.svg");
    background-repeat: no-repeat;
    background-size: 100% 100%;
  }
</style>

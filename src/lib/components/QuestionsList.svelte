<script lang="ts">
  import TwemojiAngerSymbol from "$lib/icons/TwemojiAngerSymbol.svg";
  import TwemojiSweatDroplets from "$lib/icons/TwemojiSweatDroplets.svg";
  import TwemojiSparkles from "$lib/icons/TwemojiSparkles.svg";
  import { slide } from "svelte/transition";
  import type { Question } from "$lib/types";
  import type { Transition } from "svelte/types/compiler/interfaces";
  import { createEventDispatcher } from "svelte";

  const dispatch = createEventDispatcher();

  export let questions: Question[] = [];
  export let opened: Question | null = null;
  export let transition: Transition | undefined;

  const optionalTransition = (node, options) => {
    if (options.fn) {
      return options.fn(node, options);
    }
  };

  const clickedQuestion = (question: Question) => {
    if (opened && opened.uid == question.uid) {
      opened = null;
    } else {
      opened = question;
    }

    dispatch("questionClicked", question);
  };

  const reactionToEmoji = {
    good: TwemojiSparkles,
    ok: TwemojiSweatDroplets,
    bad: TwemojiAngerSymbol,
  };
</script>

<div class="w-full max-w-xl" transition:optionalTransition={{ fn: transition }}>
  {#each questions as question (question.uid)}
    <div class="mb-4 w-full rounded-md bg-gray-800" transition:slide>
      <button
        class="w-full px-4 py-2 font-semibold [text-wrap:balance]"
        on:click={() => clickedQuestion(question)}
      >
        {question.chats[1]}
      </button>
      {#if opened?.uid === question.uid}
        <div transition:slide class="p-2">
          <table class="w-full">
            <tr>
              <th class="px-2" />
              <th class="px-2 text-fuchsia-500 after:content-['Ti'] sm:after:content-['Timid']" />
              <th class="px-2 text-red-500 after:content-['Ir'] sm:after:content-['Irritable']" />
              <th class="px-2 text-amber-500 after:content-['Up'] sm:after:content-['Upbeat']" />
              <th class="px-2 text-blue-500 after:content-['Gl'] sm:after:content-['Gloomy']" />
            </tr>
            {#each question.choices as choice, i}
              <tr>
                <td class="font-bold text-gray-300">
                  {choice}
                </td>
                {#each question.reactions_table[i] as response}
                  <td class="px-2">
                    <div class="flex h-5 w-full min-w-[1.25rem]">
                      <img src={reactionToEmoji[response]} class="mx-auto" alt={response} />
                    </div>
                  </td>
                {/each}
              </tr>
            {/each}
          </table>
        </div>
      {/if}
    </div>
  {/each}
</div>

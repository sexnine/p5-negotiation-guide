<script lang="ts">
  import Fa6BrandsGithub from "~icons/fa6-brands/github";
</script>

<div class="relative flex min-h-screen w-full flex-col items-center bg-gray-900 px-2 text-white">
  <a
    class="absolute right-0 top-0 mr-4 mt-4 transition hover:text-blue-500"
    target="_blank"
    href="https://github.com/sexnine/p5-negotiation-guide"
  >
    <Fa6BrandsGithub />
  </a>

  <slot />
</div>

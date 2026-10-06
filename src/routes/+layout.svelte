<script lang="ts">
	import './layout.css';
	import FeatherGitHub from '#lib/icons/FeatherGitHub.svg?component';

	let { children } = $props();
</script>

<div class="relative flex min-h-screen w-full flex-col items-center bg-gray-900 px-2 text-white">
	<a
		class="absolute top-0 right-0 mt-4 mr-4 transition hover:text-blue-500"
		target="_blank"
		href="https://github.com/sexnine/p5-negotiation-guide"
	>
		<FeatherGitHub />
	</a>

	{@render children()}
</div>

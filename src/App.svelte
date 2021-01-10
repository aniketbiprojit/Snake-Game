<script lang="ts">
	export let handleKeyPress, score;
	document.onkeydown = (e) => {
		handleKeyPress(e);
	};
</script>

<style>
	.grid {
		display: flex;
		flex-wrap: wrap;
	}
	p {
		margin-top: 0;
	}
</style>

<main>
	<h1>Snake</h1>
	<p>
		Quick keypresses might confuse the system. Doesn't run a physics engine
		but playable.
	</p>
	<h4><span id="score">{score}</span> Score</h4>
	<div class="grid" id="grid" />
	<!--{rows} Rows, {cols} Cols,-->
</main>

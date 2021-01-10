<script lang="ts">
	export let rows, cols, handleKeyPress, score;
	document.onkeydown = (e) => {
		handleKeyPress(e);
	};
</script>

<style>
	.grid {
		display: flex;
		flex-wrap: wrap;
	}
</style>

<main>
	<h1>Snake</h1>
	<div class="grid" id="grid" />
	<h4>{rows} Rows, {cols} Cols, <span id="score">{score}</span> Score</h4>
</main>

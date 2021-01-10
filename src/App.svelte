<script lang="ts">
	export let handleKeyPress, score, clickHandler;
	let fired = false;
	async function handleClick(val) {
		if (fired === true) {
			await new Promise((resolve) => {
				setTimeout(resolve, 150);
			});
		}
		fired = true;
		clickHandler(val);
	}
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
	.buttons {
		display: flex;
		flex-wrap: wrap;
		width: calc(400px - 20px);
		height: 40px;
		justify-content: center;
		margin-bottom: 10px;
	}
	.inner-btn {
		margin: 10px;
		height: 40px;
		width: 40px;

		font-size: 30px;
		display: flex;
		justify-content: center;
		align-items: center;
		text-align: center;
	}
	.inner-btn > p {
		margin-bottom: 0;
	}
</style>

<main>
	<h1>Snake</h1>
	<p>
		Quick keypresses might confuse the system. Doesn't run a physics engine
		but playable.
	</p>
	<p>Use keybord or touch.</p>
	<h4><span id="score">{score}</span> Score</h4>
	<div class="grid" id="grid" />
	<div class="buttons">
		<div on:click={() => handleClick('up')} class="inner-btn up">
			<p>&uArr;</p>
		</div>
	</div>
	<div class="buttons">
		<div class="inner-btn left" on:click={() => handleClick('left')}>
			<p>&lArr;</p>
		</div>
		<div class="inner-btn down" on:click={() => handleClick('down')}>
			<p>&dArr;</p>
		</div>
		<div class="inner-btn right" on:click={() => handleClick('right')}>
			<p>&rArr;</p>
		</div>
	</div>
</main>

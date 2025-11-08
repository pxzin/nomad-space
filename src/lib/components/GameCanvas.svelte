<script lang="ts">
	import { onMount, onDestroy } from 'svelte';
	import type Phaser from 'phaser';

	let game: Phaser.Game | null = null;

	/**
	 * Inicializa o jogo Phaser quando o componente é montado
	 * Usa import dinâmico para evitar SSR
	 */
	onMount(async () => {
		if (typeof window !== 'undefined') {
			const PhaserModule = await import('phaser');
			const { gameConfig } = await import('$lib/game/config');

			game = new PhaserModule.default.Game(gameConfig);
		}
	});

	/**
	 * Destrói o jogo Phaser quando o componente é desmontado
	 */
	onDestroy(() => {
		if (game) {
			game.destroy(true);
			game = null;
		}
	});
</script>

<div id="game-container" />

<style>
	#game-container {
		width: 100vw;
		height: 100vh;
		display: flex;
		justify-content: center;
		align-items: center;
		background-color: #1a1a2e;
	}
</style>

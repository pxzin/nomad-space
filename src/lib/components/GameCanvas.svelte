<script lang="ts">
	import { onMount, onDestroy } from 'svelte';
	import type Phaser from 'phaser';
	import BuildMenu from './BuildMenu.svelte';
	import type { ModuleType } from '$lib/game/types/ModuleTypes';

	let game: Phaser.Game | null = null;
	let buildMenuVisible = false;
	let selectedModule: ModuleType | null = null;

	/**
	 * Inicializa o jogo Phaser quando o componente é montado
	 * Usa import dinâmico para evitar SSR
	 */
	onMount(async () => {
		if (typeof window !== 'undefined') {
			const PhaserModule = await import('phaser');
			const { gameConfig } = await import('$lib/game/config');

			game = new PhaserModule.default.Game(gameConfig);

			// Aguardar o jogo inicializar e obter referência à HUDScene
			setTimeout(() => {
				if (game) {
					const hudScene = game.scene.getScene('HUDScene');
					if (hudScene) {
						// Listener para abrir/fechar menu de construção
						hudScene.events.on('toggle-build-menu', () => {
							buildMenuVisible = !buildMenuVisible;
							console.log('🔧 Menu de construção:', buildMenuVisible ? 'aberto' : 'fechado');
						});
					}
				}
			}, 500);
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

	/**
	 * Handler quando um módulo é selecionado no menu
	 */
	function handleModuleSelect(event: CustomEvent<{ moduleType: ModuleType }>) {
		selectedModule = event.detail.moduleType;
		buildMenuVisible = false;

		console.log('🔧 Módulo selecionado:', selectedModule);

		// Emitir evento para a MainScene entrar em modo de posicionamento
		if (game) {
			const mainScene = game.scene.getScene('MainScene');
			if (mainScene) {
				mainScene.events.emit('module-selected', selectedModule);
			}
		}
	}

	/**
	 * Handler quando o menu é fechado
	 */
	function handleMenuClose() {
		buildMenuVisible = false;
	}
</script>

<div id="game-container" />

<BuildMenu visible={buildMenuVisible} on:select={handleModuleSelect} on:close={handleMenuClose} />

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

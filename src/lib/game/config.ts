import type { GameConfig } from 'phaser';
import { MainScene } from './scenes';
import { HUDScene } from './scenes/HUDScene';

/**
 * Configuração principal do Phaser
 * Define as configurações base do game engine
 */
export const gameConfig: GameConfig = {
	type: Phaser.AUTO,
	width: 1920,
	height: 1080,
	parent: 'game-container',
	backgroundColor: '#1a1a2e',
	scale: {
		mode: Phaser.Scale.FIT,
		autoCenter: Phaser.Scale.CENTER_BOTH
	},
	physics: {
		default: 'arcade',
		arcade: {
			gravity: { x: 0, y: 0 }, // Sem gravidade no espaço
			debug: true // Ativar debug durante desenvolvimento
		}
	},
	scene: [MainScene, HUDScene] // HUDScene roda em paralelo
};

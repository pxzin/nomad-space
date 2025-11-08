import { Scene, GameObjects } from 'phaser';

/**
 * Sistema de background parallax com múltiplas camadas
 * Cria efeito de profundidade com camadas movendo em velocidades diferentes
 */
export class ParallaxBackground {
	private scene: Scene;
	private layers: GameObjects.Graphics[] = [];
	private stars: { graphics: GameObjects.Graphics; speed: number }[] = [];

	constructor(scene: Scene) {
		this.scene = scene;
		this.createLayers();
	}

	/**
	 * Cria 3 camadas de parallax com estrelas
	 */
	private createLayers(): void {
		const worldWidth = 4000;
		const worldHeight = 4000;

		// Camada 1 - Estrelas distantes (mais lentas)
		this.createStarLayer(worldWidth, worldHeight, 100, 0.3, 0.5, 1);

		// Camada 2 - Estrelas médias
		this.createStarLayer(worldWidth, worldHeight, 150, 0.6, 1.5, 2);

		// Camada 3 - Estrelas próximas (mais rápidas)
		this.createStarLayer(worldWidth, worldHeight, 100, 1.0, 2, 3);
	}

	/**
	 * Cria uma camada individual de estrelas
	 */
	private createStarLayer(
		width: number,
		height: number,
		count: number,
		scrollFactor: number,
		minSize: number,
		maxSize: number
	): void {
		const graphics = this.scene.add.graphics();
		graphics.setScrollFactor(scrollFactor);
		graphics.setDepth(-10 + scrollFactor * 3); // Camadas mais lentas ficam atrás

		// Gerar estrelas aleatórias
		for (let i = 0; i < count; i++) {
			const x = Phaser.Math.Between(-width / 2, width / 2);
			const y = Phaser.Math.Between(-height / 2, height / 2);
			const size = Phaser.Math.FloatBetween(minSize, maxSize);
			const alpha = Phaser.Math.FloatBetween(0.3, 1.0);

			// Cores variadas (branco, azul claro, amarelo claro)
			const colors = [0xffffff, 0xe0f0ff, 0xfff8e0];
			const color = Phaser.Utils.Array.GetRandom(colors);

			graphics.fillStyle(color, alpha);
			graphics.fillCircle(x, y, size);

			// Adicionar brilho ocasional
			if (Math.random() > 0.8) {
				graphics.lineStyle(size * 0.5, color, alpha * 0.5);
				graphics.strokeCircle(x, y, size * 1.5);
			}
		}

		this.layers.push(graphics);
		this.stars.push({
			graphics,
			speed: scrollFactor
		});
	}

	/**
	 * Update opcional para animações futuras
	 */
	update(delta: number): void {
		// Placeholder para futuras animações
		// Ex: estrelas piscando, nebulosas movendo, etc
	}

	/**
	 * Limpa todas as camadas
	 */
	destroy(): void {
		this.layers.forEach(layer => layer.destroy());
		this.layers = [];
		this.stars = [];
	}
}

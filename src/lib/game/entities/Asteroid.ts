import { Scene, GameObjects } from 'phaser';
import { ResourceType } from '../managers/ResourceManager';

/**
 * Classe que representa um asteroide de recursos
 * Pode ser coletado pela Nave-Mãe (passivo) ou pela Nave de Exploração (laser ativo)
 */
export class Asteroid {
	private scene: Scene;
	public sprite: GameObjects.Graphics;
	private size: number;
	public resourceType: ResourceType;
	public resourceAmount: number;

	constructor(scene: Scene, x: number, y: number, size: number = 20, resourceType?: ResourceType) {
		this.scene = scene;
		this.size = size;

		// Definir tipo de recurso (aleatório se não especificado)
		if (resourceType) {
			this.resourceType = resourceType;
		} else {
			const types = [ResourceType.IRON, ResourceType.SILICON, ResourceType.HYDROGEN];
			this.resourceType = types[Math.floor(Math.random() * types.length)];
		}

		// Quantidade baseada no tamanho do asteroide
		this.resourceAmount = Math.floor(size / 2) + 5; // 12-20 recursos

		// Criar sprite placeholder (formato de asteroide irregular)
		this.sprite = this.scene.add.graphics();
		this.createAsteroidGraphics();

		// Adicionar física ao sprite
		this.scene.physics.add.existing(this.sprite);
		const body = this.sprite.body as Phaser.Physics.Arcade.Body;

		// Usar corpo circular centralizado (Graphics tem origin em 0,0)
		const radius = this.size / 2;
		body.setCircle(radius, -radius, -radius);

		// Posicionar sprite
		this.sprite.setPosition(x, y);

		// Tornar interativo para cliques
		this.sprite.setInteractive(
			new Phaser.Geom.Circle(0, 0, this.size / 2),
			Phaser.Geom.Circle.Contains
		);
	}

	/**
	 * Cria o gráfico do asteroide com cor baseada no tipo de recurso
	 */
	private createAsteroidGraphics(): void {
		// Cores baseadas no tipo de recurso
		let fillColor: number;
		let strokeColor: number;

		switch (this.resourceType) {
			case ResourceType.IRON:
				fillColor = 0x8b7355; // Marrom (ferro)
				strokeColor = 0x654321;
				break;
			case ResourceType.SILICON:
				fillColor = 0x7b68ee; // Roxo azulado (silício)
				strokeColor = 0x483d8b;
				break;
			case ResourceType.HYDROGEN:
				fillColor = 0x4682b4; // Azul claro (hidrogênio)
				strokeColor = 0x1e3a5f;
				break;
		}

		this.sprite.fillStyle(fillColor, 1);
		this.sprite.lineStyle(2, strokeColor, 1);

		// Desenhar forma irregular (aproximação de asteroide)
		const points: { x: number; y: number }[] = [];
		const segments = 8;
		const variance = 0.3; // Variação na irregularidade

		for (let i = 0; i < segments; i++) {
			const angle = (i / segments) * Math.PI * 2;
			const radiusVariation = 1 - variance / 2 + Math.random() * variance;
			const radius = (this.size / 2) * radiusVariation;

			points.push({
				x: Math.cos(angle) * radius,
				y: Math.sin(angle) * radius
			});
		}

		// Desenhar polígono irregular
		this.sprite.beginPath();
		this.sprite.moveTo(points[0].x, points[0].y);
		for (let i = 1; i < points.length; i++) {
			this.sprite.lineTo(points[i].x, points[i].y);
		}
		this.sprite.closePath();
		this.sprite.fillPath();
		this.sprite.strokePath();

		// Adicionar detalhes (crateras)
		this.sprite.fillStyle(strokeColor, 0.6);
		for (let i = 0; i < 3; i++) {
			const craterX = (Math.random() - 0.5) * this.size * 0.5;
			const craterY = (Math.random() - 0.5) * this.size * 0.5;
			const craterSize = 2 + Math.random() * 3;
			this.sprite.fillCircle(craterX, craterY, craterSize);
		}
	}

	/**
	 * Retorna a posição atual
	 */
	getPosition(): { x: number; y: number } {
		return {
			x: this.sprite.x,
			y: this.sprite.y
		};
	}

	/**
	 * Destrói o asteroide com efeito visual
	 */
	destroy(): void {
		// TODO: Adicionar efeito de partículas/explosão
		this.sprite.destroy();
	}
}

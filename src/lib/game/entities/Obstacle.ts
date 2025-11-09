import { Scene, GameObjects } from 'phaser';

/**
 * Tipos de obstáculos disponíveis
 */
export enum ObstacleType {
	SPACE_DEBRIS_SMALL = 'space_debris_small',
	SPACE_DEBRIS_MEDIUM = 'space_debris_medium',
	SPACE_DEBRIS_LARGE = 'space_debris_large',
	BARREN_ASTEROID_SMALL = 'barren_asteroid_small',
	BARREN_ASTEROID_MEDIUM = 'barren_asteroid_medium',
	BARREN_ASTEROID_LARGE = 'barren_asteroid_large'
}

/**
 * Classe que representa obstáculos estáticos no cenário
 * Obstáculos bloqueiam a passagem das naves mas não se movem
 */
export class Obstacle {
	private scene: Scene;
	public sprite: GameObjects.Graphics;
	private type: ObstacleType;
	private size: number;

	constructor(scene: Scene, x: number, y: number, type?: ObstacleType) {
		this.scene = scene;

		// Se não especificado, escolhe tipo aleatório
		this.type =
			type ||
			([
				ObstacleType.SPACE_DEBRIS_SMALL,
				ObstacleType.SPACE_DEBRIS_MEDIUM,
				ObstacleType.SPACE_DEBRIS_LARGE,
				ObstacleType.BARREN_ASTEROID_SMALL,
				ObstacleType.BARREN_ASTEROID_MEDIUM,
				ObstacleType.BARREN_ASTEROID_LARGE
			][Math.floor(Math.random() * 6)] as ObstacleType);

		// Determinar tamanho baseado no tipo
		this.size = this.getSizeForType(this.type);

		// Criar sprite visual
		this.sprite = this.scene.add.graphics();
		this.createObstacleGraphics();

		// IMPORTANTE: Posicionar ANTES de adicionar física
		this.sprite.setPosition(x, y);

		// Adicionar física ESTÁTICA
		this.scene.physics.add.existing(this.sprite, true); // true = static
		const body = this.sprite.body as Phaser.Physics.Arcade.StaticBody;

		// Configurar corpo de colisão circular
		const radius = this.size / 2;
		body.setCircle(radius);

		// Para StaticBody com Graphics, definir posição diretamente no body
		// Graphics não tem métodos geométricos (getTopLeft, etc) que Phaser espera
		body.position.set(x - radius, y - radius); // Canto superior esquerdo do círculo
		body.updateCenter(); // Atualiza o centro baseado na posição
	}

	/**
	 * Retorna o tamanho baseado no tipo de obstáculo
	 */
	private getSizeForType(type: ObstacleType): number {
		switch (type) {
			case ObstacleType.SPACE_DEBRIS_SMALL:
			case ObstacleType.BARREN_ASTEROID_SMALL:
				return 30;
			case ObstacleType.SPACE_DEBRIS_MEDIUM:
			case ObstacleType.BARREN_ASTEROID_MEDIUM:
				return 50;
			case ObstacleType.SPACE_DEBRIS_LARGE:
			case ObstacleType.BARREN_ASTEROID_LARGE:
				return 80;
		}
	}

	/**
	 * Cria os gráficos do obstáculo
	 */
	private createObstacleGraphics(): void {
		const isDebris = this.type.includes('debris');

		if (isDebris) {
			// Detritos espaciais - forma irregular angulada
			this.createDebrisGraphics();
		} else {
			// Asteroides estéreis - forma circular rochosa
			this.createBarrenAsteroidGraphics();
		}
	}

	/**
	 * Cria gráficos de detritos espaciais (metálicos, angulados)
	 */
	private createDebrisGraphics(): void {
		const radius = this.size / 2;

		// Cor metálica escura
		this.sprite.fillStyle(0x4a5568, 1);
		this.sprite.lineStyle(2, 0x1e293b, 1);

		// Forma irregular (polígono)
		const points: { x: number; y: number }[] = [];
		const numPoints = 6 + Math.floor(Math.random() * 3); // 6-8 pontos

		for (let i = 0; i < numPoints; i++) {
			const angle = (i / numPoints) * Math.PI * 2;
			const variation = 0.7 + Math.random() * 0.5; // Variação no raio
			const distance = radius * variation;

			points.push({
				x: Math.cos(angle) * distance,
				y: Math.sin(angle) * distance
			});
		}

		// Desenhar polígono
		this.sprite.fillPoints(points, true);
		this.sprite.strokePoints(points, true);

		// Adicionar detalhes - riscos/marcas
		this.sprite.lineStyle(1, 0x64748b, 0.6);
		for (let i = 0; i < 3; i++) {
			const angle = Math.random() * Math.PI * 2;
			const len = radius * 0.6;
			this.sprite.lineBetween(
				Math.cos(angle) * len * 0.3,
				Math.sin(angle) * len * 0.3,
				Math.cos(angle) * len,
				Math.sin(angle) * len
			);
		}
	}

	/**
	 * Cria gráficos de asteroide estéril (rochoso, circular)
	 */
	private createBarrenAsteroidGraphics(): void {
		const radius = this.size / 2;

		// Cor cinza rochosa
		this.sprite.fillStyle(0x78716c, 1);
		this.sprite.lineStyle(2, 0x57534e, 1);

		// Forma circular irregular
		const points: { x: number; y: number }[] = [];
		const numPoints = 12 + Math.floor(Math.random() * 4); // 12-15 pontos para parecer mais circular

		for (let i = 0; i < numPoints; i++) {
			const angle = (i / numPoints) * Math.PI * 2;
			const variation = 0.85 + Math.random() * 0.25; // Menos variação = mais circular
			const distance = radius * variation;

			points.push({
				x: Math.cos(angle) * distance,
				y: Math.sin(angle) * distance
			});
		}

		// Desenhar forma
		this.sprite.fillPoints(points, true);
		this.sprite.strokePoints(points, true);

		// Adicionar crateras (círculos escuros)
		this.sprite.fillStyle(0x44403c, 0.7);
		const numCraters = Math.floor(this.size / 20); // Mais crateras em obstáculos maiores

		for (let i = 0; i < numCraters; i++) {
			const angle = Math.random() * Math.PI * 2;
			const distance = Math.random() * radius * 0.6;
			const craterRadius = 3 + Math.random() * 5;

			this.sprite.fillCircle(
				Math.cos(angle) * distance,
				Math.sin(angle) * distance,
				craterRadius
			);
		}
	}

	/**
	 * Retorna a posição do obstáculo
	 */
	getPosition(): { x: number; y: number } {
		return {
			x: this.sprite.x,
			y: this.sprite.y
		};
	}

	/**
	 * Retorna o tipo do obstáculo
	 */
	getType(): ObstacleType {
		return this.type;
	}

	/**
	 * Retorna o tamanho do obstáculo
	 */
	getSize(): number {
		return this.size;
	}

	/**
	 * Destrói o obstáculo
	 */
	destroy(): void {
		this.sprite.destroy();
	}
}

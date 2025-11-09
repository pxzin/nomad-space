import { Scene, GameObjects } from 'phaser';

/**
 * Classe que representa a Nave de Exploração
 * Menor, mais ágil e rápida que a Nave-Mãe
 */
export class ExplorationShip {
	private scene: Scene;
	public sprite: GameObjects.Graphics;
	private cursors: Phaser.Types.Input.Keyboard.CursorKeys | null = null;
	private keys: {
		W: Phaser.Input.Keyboard.Key | null;
		A: Phaser.Input.Keyboard.Key | null;
		S: Phaser.Input.Keyboard.Key | null;
		D: Phaser.Input.Keyboard.Key | null;
	};

	// Configurações de movimento (mais ágil que a Nave-Mãe)
	private readonly ACCELERATION = 500; // Maior aceleração
	private readonly MAX_VELOCITY = 500; // Maior velocidade máxima
	private readonly DRAG = 300; // Maior arrasto (para e vira mais rápido)

	// Configurações de limites do mundo
	private readonly BUFFER_ZONE = 200;
	private worldBounds: Phaser.Geom.Rectangle | null = null;

	// Estado de controle
	private isActive: boolean = false;

	constructor(scene: Scene, x: number, y: number) {
		this.scene = scene;

		// Criar sprite placeholder (losango pequeno azul)
		this.sprite = this.scene.add.graphics();
		this.createShipGraphics();

		// Adicionar física ao sprite
		this.scene.physics.add.existing(this.sprite);
		const body = this.sprite.body as Phaser.Physics.Arcade.Body;
		body.setDrag(this.DRAG);
		body.setMaxVelocity(this.MAX_VELOCITY);

		// Configurar colisão com limites do mundo
		body.setCollideWorldBounds(true);

		// Posicionar sprite
		this.sprite.setPosition(x, y);

		// Configurar controles
		this.setupControls();

		// Armazenar limites do mundo
		this.worldBounds = this.scene.physics.world.bounds;
	}

	/**
	 * Cria o gráfico da nave de exploração (losango azul)
	 */
	private createShipGraphics(): void {
		// Cor azul para diferenciação
		this.sprite.fillStyle(0x3498db, 1);
		this.sprite.lineStyle(2, 0x2980b9, 1);

		// Desenhar losango (diamante) - mais compacto que a Nave-Mãe
		this.sprite.beginPath();
		this.sprite.moveTo(0, -12); // Topo
		this.sprite.lineTo(8, 0); // Direita
		this.sprite.lineTo(0, 12); // Baixo
		this.sprite.lineTo(-8, 0); // Esquerda
		this.sprite.closePath();
		this.sprite.fillPath();
		this.sprite.strokePath();

		// Adicionar detalhe central
		this.sprite.fillStyle(0x2ecc71, 1);
		this.sprite.fillCircle(0, 0, 2);

		// Adicionar "propulsores" visuais
		this.sprite.fillStyle(0xf39c12, 0.8);
		this.sprite.fillRect(-2, 8, 4, 3);
	}

	/**
	 * Configura os controles do teclado
	 */
	private setupControls(): void {
		if (!this.scene.input.keyboard) return;

		this.keys = {
			W: this.scene.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.W),
			A: this.scene.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.A),
			S: this.scene.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.S),
			D: this.scene.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.D)
		};

		this.cursors = this.scene.input.keyboard.createCursorKeys();
	}

	/**
	 * Ativa ou desativa o controle desta nave
	 */
	setActive(active: boolean): void {
		this.isActive = active;

		// Feedback visual quando ativa
		if (active) {
			this.sprite.setAlpha(1);
		} else {
			this.sprite.setAlpha(0.6); // Mais transparente quando inativa
		}
	}

	/**
	 * Calcula desaceleração nos limites
	 */
	private calculateBoundarySlowdown(): number {
		if (!this.worldBounds) return 0;

		const { x, y } = this.sprite;
		const bounds = this.worldBounds;

		const distanceToLeft = x - bounds.left;
		const distanceToRight = bounds.right - x;
		const distanceToTop = y - bounds.top;
		const distanceToBottom = bounds.bottom - y;

		const minDistance = Math.min(
			distanceToLeft,
			distanceToRight,
			distanceToTop,
			distanceToBottom
		);

		if (minDistance > this.BUFFER_ZONE) {
			return 0;
		}

		const slowdownFactor = 1 - minDistance / this.BUFFER_ZONE;
		return Math.pow(slowdownFactor, 2);
	}

	/**
	 * Update loop - processa input e movimento
	 */
	update(): void {
		if (!this.sprite.body) return;

		const body = this.sprite.body as Phaser.Physics.Arcade.Body;

		// Reset da aceleração
		body.setAcceleration(0);

		// Só processar input se esta nave estiver ativa
		if (this.isActive) {
			let accelerationX = 0;
			let accelerationY = 0;

			// WASD ou Arrow keys
			if (this.keys.W?.isDown || this.cursors?.up.isDown) {
				accelerationY = -this.ACCELERATION;
			}
			if (this.keys.S?.isDown || this.cursors?.down.isDown) {
				accelerationY = this.ACCELERATION;
			}
			if (this.keys.A?.isDown || this.cursors?.left.isDown) {
				accelerationX = -this.ACCELERATION;
			}
			if (this.keys.D?.isDown || this.cursors?.right.isDown) {
				accelerationX = this.ACCELERATION;
			}

			// Normalizar diagonal
			if (accelerationX !== 0 && accelerationY !== 0) {
				accelerationX *= 0.707;
				accelerationY *= 0.707;
			}

			body.setAcceleration(accelerationX, accelerationY);
		}

		// Aplicar desaceleração nas bordas
		const slowdownFactor = this.calculateBoundarySlowdown();
		if (slowdownFactor > 0) {
			const reducedMaxVelocity = this.MAX_VELOCITY * (1 - slowdownFactor * 0.7);
			body.setMaxVelocity(reducedMaxVelocity);

			const dragMultiplier = 1 + slowdownFactor * 3;
			body.setDrag(this.DRAG * dragMultiplier);
		} else {
			body.setMaxVelocity(this.MAX_VELOCITY);
			body.setDrag(this.DRAG);
		}

		// Rotação suave baseada na direção do movimento
		if (body.velocity.length() > 10) {
			const targetAngle = Math.atan2(body.velocity.y, body.velocity.x) + Math.PI / 2;
			this.sprite.rotation = Phaser.Math.Angle.RotateTo(this.sprite.rotation, targetAngle, 0.15); // Rotação mais rápida
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
	 * Retorna a velocidade atual
	 */
	getVelocity(): { x: number; y: number } {
		const body = this.sprite.body as Phaser.Physics.Arcade.Body;
		return {
			x: body.velocity.x,
			y: body.velocity.y
		};
	}

	/**
	 * Verifica se está ativa
	 */
	getIsActive(): boolean {
		return this.isActive;
	}

	/**
	 * Verifica se a nave está na zona de buffer
	 */
	isInBufferZone(): boolean {
		return this.calculateBoundarySlowdown() > 0;
	}

	/**
	 * Retorna a distância até a borda mais próxima
	 */
	getDistanceToNearestBoundary(): number {
		if (!this.worldBounds) return Infinity;

		const { x, y } = this.sprite;
		const bounds = this.worldBounds;

		const distanceToLeft = x - bounds.left;
		const distanceToRight = bounds.right - x;
		const distanceToTop = y - bounds.top;
		const distanceToBottom = bounds.bottom - y;

		return Math.min(distanceToLeft, distanceToRight, distanceToTop, distanceToBottom);
	}

	/**
	 * Retorna informações de debug sobre os limites
	 */
	getBoundaryDebugInfo(): {
		isInBuffer: boolean;
		distanceToBoundary: number;
		slowdownFactor: number;
	} {
		return {
			isInBuffer: this.isInBufferZone(),
			distanceToBoundary: this.getDistanceToNearestBoundary(),
			slowdownFactor: this.calculateBoundarySlowdown()
		};
	}

	/**
	 * Destrói a nave e limpa recursos
	 */
	destroy(): void {
		this.sprite.destroy();
	}
}

import { Scene, GameObjects } from 'phaser';

/**
 * Classe que representa a Nave-Mãe do jogador
 * Responsável por movimento, física e controles
 */
export class Player {
	private scene: Scene;
	public sprite: GameObjects.Graphics;
	private cursors: Phaser.Types.Input.Keyboard.CursorKeys | null = null;
	private keys: {
		W: Phaser.Input.Keyboard.Key | null;
		A: Phaser.Input.Keyboard.Key | null;
		S: Phaser.Input.Keyboard.Key | null;
		D: Phaser.Input.Keyboard.Key | null;
	};

	// Configurações de movimento
	private readonly ACCELERATION = 300;
	private readonly MAX_VELOCITY = 400;
	private readonly DRAG = 200;

	// Configurações de limites do mundo
	private readonly BUFFER_ZONE = 200; // Distância da borda onde começa a desaceleração
	private worldBounds: Phaser.Geom.Rectangle | null = null;

	constructor(scene: Scene, x: number, y: number) {
		this.scene = scene;

		// Criar sprite placeholder (triângulo branco)
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

		// Armazenar limites do mundo para cálculos de buffer
		this.worldBounds = this.scene.physics.world.bounds;
	}

	/**
	 * Cria o gráfico da nave (placeholder triangular)
	 */
	private createShipGraphics(): void {
		this.sprite.fillStyle(0xffffff, 1);
		this.sprite.lineStyle(2, 0x2ecc71, 1);

		// Desenhar triângulo apontando para cima
		this.sprite.beginPath();
		this.sprite.moveTo(0, -20);  // Ponta
		this.sprite.lineTo(-15, 15); // Base esquerda
		this.sprite.lineTo(15, 15);  // Base direita
		this.sprite.closePath();
		this.sprite.fillPath();
		this.sprite.strokePath();

		// Adicionar um ponto central
		this.sprite.fillStyle(0x2ecc71, 1);
		this.sprite.fillCircle(0, 0, 3);
	}

	/**
	 * Configura os controles do teclado
	 */
	private setupControls(): void {
		if (!this.scene.input.keyboard) return;

		// Configurar WASD
		this.keys = {
			W: this.scene.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.W),
			A: this.scene.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.A),
			S: this.scene.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.S),
			D: this.scene.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.D)
		};

		// Também criar cursor keys como alternativa (setas)
		this.cursors = this.scene.input.keyboard.createCursorKeys();
	}

	/**
	 * Calcula o fator de desaceleração baseado na distância até a borda mais próxima
	 * @returns Fator entre 0 e 1, onde 0 = sem desaceleração, 1 = desaceleração máxima
	 */
	private calculateBoundarySlowdown(): number {
		if (!this.worldBounds) return 0;

		const { x, y } = this.sprite;
		const bounds = this.worldBounds;

		// Calcular distâncias até cada borda
		const distanceToLeft = x - bounds.left;
		const distanceToRight = bounds.right - x;
		const distanceToTop = y - bounds.top;
		const distanceToBottom = bounds.bottom - y;

		// Encontrar a menor distância (mais próxima)
		const minDistance = Math.min(
			distanceToLeft,
			distanceToRight,
			distanceToTop,
			distanceToBottom
		);

		// Se está fora da zona de buffer, sem desaceleração
		if (minDistance > this.BUFFER_ZONE) {
			return 0;
		}

		// Calcular fator de desaceleração (0 a 1)
		// Quanto mais próximo da borda, maior o fator
		const slowdownFactor = 1 - (minDistance / this.BUFFER_ZONE);

		// Aplicar uma curva suave (ease-in) para tornar a desaceleração mais gradual
		return Math.pow(slowdownFactor, 2);
	}

	/**
	 * Verifica se a nave está na zona de buffer
	 * @returns true se está na zona de buffer
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
	 * Update loop - processa input e movimento
	 */
	update(): void {
		if (!this.sprite.body) return;

		const body = this.sprite.body as Phaser.Physics.Arcade.Body;

		// Reset da aceleração
		body.setAcceleration(0);

		// Processar input e aplicar aceleração
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

		// Normalizar diagonal (para não mover mais rápido na diagonal)
		if (accelerationX !== 0 && accelerationY !== 0) {
			accelerationX *= 0.707; // 1/sqrt(2)
			accelerationY *= 0.707;
		}

		body.setAcceleration(accelerationX, accelerationY);

		// Aplicar desaceleração progressiva nas bordas
		const slowdownFactor = this.calculateBoundarySlowdown();
		if (slowdownFactor > 0) {
			// Reduzir velocidade máxima com base na proximidade da borda
			const reducedMaxVelocity = this.MAX_VELOCITY * (1 - slowdownFactor * 0.7);
			body.setMaxVelocity(reducedMaxVelocity);

			// Aplicar uma força contrária ao movimento para "frear" a nave
			const dragMultiplier = 1 + slowdownFactor * 3; // Aumenta o arrasto conforme se aproxima
			body.setDrag(this.DRAG * dragMultiplier);
		} else {
			// Resetar valores normais quando fora da zona de buffer
			body.setMaxVelocity(this.MAX_VELOCITY);
			body.setDrag(this.DRAG);
		}

		// Rotação suave baseada na direção do movimento
		if (body.velocity.length() > 10) {
			const targetAngle = Math.atan2(body.velocity.y, body.velocity.x) + Math.PI / 2;
			this.sprite.rotation = Phaser.Math.Angle.RotateTo(
				this.sprite.rotation,
				targetAngle,
				0.1
			);
		}
	}

	/**
	 * Retorna a posição atual do jogador
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
	 * Destrói o jogador e limpa recursos
	 */
	destroy(): void {
		this.sprite.destroy();
	}
}

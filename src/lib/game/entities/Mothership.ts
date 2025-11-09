import { Scene, GameObjects } from 'phaser';

/**
 * Classe que representa a Nave-Mãe do jogador
 * Maior, mais pesada e lenta que a nave de exploração
 */
export class Mothership {
	private scene: Scene;
	public sprite: GameObjects.Graphics;
	private cursors: Phaser.Types.Input.Keyboard.CursorKeys | null = null;
	private keys: {
		W: Phaser.Input.Keyboard.Key | null;
		A: Phaser.Input.Keyboard.Key | null;
		S: Phaser.Input.Keyboard.Key | null;
		D: Phaser.Input.Keyboard.Key | null;
	};

	// Configurações de movimento (mais pesada e lenta)
	private readonly ACCELERATION = 200; // Menor aceleração
	private readonly MAX_VELOCITY = 300; // Menor velocidade máxima
	private readonly DRAG = 150; // Menor arrasto (mantém momento por mais tempo)

	// Configurações de limites do mundo
	private readonly BUFFER_ZONE = 200; // Distância da borda onde começa a desaceleração
	private worldBounds: Phaser.Geom.Rectangle | null = null;

	// Estado de controle
	private isActive: boolean = true; // Começa ativa por padrão

	// Sistema de movimento automático (para comandos remotos)
	private targetPosition: { x: number; y: number } | null = null;
	private readonly AUTO_MOVE_SPEED = 150; // Velocidade do movimento automático
	private readonly ARRIVAL_THRESHOLD = 10; // Distância para considerar que chegou ao destino

	constructor(scene: Scene, x: number, y: number) {
		this.scene = scene;

		// Criar sprite placeholder (triângulo branco)
		this.sprite = this.scene.add.graphics();
		this.createShipGraphics();

		// Adicionar física ao sprite
		this.scene.physics.add.existing(this.sprite);
		const body = this.sprite.body as Phaser.Physics.Arcade.Body;

		// Usar corpo circular para que não precise rotacionar
		// Raio baseado na largura da nave (30px de raio ~= 60x60 círculo envolvendo a nave)
		const collisionRadius = 30;
		body.setCircle(collisionRadius, -collisionRadius, -collisionRadius);

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
	 * Cria o gráfico da nave-mãe (retângulo grande)
	 */
	private createShipGraphics(): void {
		// Cor cinza/prata para a nave-mãe
		this.sprite.fillStyle(0xecf0f1, 1);
		this.sprite.lineStyle(3, 0x2ecc71, 1);

		// Desenhar retângulo grande com cantos arredondados
		this.sprite.fillRoundedRect(-20, -30, 40, 60, 5);
		this.sprite.strokeRoundedRect(-20, -30, 40, 60, 5);

		// Adicionar detalhes - janelas
		this.sprite.fillStyle(0x3498db, 0.8);
		this.sprite.fillRect(-12, -20, 8, 8);
		this.sprite.fillRect(4, -20, 8, 8);
		this.sprite.fillRect(-12, -8, 8, 8);
		this.sprite.fillRect(4, -8, 8, 8);

		// Adicionar linha central
		this.sprite.lineStyle(2, 0x2ecc71, 1);
		this.sprite.lineBetween(0, -30, 0, 30);

		// Adicionar propulsores na base
		this.sprite.fillStyle(0xe74c3c, 0.8);
		this.sprite.fillRect(-15, 25, 10, 4);
		this.sprite.fillRect(5, 25, 10, 4);
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
	 * Ativa ou desativa o controle desta nave
	 */
	setActive(active: boolean): void {
		this.isActive = active;

		// Se ativar controle manual, cancelar movimento automático
		if (active && this.targetPosition) {
			this.cancelAutoMovement();
			console.log('🛑 Movimento automático da Nave-Mãe cancelado - controle manual assumido');
		}

		// Feedback visual quando ativa
		if (active) {
			this.sprite.setAlpha(1);
		} else {
			this.sprite.setAlpha(0.6); // Mais transparente quando inativa
		}
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
	 * Define um ponto de destino para movimento automático
	 */
	setTargetPosition(x: number, y: number): void {
		this.targetPosition = { x, y };
	}

	/**
	 * Cancela o movimento automático
	 */
	cancelAutoMovement(): void {
		this.targetPosition = null;
	}

	/**
	 * Verifica se está em movimento automático
	 */
	isAutoMoving(): boolean {
		return this.targetPosition !== null;
	}

	/**
	 * Update loop - processa input e movimento
	 */
	update(): void {
		if (!this.sprite.body) return;

		const body = this.sprite.body as Phaser.Physics.Arcade.Body;

		// Reset da aceleração
		body.setAcceleration(0);

		// Processar movimento automático (prioridade sobre controle manual)
		if (this.targetPosition) {
			const distance = Phaser.Math.Distance.Between(
				this.sprite.x,
				this.sprite.y,
				this.targetPosition.x,
				this.targetPosition.y
			);

			// Se chegou no destino, parar
			if (distance < this.ARRIVAL_THRESHOLD) {
				this.targetPosition = null;
				body.setVelocity(0, 0);
			} else {
				// Mover em direção ao alvo usando physics.moveTo
				this.scene.physics.moveTo(
					this.sprite,
					this.targetPosition.x,
					this.targetPosition.y,
					this.AUTO_MOVE_SPEED
				);
			}
		}
		// Só processar input manual se não estiver em movimento automático e se estiver ativa
		else if (this.isActive) {
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
		}

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
	 * Retorna a rotação atual da nave
	 */
	getRotation(): number {
		return this.sprite.rotation;
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
	 * Verifica se está ativa
	 */
	getIsActive(): boolean {
		return this.isActive;
	}

	/**
	 * Destrói a nave e limpa recursos
	 */
	destroy(): void {
		this.sprite.destroy();
	}
}

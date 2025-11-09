import { Scene } from 'phaser';
import { Mothership } from '../entities/Mothership';
import { ExplorationShip } from '../entities/ExplorationShip';
import { Asteroid } from '../entities/Asteroid';
import { ParallaxBackground } from '../systems/ParallaxBackground';
import { DevMode } from '../utils/DevMode';
import { ResourceManager } from '../managers/ResourceManager';

type ActiveShip = 'mothership' | 'exploration';

/**
 * Cena principal do jogo
 * Responsável pelo gameplay core: exploração, construção e gerenciamento
 */
export class MainScene extends Scene {
	private mothership!: Mothership;
	private explorationShip!: ExplorationShip;
	private activeShip: ActiveShip = 'mothership';
	private background!: ParallaxBackground;
	private debugText?: Phaser.GameObjects.Text;
	private devMode: DevMode;
	private resourceManager: ResourceManager;
	private bufferZoneGraphics?: Phaser.GameObjects.Graphics;
	private tabKey!: Phaser.Input.Keyboard.Key;
	private hudScene!: Phaser.Scene;

	// Sistema de recursos
	private asteroids: Asteroid[] = [];
	private asteroidGroup!: Phaser.Physics.Arcade.Group;
	private collectionSensor!: Phaser.Physics.Arcade.Image; // Sensor de coleta passiva da Nave-Mãe
	private collectingAsteroids: Map<Asteroid, Phaser.Time.TimerEvent> = new Map(); // Asteroides sendo coletados
	private collectionCircles: Map<Asteroid, Phaser.GameObjects.Arc> = new Map(); // Círculos visuais de coleta
	private miningLaser?: Phaser.GameObjects.Line; // Linha do laser de mineração
	private miningTimer?: Phaser.Time.TimerEvent; // Timer de mineração ativa

	// Sistema de comandos remotos
	private moveToPing?: Phaser.GameObjects.Arc; // Efeito visual de ping do destino

	constructor() {
		super({ key: 'MainScene' });
		this.devMode = DevMode.getInstance();
		this.resourceManager = ResourceManager.getInstance();
	}

	/**
	 * Carrega assets necessários para a cena
	 */
	preload(): void {
		// TODO: Carregar sprites, áudio e dados
		// this.load.image('player', 'assets/sprites/player.png');
	}

	/**
	 * Inicializa a cena e cria objetos do jogo
	 */
	create(): void {
		// Definir bounds do mundo
		const worldWidth = 4000;
		const worldHeight = 4000;
		this.physics.world.setBounds(-worldWidth / 2, -worldHeight / 2, worldWidth, worldHeight);

		// Criar background parallax
		this.background = new ParallaxBackground(this);

		// Criar Nave-Mãe no centro do mundo
		this.mothership = new Mothership(this, 0, 0);

		// Criar Nave de Exploração próxima à Nave-Mãe
		this.explorationShip = new ExplorationShip(this, 50, 50);
		this.explorationShip.setActive(false); // Começa inativa

		// Configurar tecla TAB para trocar de nave
		if (this.input.keyboard) {
			this.tabKey = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.TAB);
		}

		// Configurar câmera para seguir a nave ativa
		this.cameras.main.startFollow(this.mothership.sprite, true, 0.1, 0.1);
		this.cameras.main.setBounds(-worldWidth / 2, -worldHeight / 2, worldWidth, worldHeight);
		this.cameras.main.setZoom(1);

		// Criar UI de debug (fixo na tela, não segue câmera)
		this.createDebugUI();

		// Criar visualização da zona de buffer (modo dev)
		this.createBufferZoneVisualization();

		// Listener para mudanças no modo dev
		this.devMode.onChange((enabled) => {
			if (this.bufferZoneGraphics) {
				this.bufferZoneGraphics.setVisible(enabled);
			}
		});

		// Criar sistema de recursos
		this.createResourceSystem();

		// Iniciar HUDScene em paralelo
		this.scene.launch('HUDScene');

		// Obter referência à HUDScene
		this.hudScene = this.scene.get('HUDScene');

		// Listener para o botão de recolher da HUDScene
		this.hudScene.events.on('recall-exploration-ship', this.recallExplorationShip, this);

		// Aguardar HUDScene estar pronta e atualizar visibilidade do botão
		this.time.delayedCall(200, () => {
			(this.hudScene as any).updateRecallButtonVisibility(this.activeShip);
		});

		// Instruções
		this.add
			.text(
				0,
				-400,
				'WASD/Setas: Mover | TAB: Trocar Nave | A nave rotaciona na direção do movimento',
				{
					fontFamily: 'Inter',
					fontSize: '18px',
					color: '#2ecc71',
					backgroundColor: '#1a1a2e',
					padding: { x: 10, y: 5 }
				}
			)
			.setOrigin(0.5)
			.setScrollFactor(0)
			.setDepth(100);
	}

	/**
	 * Cria visualização da zona de buffer (modo dev)
	 */
	private createBufferZoneVisualization(): void {
		const bounds = this.physics.world.bounds;
		const bufferZone = 200; // Deve ser igual ao BUFFER_ZONE do Player

		this.bufferZoneGraphics = this.add.graphics();
		this.bufferZoneGraphics.setDepth(-1); // Atrás de tudo

		// Estilo da zona de buffer
		this.bufferZoneGraphics.lineStyle(2, 0xff0000, 0.5); // Borda vermelha
		this.bufferZoneGraphics.fillStyle(0xff0000, 0.1); // Preenchimento vermelho semi-transparente

		// Desenhar retângulos da zona de buffer em cada borda

		// Borda superior
		this.bufferZoneGraphics.fillRect(
			bounds.left,
			bounds.top,
			bounds.width,
			bufferZone
		);
		this.bufferZoneGraphics.strokeRect(
			bounds.left,
			bounds.top,
			bounds.width,
			bufferZone
		);

		// Borda inferior
		this.bufferZoneGraphics.fillRect(
			bounds.left,
			bounds.bottom - bufferZone,
			bounds.width,
			bufferZone
		);
		this.bufferZoneGraphics.strokeRect(
			bounds.left,
			bounds.bottom - bufferZone,
			bounds.width,
			bufferZone
		);

		// Borda esquerda (excluindo cantos já desenhados)
		this.bufferZoneGraphics.fillRect(
			bounds.left,
			bounds.top + bufferZone,
			bufferZone,
			bounds.height - bufferZone * 2
		);
		this.bufferZoneGraphics.strokeRect(
			bounds.left,
			bounds.top + bufferZone,
			bufferZone,
			bounds.height - bufferZone * 2
		);

		// Borda direita (excluindo cantos já desenhados)
		this.bufferZoneGraphics.fillRect(
			bounds.right - bufferZone,
			bounds.top + bufferZone,
			bufferZone,
			bounds.height - bufferZone * 2
		);
		this.bufferZoneGraphics.strokeRect(
			bounds.right - bufferZone,
			bounds.top + bufferZone,
			bufferZone,
			bounds.height - bufferZone * 2
		);

		// Desenhar linha dos limites do mundo
		this.bufferZoneGraphics.lineStyle(3, 0xff0000, 0.8);
		this.bufferZoneGraphics.strokeRect(bounds.left, bounds.top, bounds.width, bounds.height);

		// Adicionar texto indicativo nos cantos
		const cornerTextStyle = {
			fontFamily: 'Fira Code',
			fontSize: '12px',
			color: '#ff0000',
			backgroundColor: '#1a1a2e',
			padding: { x: 5, y: 3 }
		};

		// Cantos com textos
		this.add
			.text(bounds.left + 10, bounds.top + 10, 'BUFFER ZONE (200px)', cornerTextStyle)
			.setDepth(0)
			.setVisible(false)
			.setName('bufferLabel');

		// Inicialmente invisível (só aparece quando modo dev estiver ativo)
		this.bufferZoneGraphics.setVisible(this.devMode.enabled);
	}

	/**
	 * Cria UI de debug com informações do jogador
	 */
	private createDebugUI(): void {
		this.debugText = this.add.text(10, 10, '', {
			fontFamily: 'Fira Code',
			fontSize: '14px',
			color: '#2ecc71',
			backgroundColor: '#1a1a2e',
			padding: { x: 8, y: 5 }
		});

		this.debugText.setScrollFactor(0); // Fixo na tela
		this.debugText.setDepth(1000);
	}

	/**
	 * Alterna entre Nave-Mãe e Nave de Exploração
	 */
	private switchShip(): void {
		if (this.activeShip === 'mothership') {
			// Trocar para nave de exploração
			this.activeShip = 'exploration';
			this.mothership.setActive(false);
			this.explorationShip.setActive(true);
			this.cameras.main.startFollow(this.explorationShip.sprite, true, 0.1, 0.1);
		} else {
			// Trocar para nave-mãe
			this.activeShip = 'mothership';
			this.explorationShip.setActive(false);
			this.mothership.setActive(true);
			this.cameras.main.startFollow(this.mothership.sprite, true, 0.1, 0.1);
		}

		// Atualizar visibilidade do botão de recolher
		(this.hudScene as any).updateRecallButtonVisibility(this.activeShip);
	}

	/**
	 * Comando para recolher a Nave de Exploração de volta à Nave-Mãe
	 */
	private recallExplorationShip(): void {
		// Obter posição da Nave-Mãe
		const mothershipPos = this.mothership.getPosition();

		// Definir Nave-Mãe como destino da Nave de Exploração
		this.explorationShip.setTargetPosition(mothershipPos.x, mothershipPos.y);

		console.log('🔙 Nave de Exploração retornando à Nave-Mãe');
	}

	/**
	 * Update loop do jogo - executado a cada frame
	 */
	update(time: number, delta: number): void {
		// Verificar troca de nave (TAB)
		if (Phaser.Input.Keyboard.JustDown(this.tabKey)) {
			this.switchShip();
		}

		// Atualizar ambas as naves
		this.mothership.update();
		this.explorationShip.update();

		// Atualizar background
		this.background.update(delta);

		// Atualizar posição do sensor de coleta passiva (segue a Nave-Mãe)
		if (this.collectionSensor) {
			const mothershipPos = this.mothership.getPosition();
			this.collectionSensor.setPosition(mothershipPos.x, mothershipPos.y);
		}

		// Atualizar laser de mineração (para seguir a nave durante mineração)
		if (this.miningLaser && !this.miningTimer?.hasDispatched) {
			const shipPos = this.explorationShip.getPosition();
			this.miningLaser.setTo(shipPos.x, shipPos.y, this.miningLaser.geom.x2, this.miningLaser.geom.y2);
		}

		// Animar círculos de coleta passiva
		this.collectionCircles.forEach((circle, asteroid) => {
			// Efeito de pulsação
			const scale = 1 + Math.sin(time * 0.005) * 0.2;
			circle.setScale(scale);

			// Atualizar posição do círculo (caso asteroide se mova)
			const asteroidPos = asteroid.getPosition();
			circle.setPosition(asteroidPos.x, asteroidPos.y);
		});

		// Atualizar debug info
		this.updateDebugInfo();
	}

	/**
	 * Atualiza informações de debug
	 */
	private updateDebugInfo(): void {
		if (!this.debugText) return;

		// Obter dados da nave ativa
		const activeShipObj =
			this.activeShip === 'mothership' ? this.mothership : this.explorationShip;
		const pos = activeShipObj.getPosition();
		const vel = activeShipObj.getVelocity();
		const speed = Math.sqrt(vel.x * vel.x + vel.y * vel.y);
		const boundaryInfo = activeShipObj.getBoundaryDebugInfo();

		// Identificar nave ativa
		const shipName = this.activeShip === 'mothership' ? '🚀 NAVE-MÃE' : '🛸 NAVE EXPLORAÇÃO';
		const shipColor = this.activeShip === 'mothership' ? 'silver' : 'blue';

		const debugLines = [
			`${shipName} (TAB para trocar)`,
			`Posição: (${Math.round(pos.x)}, ${Math.round(pos.y)})`,
			`Velocidade: ${Math.round(speed)} px/s`,
			`Vel X: ${Math.round(vel.x)} | Vel Y: ${Math.round(vel.y)}`,
			`FPS: ${Math.round(this.game.loop.actualFps)}`
		];

		// Mostrar status do modo dev
		if (this.devMode.enabled) {
			debugLines.push('', '🔧 MODO DEV ATIVO');
		}

		// Adicionar informações da zona de buffer quando relevante
		if (boundaryInfo.isInBuffer) {
			debugLines.push(
				'',
				'⚠️ ZONA DE BUFFER',
				`Dist. Borda: ${Math.round(boundaryInfo.distanceToBoundary)}px`,
				`Desaceleração: ${Math.round(boundaryInfo.slowdownFactor * 100)}%`
			);
		}

		this.debugText.setText(debugLines);
	}

	/**
	 * Cria o sistema de recursos (asteroides e coleta)
	 */
	private createResourceSystem(): void {
		// Criar grupo de física para os asteroides
		this.asteroidGroup = this.physics.add.group();

		// Spawn de asteroides em posições aleatórias
		const numAsteroids = 50; // Aumentado para testar coleta múltipla
		const worldWidth = 4000;
		const worldHeight = 4000;

		for (let i = 0; i < numAsteroids; i++) {
			const x = Phaser.Math.Between(-worldWidth / 2 + 100, worldWidth / 2 - 100);
			const y = Phaser.Math.Between(-worldHeight / 2 + 100, worldHeight / 2 - 100);
			const size = Phaser.Math.Between(15, 30);

			const asteroid = new Asteroid(this, x, y, size);
			this.asteroids.push(asteroid);
			this.asteroidGroup.add(asteroid.sprite);
		}

		// Criar sensor de coleta passiva (raio ao redor da Nave-Mãe)
		this.createPassiveCollectionSensor();

		// Adicionar listener de clique para mineração ativa
		this.input.on('pointerdown', this.onPointerDown, this);
	}

	/**
	 * Cria o sensor de coleta passiva da Nave-Mãe
	 */
	private createPassiveCollectionSensor(): void {
		const collectionRadius = 150; // Raio de coleta passiva da Nave-Mãe

		// Criar imagem invisível como sensor (círculo)
		this.collectionSensor = this.physics.add.image(0, 0, '');
		this.collectionSensor.setCircle(collectionRadius);
		this.collectionSensor.setVisible(false);

		// Criar corpo físico circular
		const body = this.collectionSensor.body as Phaser.Physics.Arcade.Body;
		body.setCircle(collectionRadius);

		// Configurar overlap com asteroides
		this.physics.add.overlap(
			this.collectionSensor,
			this.asteroidGroup,
			this.onAsteroidEnterCollectionRadius,
			undefined,
			this
		);
	}

	/**
	 * Callback quando asteroide entra no raio de coleta da Nave-Mãe
	 */
	private onAsteroidEnterCollectionRadius(
		sensor: Phaser.GameObjects.GameObject,
		asteroidSprite: Phaser.GameObjects.GameObject
	): void {
		// Encontrar o asteroide correspondente
		const asteroid = this.asteroids.find((a) => a.sprite === asteroidSprite);
		if (!asteroid) return;

		// Se já está sendo coletado, ignorar
		if (this.collectingAsteroids.has(asteroid)) return;

		// Criar círculo visual de coleta
		const asteroidPos = asteroid.getPosition();
		const collectionCircle = this.add.circle(asteroidPos.x, asteroidPos.y, 25, 0x2ecc71, 0);
		collectionCircle.setStrokeStyle(2, 0x2ecc71, 1);
		this.collectionCircles.set(asteroid, collectionCircle);

		// Iniciar timer de coleta (2 segundos)
		const collectionTime = 2000;
		const timer = this.time.delayedCall(collectionTime, () => {
			// Coletar recurso
			this.resourceManager.addResource(asteroid.resourceType, asteroid.resourceAmount);
			console.log(
				`🚀 Nave-Mãe coletou ${asteroid.resourceAmount} de ${asteroid.resourceType} (passivo)`
			);

			// Remover asteroide
			this.removeAsteroid(asteroid);
		});

		// Registrar asteroide sendo coletado
		this.collectingAsteroids.set(asteroid, timer);
	}

	/**
	 * Handler de clique do mouse (mineração ativa e movimento remoto)
	 */
	private onPointerDown(pointer: Phaser.Input.Pointer): void {
		// CLIQUE DIREITO - Comandar Nave-Mãe (quando controlando Nave de Exploração)
		if (pointer.rightButtonDown() && this.activeShip === 'exploration') {
			const worldX = pointer.worldX;
			const worldY = pointer.worldY;

			// Definir destino da Nave-Mãe
			this.mothership.setTargetPosition(worldX, worldY);

			// Criar efeito de ping visual
			this.createMoveToPing(worldX, worldY);

			console.log(`🎯 Nave-Mãe comandada para ir até (${Math.round(worldX)}, ${Math.round(worldY)})`);
			return;
		}

		// CLIQUE ESQUERDO - Mineração ativa (quando controlando Nave de Exploração)
		// Verificar se a Nave de Exploração está ativa
		if (this.activeShip !== 'exploration') return;

		// Verificar se já está minerando
		if (this.miningTimer && !this.miningTimer.hasDispatched) return;

		// Obter objetos no ponto clicado
		const clickedObjects = this.input.hitTestPointer(pointer);

		// Verificar se clicou em um asteroide
		let clickedAsteroid: Asteroid | undefined;
		for (const obj of clickedObjects) {
			const asteroid = this.asteroids.find((a) => a.sprite === obj);
			if (asteroid) {
				clickedAsteroid = asteroid;
				break;
			}
		}

		if (!clickedAsteroid) return;

		// Verificar distância até o asteroide
		const maxMiningDistance = 300;
		const shipPos = this.explorationShip.getPosition();
		const asteroidPos = clickedAsteroid.getPosition();
		const distance = Phaser.Math.Distance.Between(
			shipPos.x,
			shipPos.y,
			asteroidPos.x,
			asteroidPos.y
		);

		if (distance > maxMiningDistance) {
			console.log('⚠️ Asteroide muito distante para minerar');
			return;
		}

		// Iniciar mineração
		this.startMining(clickedAsteroid);
	}

	/**
	 * Inicia a mineração de um asteroide com laser
	 */
	private startMining(asteroid: Asteroid): void {
		const shipPos = this.explorationShip.getPosition();
		const asteroidPos = asteroid.getPosition();

		// Criar linha do laser
		this.miningLaser = this.add.line(
			0,
			0,
			shipPos.x,
			shipPos.y,
			asteroidPos.x,
			asteroidPos.y,
			0x00ff00,
			0.8
		);
		this.miningLaser.setLineWidth(2);
		this.miningLaser.setOrigin(0, 0);

		// Timer de mineração (1 segundo)
		const miningTime = 1000;
		this.miningTimer = this.time.delayedCall(miningTime, () => {
			// Coletar recurso
			this.resourceManager.addResource(asteroid.resourceType, asteroid.resourceAmount);
			console.log(
				`🛸 Nave de Exploração minerou ${asteroid.resourceAmount} de ${asteroid.resourceType} (ativo)`
			);

			// Remover laser
			if (this.miningLaser) {
				this.miningLaser.destroy();
				this.miningLaser = undefined;
			}

			// Remover asteroide
			this.removeAsteroid(asteroid);
		});
	}

	/**
	 * Cria o efeito visual de "ping" no destino do movimento remoto
	 */
	private createMoveToPing(x: number, y: number): void {
		// Remover ping anterior se existir
		if (this.moveToPing) {
			this.moveToPing.destroy();
		}

		// Criar círculo de ping
		this.moveToPing = this.add.circle(x, y, 30, 0x2ecc71, 0);
		this.moveToPing.setStrokeStyle(3, 0x2ecc71, 1);

		// Animação de expansão e fade out
		this.tweens.add({
			targets: this.moveToPing,
			radius: 60,
			alpha: 0,
			duration: 1000,
			ease: 'Cubic.Out',
			onComplete: () => {
				if (this.moveToPing) {
					this.moveToPing.destroy();
					this.moveToPing = undefined;
				}
			}
		});
	}

	/**
	 * Remove um asteroide da cena
	 */
	private removeAsteroid(asteroid: Asteroid): void {
		// Cancelar timer de coleta se existir
		const timer = this.collectingAsteroids.get(asteroid);
		if (timer) {
			timer.remove();
			this.collectingAsteroids.delete(asteroid);
		}

		// Remover círculo de coleta visual
		const circle = this.collectionCircles.get(asteroid);
		if (circle) {
			circle.destroy();
			this.collectionCircles.delete(asteroid);
		}

		// Remover do array
		const index = this.asteroids.indexOf(asteroid);
		if (index > -1) {
			this.asteroids.splice(index, 1);
		}

		// Remover do grupo
		this.asteroidGroup.remove(asteroid.sprite);

		// Destruir asteroide
		asteroid.destroy();
	}
}

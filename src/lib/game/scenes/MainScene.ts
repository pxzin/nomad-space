import { Scene } from 'phaser';
import { Player } from '../entities/Player';
import { ParallaxBackground } from '../systems/ParallaxBackground';
import { DevMode } from '../utils/DevMode';

/**
 * Cena principal do jogo
 * Responsável pelo gameplay core: exploração, construção e gerenciamento
 */
export class MainScene extends Scene {
	private player!: Player;
	private background!: ParallaxBackground;
	private debugText?: Phaser.GameObjects.Text;
	private devMode: DevMode;
	private bufferZoneGraphics?: Phaser.GameObjects.Graphics;

	constructor() {
		super({ key: 'MainScene' });
		this.devMode = DevMode.getInstance();
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

		// Criar jogador no centro do mundo
		this.player = new Player(this, 0, 0);

		// Configurar câmera para seguir o jogador
		this.cameras.main.startFollow(this.player.sprite, true, 0.1, 0.1);
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

		// Instruções
		this.add
			.text(0, -400, 'Use WASD ou Setas para mover | A nave rotaciona na direção do movimento', {
				fontFamily: 'Inter',
				fontSize: '18px',
				color: '#2ecc71',
				backgroundColor: '#1a1a2e',
				padding: { x: 10, y: 5 }
			})
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
	 * Update loop do jogo - executado a cada frame
	 */
	update(time: number, delta: number): void {
		// Atualizar player
		this.player.update();

		// Atualizar background
		this.background.update(delta);

		// Atualizar debug info
		this.updateDebugInfo();
	}

	/**
	 * Atualiza informações de debug
	 */
	private updateDebugInfo(): void {
		if (!this.debugText) return;

		const pos = this.player.getPosition();
		const vel = this.player.getVelocity();
		const speed = Math.sqrt(vel.x * vel.x + vel.y * vel.y);
		const boundaryInfo = this.player.getBoundaryDebugInfo();

		const debugLines = [
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
}

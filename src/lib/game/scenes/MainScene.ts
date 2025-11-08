import { Scene } from 'phaser';
import { Player } from '../entities/Player';
import { ParallaxBackground } from '../systems/ParallaxBackground';

/**
 * Cena principal do jogo
 * Responsável pelo gameplay core: exploração, construção e gerenciamento
 */
export class MainScene extends Scene {
	private player!: Player;
	private background!: ParallaxBackground;
	private debugText?: Phaser.GameObjects.Text;

	constructor() {
		super({ key: 'MainScene' });
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

		this.debugText.setText([
			`Posição: (${Math.round(pos.x)}, ${Math.round(pos.y)})`,
			`Velocidade: ${Math.round(speed)} px/s`,
			`Vel X: ${Math.round(vel.x)} | Vel Y: ${Math.round(vel.y)}`,
			`FPS: ${Math.round(this.game.loop.actualFps)}`
		]);
	}
}

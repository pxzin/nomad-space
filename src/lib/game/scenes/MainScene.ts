import { Scene } from 'phaser';

/**
 * Cena principal do jogo
 * Responsável pelo gameplay core: exploração, construção e gerenciamento
 */
export class MainScene extends Scene {
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
		// Adicionar texto de teste
		this.add.text(960, 540, 'Nomad Space - Protótipo', {
			fontFamily: 'Inter',
			fontSize: '48px',
			color: '#ecf0f1'
		}).setOrigin(0.5);

		// Adicionar texto informativo
		this.add.text(960, 620, 'Engine: Phaser + Svelte + TypeScript', {
			fontFamily: 'Inter',
			fontSize: '24px',
			color: '#2ecc71'
		}).setOrigin(0.5);

		// Adicionar instruções temporárias
		this.add.text(960, 700, 'Ambiente de desenvolvimento configurado!', {
			fontFamily: 'Inter',
			fontSize: '18px',
			color: '#f39c12'
		}).setOrigin(0.5);

		// Background com estrelas (exemplo simples)
		this.createStarfield();
	}

	/**
	 * Update loop do jogo - executado a cada frame
	 */
	update(time: number, delta: number): void {
		// TODO: Atualizar lógica do jogo
	}

	/**
	 * Cria um campo de estrelas simples para o background
	 */
	private createStarfield(): void {
		const graphics = this.add.graphics();
		graphics.fillStyle(0xffffff, 1);

		// Criar 200 estrelas aleatórias
		for (let i = 0; i < 200; i++) {
			const x = Phaser.Math.Between(0, 1920);
			const y = Phaser.Math.Between(0, 1080);
			const size = Phaser.Math.Between(1, 3);

			graphics.fillCircle(x, y, size);
		}
	}
}

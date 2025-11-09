import { Scene } from 'phaser';
import { ResourceManager, type Resources } from '../managers/ResourceManager';

/**
 * Cena do HUD (Heads-Up Display)
 * Roda em paralelo com a MainScene e exibe informações de recursos
 */
export class HUDScene extends Scene {
	private resourceManager: ResourceManager;
	private ironText!: Phaser.GameObjects.Text;
	private siliconText!: Phaser.GameObjects.Text;
	private hydrogenText!: Phaser.GameObjects.Text;
	private recallButton!: Phaser.GameObjects.Container;
	private recallButtonBg!: Phaser.GameObjects.Rectangle;
	private recallButtonText!: Phaser.GameObjects.Text;

	constructor() {
		super({ key: 'HUDScene' });
		this.resourceManager = ResourceManager.getInstance();
	}

	create(): void {
		// Posição inicial no canto superior direito
		const startX = this.cameras.main.width - 20;
		const startY = 20;
		const lineHeight = 30;

		// Estilo de texto para o HUD
		const textStyle = {
			fontFamily: 'Fira Code',
			fontSize: '16px',
			color: '#ffffff',
			backgroundColor: '#1a1a2e',
			padding: { x: 10, y: 5 }
		};

		// Título do painel de recursos
		this.add
			.text(startX, startY, '📦 RECURSOS', {
				...textStyle,
				fontSize: '18px',
				color: '#2ecc71'
			})
			.setOrigin(1, 0);

		// Ferro (🔩)
		this.ironText = this.add
			.text(startX, startY + lineHeight, '🔩 Ferro: 0', textStyle)
			.setOrigin(1, 0);

		// Silício (💎)
		this.siliconText = this.add
			.text(startX, startY + lineHeight * 2, '💎 Silício: 0', textStyle)
			.setOrigin(1, 0);

		// Hidrogênio (⚗️)
		this.hydrogenText = this.add
			.text(startX, startY + lineHeight * 3, '⚗️ Hidrogênio: 0', textStyle)
			.setOrigin(1, 0);

		// Listener para mudanças nos recursos
		this.resourceManager.onChange(this.updateResourceDisplay.bind(this));

		// Atualização inicial
		this.updateResourceDisplay(this.resourceManager.getResources());

		// Criar botão de "Recolher"
		this.createRecallButton();
	}

	/**
	 * Cria o botão de recolher Nave de Exploração
	 */
	private createRecallButton(): void {
		const buttonWidth = 180;
		const buttonHeight = 50;
		const buttonX = this.cameras.main.width / 2;
		const buttonY = this.cameras.main.height - 70;

		// Container para o botão
		this.recallButton = this.add.container(buttonX, buttonY);
		this.recallButton.setDepth(1000); // Garantir que está acima de tudo

		// Background do botão
		this.recallButtonBg = this.add.rectangle(0, 0, buttonWidth, buttonHeight, 0x3498db, 1);
		this.recallButtonBg.setStrokeStyle(3, 0x2980b9, 1);

		// Texto do botão
		this.recallButtonText = this.add.text(0, 0, '🔙 RECOLHER NAVE', {
			fontFamily: 'Fira Code',
			fontSize: '16px',
			color: '#ffffff',
			fontStyle: 'bold'
		});
		this.recallButtonText.setOrigin(0.5);

		// Adicionar elementos ao container
		this.recallButton.add([this.recallButtonBg, this.recallButtonText]);

		// Tornar interativo
		this.recallButtonBg.setInteractive({ useHandCursor: true });

		console.log(`🔘 Botão criado na posição: (${buttonX}, ${buttonY})`);

		// Eventos do botão
		this.recallButtonBg.on('pointerover', () => {
			this.recallButtonBg.setFillStyle(0x2980b9);
		});

		this.recallButtonBg.on('pointerout', () => {
			this.recallButtonBg.setFillStyle(0x3498db);
		});

		this.recallButtonBg.on('pointerdown', () => {
			// Feedback visual
			this.recallButtonBg.setFillStyle(0x1c638e);

			// Emitir evento para MainScene
			this.events.emit('recall-exploration-ship');

			// Animação de clique
			this.tweens.add({
				targets: this.recallButton,
				scaleX: 0.95,
				scaleY: 0.95,
				duration: 100,
				yoyo: true,
				ease: 'Cubic.Out'
			});
		});

		// Inicialmente invisível (só aparece quando controla Nave-Mãe)
		this.recallButton.setVisible(false);
	}

	/**
	 * Atualiza a visibilidade do botão de recolher baseado na nave ativa
	 */
	updateRecallButtonVisibility(activeShip: 'mothership' | 'exploration'): void {
		// Verificar se o botão foi criado antes de tentar atualizar
		if (this.recallButton) {
			const shouldBeVisible = activeShip === 'mothership';
			this.recallButton.setVisible(shouldBeVisible);
			console.log(`🔘 Botão visibilidade: ${shouldBeVisible} (nave: ${activeShip})`);
		} else {
			console.log('⚠️ Botão ainda não foi criado');
		}
	}

	/**
	 * Atualiza o display de recursos
	 */
	private updateResourceDisplay(resources: Resources): void {
		this.ironText.setText(`🔩 Ferro: ${resources.iron}`);
		this.siliconText.setText(`💎 Silício: ${resources.silicon}`);
		this.hydrogenText.setText(`⚗️ Hidrogênio: ${resources.hydrogen}`);
	}
}

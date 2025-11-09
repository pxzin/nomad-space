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
	private buildButton!: Phaser.GameObjects.Container;
	private buildButtonBg!: Phaser.GameObjects.Rectangle;
	private buildButtonText!: Phaser.GameObjects.Text;

	// Dev Mode Menu
	private devModePanel!: Phaser.GameObjects.Container;
	private devModeVisible: boolean = false;
	private devModeKey!: Phaser.Input.Keyboard.Key;

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

		// Criar botão de "Construir"
		this.createBuildButton();

		// Criar menu Dev Mode
		this.createDevModePanel();

		// Registrar tecla F1 para toggle do Dev Mode
		this.devModeKey = this.input.keyboard!.addKey(Phaser.Input.Keyboard.KeyCodes.F1);
	}

	update(): void {
		// Toggle Dev Mode com F1
		if (Phaser.Input.Keyboard.JustDown(this.devModeKey)) {
			this.toggleDevMode();
		}
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
	 * Cria o botão de construir módulos
	 */
	private createBuildButton(): void {
		const buttonWidth = 180;
		const buttonHeight = 50;
		const buttonX = this.cameras.main.width / 2;
		const buttonY = this.cameras.main.height - 140; // Acima do botão de recolher

		// Container para o botão
		this.buildButton = this.add.container(buttonX, buttonY);
		this.buildButton.setDepth(1000); // Garantir que está acima de tudo

		// Background do botão
		this.buildButtonBg = this.add.rectangle(0, 0, buttonWidth, buttonHeight, 0xe67e22, 1);
		this.buildButtonBg.setStrokeStyle(3, 0xd35400, 1);

		// Texto do botão
		this.buildButtonText = this.add.text(0, 0, '🔧 CONSTRUIR', {
			fontFamily: 'Fira Code',
			fontSize: '16px',
			color: '#ffffff',
			fontStyle: 'bold'
		});
		this.buildButtonText.setOrigin(0.5);

		// Adicionar elementos ao container
		this.buildButton.add([this.buildButtonBg, this.buildButtonText]);

		// Tornar interativo
		this.buildButtonBg.setInteractive({ useHandCursor: true });

		console.log(`🔧 Botão de Construir criado na posição: (${buttonX}, ${buttonY})`);

		// Eventos do botão
		this.buildButtonBg.on('pointerover', () => {
			this.buildButtonBg.setFillStyle(0xd35400);
		});

		this.buildButtonBg.on('pointerout', () => {
			this.buildButtonBg.setFillStyle(0xe67e22);
		});

		this.buildButtonBg.on('pointerdown', () => {
			// Feedback visual
			this.buildButtonBg.setFillStyle(0xa04000);

			// Emitir evento para MainScene abrir o menu de construção
			this.events.emit('toggle-build-menu');

			// Animação de clique
			this.tweens.add({
				targets: this.buildButton,
				scaleX: 0.95,
				scaleY: 0.95,
				duration: 100,
				yoyo: true,
				ease: 'Cubic.Out'
			});
		});

		// Sempre visível (por enquanto)
		this.buildButton.setVisible(true);
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

	/**
	 * Cria o painel de Dev Mode
	 */
	private createDevModePanel(): void {
		const panelWidth = 300;
		const panelHeight = 350;
		const panelX = this.cameras.main.width / 2;
		const panelY = this.cameras.main.height / 2;

		// Container principal
		this.devModePanel = this.add.container(panelX, panelY);
		this.devModePanel.setDepth(2000); // Acima de tudo

		// Background do painel
		const background = this.add.rectangle(0, 0, panelWidth, panelHeight, 0x1a1a2e, 0.95);
		background.setStrokeStyle(3, 0xe74c3c, 1);

		// Título
		const title = this.add.text(0, -panelHeight / 2 + 30, '🛠️ DEV MODE', {
			fontFamily: 'Fira Code',
			fontSize: '20px',
			color: '#e74c3c',
			fontStyle: 'bold'
		});
		title.setOrigin(0.5);

		// Subtítulo
		const subtitle = this.add.text(0, -panelHeight / 2 + 60, 'Pressione F1 para fechar', {
			fontFamily: 'Fira Code',
			fontSize: '12px',
			color: '#95a5a6',
			fontStyle: 'italic'
		});
		subtitle.setOrigin(0.5);

		// Separador
		const separator = this.add.rectangle(0, -panelHeight / 2 + 80, panelWidth - 40, 2, 0xe74c3c, 0.5);

		// Criar botões de recursos
		const buttonStartY = -panelHeight / 2 + 120;
		const buttonSpacing = 60;

		// Botão +10 Ferro
		const ironBtn10 = this.createResourceButton(
			0,
			buttonStartY,
			'🔩 +10 Ferro',
			() => this.resourceManager.addResources(10, 0, 0)
		);

		// Botão +10 Silício
		const siliconBtn10 = this.createResourceButton(
			0,
			buttonStartY + buttonSpacing,
			'💎 +10 Silício',
			() => this.resourceManager.addResources(0, 10, 0)
		);

		// Botão +10 Hidrogênio
		const hydrogenBtn10 = this.createResourceButton(
			0,
			buttonStartY + buttonSpacing * 2,
			'⚗️ +10 Hidrogênio',
			() => this.resourceManager.addResources(0, 0, 10)
		);

		// Separador
		const separator2 = this.add.rectangle(
			0,
			buttonStartY + buttonSpacing * 3 - 20,
			panelWidth - 40,
			2,
			0xe74c3c,
			0.5
		);

		// Botão +100 Todos
		const allBtn100 = this.createResourceButton(
			0,
			buttonStartY + buttonSpacing * 3 + 10,
			'💰 +100 TODOS',
			() => this.resourceManager.addResources(100, 100, 100),
			0x2ecc71
		);

		// Adicionar tudo ao container
		this.devModePanel.add([
			background,
			title,
			subtitle,
			separator,
			ironBtn10.container,
			siliconBtn10.container,
			hydrogenBtn10.container,
			separator2,
			allBtn100.container
		]);

		// Inicialmente invisível
		this.devModePanel.setVisible(false);
	}

	/**
	 * Cria um botão de recurso para o Dev Mode
	 */
	private createResourceButton(
		x: number,
		y: number,
		text: string,
		onClick: () => void,
		color: number = 0x3498db
	): { container: Phaser.GameObjects.Container; bg: Phaser.GameObjects.Rectangle } {
		const buttonWidth = 250;
		const buttonHeight = 40;

		const container = this.add.container(x, y);

		const bg = this.add.rectangle(0, 0, buttonWidth, buttonHeight, color, 1);
		bg.setStrokeStyle(2, color - 0x111111, 1);

		const btnText = this.add.text(0, 0, text, {
			fontFamily: 'Fira Code',
			fontSize: '14px',
			color: '#ffffff',
			fontStyle: 'bold'
		});
		btnText.setOrigin(0.5);

		container.add([bg, btnText]);

		// Tornar interativo
		bg.setInteractive({ useHandCursor: true });

		bg.on('pointerover', () => {
			bg.setFillStyle(color - 0x111111);
			container.setScale(1.05);
		});

		bg.on('pointerout', () => {
			bg.setFillStyle(color);
			container.setScale(1);
		});

		bg.on('pointerdown', () => {
			bg.setFillStyle(color - 0x222222);
			onClick();

			// Animação de clique
			this.tweens.add({
				targets: container,
				scaleX: 0.95,
				scaleY: 0.95,
				duration: 100,
				yoyo: true,
				ease: 'Cubic.Out'
			});

			console.log('✅ Recursos adicionados:', text);
		});

		return { container, bg };
	}

	/**
	 * Toggle do menu Dev Mode
	 */
	private toggleDevMode(): void {
		this.devModeVisible = !this.devModeVisible;
		this.devModePanel.setVisible(this.devModeVisible);

		console.log('🛠️ Dev Mode:', this.devModeVisible ? 'ABERTO' : 'FECHADO');
	}
}

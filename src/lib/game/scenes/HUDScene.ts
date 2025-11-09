import { Scene } from 'phaser';
import { ResourceManager, type Resources } from '../managers/ResourceManager';

/**
 * Cena do HUD (Heads-Up Display)
 * Roda em paralelo com a MainScene e exibe informações de recursos
 */
export class HUDScene extends Scene {
	private resourceManager: ResourceManager;
	// Textos de recursos brutos
	private ironOreText!: Phaser.GameObjects.Text;
	private rawSiliconText!: Phaser.GameObjects.Text;
	private cosmicIceText!: Phaser.GameObjects.Text;
	// Textos de materiais refinados
	private ironPlateText!: Phaser.GameObjects.Text;
	private siliconWaferText!: Phaser.GameObjects.Text;
	private purifiedWaterText!: Phaser.GameObjects.Text;
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
		const lineHeight = 28;

		// Estilo de texto para o HUD
		const textStyle = {
			fontFamily: 'Fira Code',
			fontSize: '15px',
			color: '#ffffff',
			backgroundColor: '#1a1a2e',
			padding: { x: 10, y: 5 }
		};

		let currentY = startY;

		// === RECURSOS BRUTOS ===
		this.add
			.text(startX, currentY, '⛏️ RECURSOS BRUTOS', {
				...textStyle,
				fontSize: '17px',
				color: '#e67e22'
			})
			.setOrigin(1, 0);
		currentY += lineHeight;

		// Minério de Ferro
		this.ironOreText = this.add
			.text(startX, currentY, '🟤 Minério de Ferro: 0', textStyle)
			.setOrigin(1, 0);
		currentY += lineHeight;

		// Silício Bruto
		this.rawSiliconText = this.add
			.text(startX, currentY, '⚪ Silício Bruto: 0', textStyle)
			.setOrigin(1, 0);
		currentY += lineHeight;

		// Gelo Cósmico
		this.cosmicIceText = this.add
			.text(startX, currentY, '💠 Gelo Cósmico: 0', textStyle)
			.setOrigin(1, 0);
		currentY += lineHeight + 15;

		// === MATERIAIS REFINADOS ===
		this.add
			.text(startX, currentY, '✨ MATERIAIS REFINADOS', {
				...textStyle,
				fontSize: '17px',
				color: '#3498db'
			})
			.setOrigin(1, 0);
		currentY += lineHeight;

		// Placa de Ferro
		this.ironPlateText = this.add
			.text(startX, currentY, '🔩 Placa de Ferro: 0', textStyle)
			.setOrigin(1, 0);
		currentY += lineHeight;

		// Bolacha de Silício
		this.siliconWaferText = this.add
			.text(startX, currentY, '💎 Bolacha de Silício: 0', textStyle)
			.setOrigin(1, 0);
		currentY += lineHeight;

		// Água Purificada
		this.purifiedWaterText = this.add
			.text(startX, currentY, '⚗️ Água Purificada: 0', textStyle)
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
		// Recursos Brutos
		this.ironOreText.setText(`🟤 Minério de Ferro: ${resources.iron_ore}`);
		this.rawSiliconText.setText(`⚪ Silício Bruto: ${resources.raw_silicon}`);
		this.cosmicIceText.setText(`💠 Gelo Cósmico: ${resources.cosmic_ice}`);
		// Materiais Refinados
		this.ironPlateText.setText(`🔩 Placa de Ferro: ${resources.iron_plate}`);
		this.siliconWaferText.setText(`💎 Bolacha de Silício: ${resources.silicon_wafer}`);
		this.purifiedWaterText.setText(`⚗️ Água Purificada: ${resources.purified_water}`);
	}

	/**
	 * Cria o painel de Dev Mode
	 */
	private createDevModePanel(): void {
		const panelWidth = 320;
		const panelHeight = 620;
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
		const buttonStartY = -panelHeight / 2 + 110;
		const buttonSpacing = 45;

		// === RECURSOS BRUTOS ===
		const rawTitle = this.add.text(0, buttonStartY, '⛏️ Recursos Brutos', {
			fontFamily: 'Fira Code',
			fontSize: '14px',
			color: '#e67e22',
			fontStyle: 'bold'
		});
		rawTitle.setOrigin(0.5);

		// Botão +10 Minério de Ferro
		const ironOreBtn = this.createResourceButton(
			0,
			buttonStartY + 30,
			'🟤 +10 Minério Ferro',
			() => this.resourceManager.addResources(10),
			0xe67e22
		);

		// Botão +10 Silício Bruto
		const rawSiliconBtn = this.createResourceButton(
			0,
			buttonStartY + 30 + buttonSpacing,
			'⚪ +10 Silício Bruto',
			() => this.resourceManager.addResources(0, 10),
			0xe67e22
		);

		// Botão +10 Gelo Cósmico
		const cosmicIceBtn = this.createResourceButton(
			0,
			buttonStartY + 30 + buttonSpacing * 2,
			'💠 +10 Gelo Cósmico',
			() => this.resourceManager.addResources(0, 0, 10),
			0xe67e22
		);

		// Separador 2
		const separator2 = this.add.rectangle(
			0,
			buttonStartY + 30 + buttonSpacing * 3 - 5,
			panelWidth - 40,
			2,
			0xe74c3c,
			0.5
		);

		// === MATERIAIS REFINADOS ===
		const refinedTitle = this.add.text(0, buttonStartY + 30 + buttonSpacing * 3 + 10, '✨ Materiais Refinados', {
			fontFamily: 'Fira Code',
			fontSize: '14px',
			color: '#3498db',
			fontStyle: 'bold'
		});
		refinedTitle.setOrigin(0.5);

		// Botão +10 Placa de Ferro
		const ironPlateBtn = this.createResourceButton(
			0,
			buttonStartY + 30 + buttonSpacing * 3 + 40,
			'🔩 +10 Placa Ferro',
			() => this.resourceManager.addResources(0, 0, 0, 10),
			0x3498db
		);

		// Botão +10 Bolacha de Silício
		const siliconWaferBtn = this.createResourceButton(
			0,
			buttonStartY + 30 + buttonSpacing * 4 + 40,
			'💎 +10 Bolacha Silício',
			() => this.resourceManager.addResources(0, 0, 0, 0, 10),
			0x3498db
		);

		// Botão +10 Água Purificada
		const purifiedWaterBtn = this.createResourceButton(
			0,
			buttonStartY + 30 + buttonSpacing * 5 + 40,
			'⚗️ +10 Água Purificada',
			() => this.resourceManager.addResources(0, 0, 0, 0, 0, 10),
			0x3498db
		);

		// Separador 3
		const separator3 = this.add.rectangle(
			0,
			buttonStartY + 30 + buttonSpacing * 6 + 35,
			panelWidth - 40,
			2,
			0xe74c3c,
			0.5
		);

		// Botão +100 TODOS
		const allBtn = this.createResourceButton(
			0,
			buttonStartY + 30 + buttonSpacing * 6 + 50,
			'💰 +100 TODOS',
			() => this.resourceManager.addResources(100, 100, 100, 100, 100, 100),
			0x2ecc71
		);

		// Adicionar tudo ao container
		this.devModePanel.add([
			background,
			title,
			subtitle,
			separator,
			rawTitle,
			ironOreBtn.container,
			rawSiliconBtn.container,
			cosmicIceBtn.container,
			separator2,
			refinedTitle,
			ironPlateBtn.container,
			siliconWaferBtn.container,
			purifiedWaterBtn.container,
			separator3,
			allBtn.container
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

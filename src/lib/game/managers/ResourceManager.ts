/**
 * Tipos de recursos disponíveis no jogo
 */
export enum ResourceType {
	// Recursos Brutos (coletados de asteroides)
	IRON_ORE = 'iron_ore',
	RAW_SILICON = 'raw_silicon',
	COSMIC_ICE = 'cosmic_ice',
	// Materiais Refinados (processados pela Refinaria)
	IRON_PLATE = 'iron_plate',
	SILICON_WAFER = 'silicon_wafer',
	PURIFIED_WATER = 'purified_water',
	// Componentes (processados pela Fábrica)
	MECHANICAL_PARTS = 'mechanical_parts',
	ELECTRONIC_COMPONENTS = 'electronic_components',
	FUEL_CELL = 'fuel_cell'
}

/**
 * Interface para os recursos do jogador
 */
export interface Resources {
	// Recursos Brutos
	iron_ore: number;
	raw_silicon: number;
	cosmic_ice: number;
	// Materiais Refinados
	iron_plate: number;
	silicon_wafer: number;
	purified_water: number;
	// Componentes
	mechanical_parts: number;
	electronic_components: number;
	fuel_cell: number;
}

/**
 * Gerenciador central de recursos do jogador
 * Singleton pattern para acesso global
 */
export class ResourceManager {
	private static instance: ResourceManager;
	private resources: Resources;
	private callbacks: Set<(resources: Resources) => void> = new Set();

	private constructor() {
		// Inicializar recursos em 0
		this.resources = {
			// Recursos Brutos
			iron_ore: 0,
			raw_silicon: 0,
			cosmic_ice: 0,
			// Materiais Refinados
			iron_plate: 0,
			silicon_wafer: 0,
			purified_water: 0,
			// Componentes
			mechanical_parts: 0,
			electronic_components: 0,
			fuel_cell: 0
		};
	}

	/**
	 * Obtém a instância única do ResourceManager
	 */
	static getInstance(): ResourceManager {
		if (!ResourceManager.instance) {
			ResourceManager.instance = new ResourceManager();
		}
		return ResourceManager.instance;
	}

	/**
	 * Retorna uma cópia dos recursos atuais
	 */
	getResources(): Resources {
		return { ...this.resources };
	}

	/**
	 * Retorna a quantidade de um recurso específico
	 */
	getResource(type: ResourceType): number {
		switch (type) {
			// Recursos Brutos
			case ResourceType.IRON_ORE:
				return this.resources.iron_ore;
			case ResourceType.RAW_SILICON:
				return this.resources.raw_silicon;
			case ResourceType.COSMIC_ICE:
				return this.resources.cosmic_ice;
			// Materiais Refinados
			case ResourceType.IRON_PLATE:
				return this.resources.iron_plate;
			case ResourceType.SILICON_WAFER:
				return this.resources.silicon_wafer;
			case ResourceType.PURIFIED_WATER:
				return this.resources.purified_water;
			// Componentes
			case ResourceType.MECHANICAL_PARTS:
				return this.resources.mechanical_parts;
			case ResourceType.ELECTRONIC_COMPONENTS:
				return this.resources.electronic_components;
			case ResourceType.FUEL_CELL:
				return this.resources.fuel_cell;
		}
	}

	/**
	 * Adiciona uma quantidade de recurso
	 */
	addResource(type: ResourceType, amount: number): void {
		switch (type) {
			// Recursos Brutos
			case ResourceType.IRON_ORE:
				this.resources.iron_ore += amount;
				break;
			case ResourceType.RAW_SILICON:
				this.resources.raw_silicon += amount;
				break;
			case ResourceType.COSMIC_ICE:
				this.resources.cosmic_ice += amount;
				break;
			// Materiais Refinados
			case ResourceType.IRON_PLATE:
				this.resources.iron_plate += amount;
				break;
			case ResourceType.SILICON_WAFER:
				this.resources.silicon_wafer += amount;
				break;
			case ResourceType.PURIFIED_WATER:
				this.resources.purified_water += amount;
				break;
			// Componentes
			case ResourceType.MECHANICAL_PARTS:
				this.resources.mechanical_parts += amount;
				break;
			case ResourceType.ELECTRONIC_COMPONENTS:
				this.resources.electronic_components += amount;
				break;
			case ResourceType.FUEL_CELL:
				this.resources.fuel_cell += amount;
				break;
		}

		// Notificar listeners (HUD)
		this.notifyListeners();
	}

	/**
	 * Adiciona múltiplos recursos de uma vez
	 * Útil para Dev Mode e recompensas
	 */
	addResources(
		iron_ore: number = 0,
		raw_silicon: number = 0,
		cosmic_ice: number = 0,
		iron_plate: number = 0,
		silicon_wafer: number = 0,
		purified_water: number = 0
	): void {
		// Recursos Brutos
		this.resources.iron_ore += iron_ore;
		this.resources.raw_silicon += raw_silicon;
		this.resources.cosmic_ice += cosmic_ice;
		// Materiais Refinados
		this.resources.iron_plate += iron_plate;
		this.resources.silicon_wafer += silicon_wafer;
		this.resources.purified_water += purified_water;

		// Notificar listeners (HUD)
		this.notifyListeners();
	}

	/**
	 * Remove uma quantidade de recurso (para crafting futuro)
	 */
	removeResource(type: ResourceType, amount: number): boolean {
		const current = this.getResource(type);
		if (current < amount) {
			return false; // Não tem recursos suficientes
		}

		switch (type) {
			// Recursos Brutos
			case ResourceType.IRON_ORE:
				this.resources.iron_ore -= amount;
				break;
			case ResourceType.RAW_SILICON:
				this.resources.raw_silicon -= amount;
				break;
			case ResourceType.COSMIC_ICE:
				this.resources.cosmic_ice -= amount;
				break;
			// Materiais Refinados
			case ResourceType.IRON_PLATE:
				this.resources.iron_plate -= amount;
				break;
			case ResourceType.SILICON_WAFER:
				this.resources.silicon_wafer -= amount;
				break;
			case ResourceType.PURIFIED_WATER:
				this.resources.purified_water -= amount;
				break;
			// Componentes
			case ResourceType.MECHANICAL_PARTS:
				this.resources.mechanical_parts -= amount;
				break;
			case ResourceType.ELECTRONIC_COMPONENTS:
				this.resources.electronic_components -= amount;
				break;
			case ResourceType.FUEL_CELL:
				this.resources.fuel_cell -= amount;
				break;
		}

		this.notifyListeners();
		return true;
	}

	/**
	 * Consome múltiplos recursos de uma vez
	 * Usado para construção de módulos
	 */
	consumeResources(
		iron_ore: number = 0,
		raw_silicon: number = 0,
		cosmic_ice: number = 0,
		iron_plate: number = 0,
		silicon_wafer: number = 0,
		purified_water: number = 0
	): void {
		// Recursos Brutos
		this.resources.iron_ore -= iron_ore;
		this.resources.raw_silicon -= raw_silicon;
		this.resources.cosmic_ice -= cosmic_ice;
		// Materiais Refinados
		this.resources.iron_plate -= iron_plate;
		this.resources.silicon_wafer -= silicon_wafer;
		this.resources.purified_water -= purified_water;

		// Notificar listeners (HUD)
		this.notifyListeners();
	}

	/**
	 * Verifica se tem recursos suficientes
	 */
	hasEnough(type: ResourceType, amount: number): boolean {
		return this.getResource(type) >= amount;
	}

	/**
	 * Registra um callback para ser notificado quando recursos mudarem
	 */
	onChange(callback: (resources: Resources) => void): () => void {
		this.callbacks.add(callback);
		// Retorna função para remover o listener
		return () => this.callbacks.delete(callback);
	}

	/**
	 * Notifica todos os listeners sobre mudança nos recursos
	 */
	private notifyListeners(): void {
		const resourcesCopy = this.getResources();
		this.callbacks.forEach((callback) => callback(resourcesCopy));
	}

	/**
	 * Reseta todos os recursos (para debug/testes)
	 */
	reset(): void {
		this.resources = {
			// Recursos Brutos
			iron_ore: 0,
			raw_silicon: 0,
			cosmic_ice: 0,
			// Materiais Refinados
			iron_plate: 0,
			silicon_wafer: 0,
			purified_water: 0,
			// Componentes
			mechanical_parts: 0,
			electronic_components: 0,
			fuel_cell: 0
		};
		this.notifyListeners();
	}
}

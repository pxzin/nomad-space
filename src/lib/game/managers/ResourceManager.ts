/**
 * Tipos de recursos disponíveis no jogo
 */
export enum ResourceType {
	IRON = 'iron',
	SILICON = 'silicon',
	HYDROGEN = 'hydrogen'
}

/**
 * Interface para os recursos do jogador
 */
export interface Resources {
	iron: number;
	silicon: number;
	hydrogen: number;
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
			iron: 0,
			silicon: 0,
			hydrogen: 0
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
			case ResourceType.IRON:
				return this.resources.iron;
			case ResourceType.SILICON:
				return this.resources.silicon;
			case ResourceType.HYDROGEN:
				return this.resources.hydrogen;
		}
	}

	/**
	 * Adiciona uma quantidade de recurso
	 */
	addResource(type: ResourceType, amount: number): void {
		switch (type) {
			case ResourceType.IRON:
				this.resources.iron += amount;
				break;
			case ResourceType.SILICON:
				this.resources.silicon += amount;
				break;
			case ResourceType.HYDROGEN:
				this.resources.hydrogen += amount;
				break;
		}

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
			case ResourceType.IRON:
				this.resources.iron -= amount;
				break;
			case ResourceType.SILICON:
				this.resources.silicon -= amount;
				break;
			case ResourceType.HYDROGEN:
				this.resources.hydrogen -= amount;
				break;
		}

		this.notifyListeners();
		return true;
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
			iron: 0,
			silicon: 0,
			hydrogen: 0
		};
		this.notifyListeners();
	}
}

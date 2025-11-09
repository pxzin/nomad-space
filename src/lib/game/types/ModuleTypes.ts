/**
 * Tipos de módulos que podem ser instalados na Nave-Mãe
 */
export enum ModuleType {
	REFINERY = 'refinery',
	ENGINE = 'engine',
	STORAGE = 'storage',
	SHIELD = 'shield'
}

/**
 * Interface que representa um módulo instalável
 */
export interface Module {
	type: ModuleType;
	name: string;
	description: string;
	icon: string; // Nome do ícone/sprite
	cost: {
		iron: number;
		silicon: number;
		hydrogen: number;
	};
}

/**
 * Interface que representa um slot de módulo na Nave-Mãe
 */
export interface ModuleSlot {
	id: number;
	position: { x: number; y: number }; // Posição relativa à Nave-Mãe
	installedModule: Module | null; // null = slot vazio
}

/**
 * Catálogo de módulos disponíveis para construção
 */
export const MODULE_CATALOG: Record<ModuleType, Module> = {
	[ModuleType.REFINERY]: {
		type: ModuleType.REFINERY,
		name: 'Refinaria',
		description: 'Refina recursos brutos automaticamente',
		icon: 'module_refinery',
		cost: {
			iron: 50,
			silicon: 30,
			hydrogen: 10
		}
	},
	[ModuleType.ENGINE]: {
		type: ModuleType.ENGINE,
		name: 'Motor Aprimorado',
		description: 'Aumenta a velocidade da Nave-Mãe',
		icon: 'module_engine',
		cost: {
			iron: 40,
			silicon: 50,
			hydrogen: 20
		}
	},
	[ModuleType.STORAGE]: {
		type: ModuleType.STORAGE,
		name: 'Armazenamento Extra',
		description: 'Aumenta a capacidade de armazenamento',
		icon: 'module_storage',
		cost: {
			iron: 30,
			silicon: 20,
			hydrogen: 5
		}
	},
	[ModuleType.SHIELD]: {
		type: ModuleType.SHIELD,
		name: 'Escudo Protetor',
		description: 'Protege a nave de danos',
		icon: 'module_shield',
		cost: {
			iron: 60,
			silicon: 40,
			hydrogen: 30
		}
	}
};

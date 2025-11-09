/**
 * Tipos de módulos que podem ser instalados na Nave-Mãe
 */
export enum ModuleType {
	REFINERY = 'refinery',
	FACTORY = 'factory',
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
		// Recursos Brutos
		iron_ore: number;
		raw_silicon: number;
		cosmic_ice: number;
		// Materiais Refinados
		iron_plate: number;
		silicon_wafer: number;
		purified_water: number;
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
			// CRÍTICO: Refinaria custa APENAS recursos brutos (fix do bootstrapping)
			iron_ore: 50,
			raw_silicon: 25,
			cosmic_ice: 0,
			iron_plate: 0,
			silicon_wafer: 0,
			purified_water: 0
		}
	},
	[ModuleType.FACTORY]: {
		type: ModuleType.FACTORY,
		name: 'Fábrica',
		description: 'Produz componentes a partir de materiais refinados',
		icon: 'module_factory',
		cost: {
			// Fábrica custa materiais refinados
			iron_ore: 0,
			raw_silicon: 0,
			cosmic_ice: 0,
			iron_plate: 25,
			silicon_wafer: 10,
			purified_water: 0
		}
	},
	[ModuleType.ENGINE]: {
		type: ModuleType.ENGINE,
		name: 'Motor Aprimorado',
		description: 'Aumenta a velocidade da Nave-Mãe',
		icon: 'module_engine',
		cost: {
			// Requer muitos materiais refinados
			iron_ore: 0,
			raw_silicon: 0,
			cosmic_ice: 0,
			iron_plate: 25,
			silicon_wafer: 30,
			purified_water: 10
		}
	},
	[ModuleType.STORAGE]: {
		type: ModuleType.STORAGE,
		name: 'Armazenamento Extra',
		description: 'Aumenta a capacidade de armazenamento',
		icon: 'module_storage',
		cost: {
			// Módulo mais barato
			iron_ore: 0,
			raw_silicon: 0,
			cosmic_ice: 0,
			iron_plate: 15,
			silicon_wafer: 10,
			purified_water: 3
		}
	},
	[ModuleType.SHIELD]: {
		type: ModuleType.SHIELD,
		name: 'Escudo Protetor',
		description: 'Protege a nave de danos',
		icon: 'module_shield',
		cost: {
			// Módulo mais caro
			iron_ore: 0,
			raw_silicon: 0,
			cosmic_ice: 0,
			iron_plate: 30,
			silicon_wafer: 25,
			purified_water: 15
		}
	}
};

import type { ModuleSlot, Module, ModuleType } from '../types/ModuleTypes';
import { MODULE_CATALOG } from '../types/ModuleTypes';

/**
 * Gerenciador de slots de módulos da Nave-Mãe
 * Gerencia a instalação, remoção e estado dos módulos
 */
export class SlotManager {
	private static instance: SlotManager;
	private slots: ModuleSlot[] = [];
	private changeCallbacks: Array<(slots: ModuleSlot[]) => void> = [];

	private constructor() {
		this.initializeSlots();
	}

	/**
	 * Singleton pattern
	 */
	static getInstance(): SlotManager {
		if (!SlotManager.instance) {
			SlotManager.instance = new SlotManager();
		}
		return SlotManager.instance;
	}

	/**
	 * Inicializa os slots da Nave-Mãe
	 * Define 4 slots em posições ao redor da nave
	 */
	private initializeSlots(): void {
		this.slots = [
			{
				id: 0,
				position: { x: -25, y: -15 }, // Esquerda superior
				installedModule: null
			},
			{
				id: 1,
				position: { x: 25, y: -15 }, // Direita superior
				installedModule: null
			},
			{
				id: 2,
				position: { x: -25, y: 15 }, // Esquerda inferior
				installedModule: null
			},
			{
				id: 3,
				position: { x: 25, y: 15 }, // Direita inferior
				installedModule: null
			}
		];

		console.log('🔧 SlotManager inicializado com', this.slots.length, 'slots');
	}

	/**
	 * Retorna todos os slots
	 */
	getSlots(): ModuleSlot[] {
		return [...this.slots]; // Retorna cópia para evitar mutação externa
	}

	/**
	 * Retorna um slot específico por ID
	 */
	getSlot(id: number): ModuleSlot | undefined {
		return this.slots.find((slot) => slot.id === id);
	}

	/**
	 * Retorna apenas os slots vazios
	 */
	getEmptySlots(): ModuleSlot[] {
		return this.slots.filter((slot) => slot.installedModule === null);
	}

	/**
	 * Retorna apenas os slots ocupados
	 */
	getOccupiedSlots(): ModuleSlot[] {
		return this.slots.filter((slot) => slot.installedModule !== null);
	}

	/**
	 * Verifica se um slot está vazio
	 */
	isSlotEmpty(slotId: number): boolean {
		const slot = this.getSlot(slotId);
		return slot ? slot.installedModule === null : false;
	}

	/**
	 * Instala um módulo em um slot
	 * @returns true se instalou com sucesso, false caso contrário
	 */
	installModule(slotId: number, moduleType: ModuleType): boolean {
		const slot = this.getSlot(slotId);
		if (!slot) {
			console.error(`❌ Slot ${slotId} não existe`);
			return false;
		}

		if (slot.installedModule) {
			console.error(`❌ Slot ${slotId} já está ocupado`);
			return false;
		}

		const module = MODULE_CATALOG[moduleType];
		if (!module) {
			console.error(`❌ Módulo ${moduleType} não existe no catálogo`);
			return false;
		}

		// Instalar módulo
		slot.installedModule = { ...module };
		console.log(`✅ Módulo ${module.name} instalado no slot ${slotId}`);

		// Notificar listeners
		this.notifyChange();

		return true;
	}

	/**
	 * Remove um módulo de um slot
	 * @returns Módulo removido ou null se não havia nada instalado
	 */
	removeModule(slotId: number): Module | null {
		const slot = this.getSlot(slotId);
		if (!slot) {
			console.error(`❌ Slot ${slotId} não existe`);
			return null;
		}

		const removedModule = slot.installedModule;
		slot.installedModule = null;

		if (removedModule) {
			console.log(`🗑️ Módulo ${removedModule.name} removido do slot ${slotId}`);
			this.notifyChange();
		}

		return removedModule;
	}

	/**
	 * Remove todos os módulos instalados
	 */
	clearAllModules(): void {
		let removedCount = 0;
		this.slots.forEach((slot) => {
			if (slot.installedModule) {
				slot.installedModule = null;
				removedCount++;
			}
		});

		if (removedCount > 0) {
			console.log(`🗑️ ${removedCount} módulos removidos`);
			this.notifyChange();
		}
	}

	/**
	 * Registra um callback para ser chamado quando os slots mudarem
	 */
	onChange(callback: (slots: ModuleSlot[]) => void): void {
		this.changeCallbacks.push(callback);
	}

	/**
	 * Notifica todos os listeners sobre mudança nos slots
	 */
	private notifyChange(): void {
		const slots = this.getSlots();
		this.changeCallbacks.forEach((callback) => callback(slots));
	}

	/**
	 * Retorna informações de debug sobre os slots
	 */
	getDebugInfo(): string {
		const emptyCount = this.getEmptySlots().length;
		const occupiedCount = this.getOccupiedSlots().length;
		return `Slots: ${occupiedCount}/${this.slots.length} ocupados, ${emptyCount} vazios`;
	}
}

import { ResourceManager, ResourceType } from './ResourceManager';
import type { SlotManager } from './SlotManager';
import { ModuleType } from '../types/ModuleTypes';

/**
 * Receita de refinamento
 */
interface RefiningRecipe {
	input: { type: ResourceType; amount: number };
	output: { type: ResourceType; amount: number };
	processingTime: number; // em milissegundos
}

/**
 * Processo de refinamento em andamento
 */
interface RefiningProcess {
	recipe: RefiningRecipe;
	startTime: number;
	moduleSlotId: number;
}

/**
 * Gerenciador do sistema de produção da Refinaria
 * Singleton pattern para acesso global
 */
export class RefineryManager {
	private static instance: RefineryManager;
	private resourceManager: ResourceManager;
	private slotManager: SlotManager | null = null;
	private activeProcesses: Map<number, RefiningProcess> = new Map();

	// Receitas de refinamento
	private recipes: RefiningRecipe[] = [
		{
			input: { type: ResourceType.IRON_ORE, amount: 2 },
			output: { type: ResourceType.IRON_PLATE, amount: 1 },
			processingTime: 5000 // 5 segundos
		},
		{
			input: { type: ResourceType.RAW_SILICON, amount: 2 },
			output: { type: ResourceType.SILICON_WAFER, amount: 1 },
			processingTime: 6000 // 6 segundos
		},
		{
			input: { type: ResourceType.COSMIC_ICE, amount: 2 },
			output: { type: ResourceType.PURIFIED_WATER, amount: 1 },
			processingTime: 4000 // 4 segundos
		}
	];

	private constructor() {
		this.resourceManager = ResourceManager.getInstance();
	}

	/**
	 * Obtém a instância única do RefineryManager
	 */
	static getInstance(): RefineryManager {
		if (!RefineryManager.instance) {
			RefineryManager.instance = new RefineryManager();
		}
		return RefineryManager.instance;
	}

	/**
	 * Define o SlotManager para verificar refinarias instaladas
	 */
	setSlotManager(slotManager: SlotManager): void {
		this.slotManager = slotManager;
	}

	/**
	 * Atualização do sistema de refinamento (chamado a cada frame)
	 */
	update(time: number): void {
		if (!this.slotManager) return;

		// Verificar processos ativos e completar os finalizados
		this.activeProcesses.forEach((process, slotId) => {
			const elapsedTime = time - process.startTime;

			if (elapsedTime >= process.recipe.processingTime) {
				// Processo completo - adicionar output
				this.resourceManager.addResource(
					process.recipe.output.type,
					process.recipe.output.amount
				);

				console.log(
					`✨ Refinaria no slot ${slotId} produziu ${process.recipe.output.amount}x ${process.recipe.output.type}`
				);

				// Remover processo da lista
				this.activeProcesses.delete(slotId);
			}
		});

		// Tentar iniciar novos processos em refinarias ociosas
		const slots = this.slotManager.getSlots();
		const refinerySlots = slots.filter(
			(slot) => slot.installedModule?.type === ModuleType.REFINERY
		);

		refinerySlots.forEach((slot) => {
			// Se essa refinaria já está processando, pular
			if (this.activeProcesses.has(slot.id)) return;

			// Tentar iniciar um novo processo
			this.tryStartRefinement(slot.id, time);
		});
	}

	/**
	 * Tenta iniciar um processo de refinamento em uma refinaria específica
	 */
	private tryStartRefinement(slotId: number, currentTime: number): void {
		// Tentar cada receita em ordem de prioridade
		for (const recipe of this.recipes) {
			// Verificar se tem recursos suficientes para esta receita
			const hasEnoughInput = this.resourceManager.hasEnough(
				recipe.input.type,
				recipe.input.amount
			);

			if (hasEnoughInput) {
				// Consumir input
				this.resourceManager.removeResource(recipe.input.type, recipe.input.amount);

				// Iniciar processo
				this.activeProcesses.set(slotId, {
					recipe,
					startTime: currentTime,
					moduleSlotId: slotId
				});

				console.log(
					`⚙️ Refinaria no slot ${slotId} iniciou refinamento: ${recipe.input.amount}x ${recipe.input.type} → ${recipe.output.amount}x ${recipe.output.type}`
				);

				break; // Só processar uma receita por vez
			}
		}
	}

	/**
	 * Verifica se uma refinaria específica está processando
	 */
	isProcessing(slotId: number): boolean {
		return this.activeProcesses.has(slotId);
	}

	/**
	 * Retorna o progresso do refinamento em uma refinaria (0 a 1)
	 */
	getProcessingProgress(slotId: number, currentTime: number): number {
		const process = this.activeProcesses.get(slotId);
		if (!process) return 0;

		const elapsedTime = currentTime - process.startTime;
		return Math.min(elapsedTime / process.recipe.processingTime, 1);
	}

	/**
	 * Para todos os processos ativos (para debug/reset)
	 */
	stopAll(): void {
		this.activeProcesses.clear();
	}
}

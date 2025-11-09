import { ResourceManager, ResourceType } from './ResourceManager';
import type { SlotManager } from './SlotManager';
import { ModuleType } from '../types/ModuleTypes';

/**
 * Ingrediente de uma receita
 */
interface RecipeIngredient {
	type: ResourceType;
	amount: number;
}

/**
 * Receita de fabricação
 */
interface ManufacturingRecipe {
	inputs: RecipeIngredient[];
	output: { type: ResourceType; amount: number };
	processingTime: number; // em milissegundos
}

/**
 * Processo de fabricação em andamento
 */
interface ManufacturingProcess {
	recipe: ManufacturingRecipe;
	startTime: number;
	moduleSlotId: number;
}

/**
 * Gerenciador do sistema de produção da Fábrica
 * Singleton pattern para acesso global
 */
export class FactoryManager {
	private static instance: FactoryManager;
	private resourceManager: ResourceManager;
	private slotManager: SlotManager | null = null;
	private activeProcesses: Map<number, ManufacturingProcess> = new Map();

	// Receitas de fabricação
	private recipes: ManufacturingRecipe[] = [
		{
			// 1 Placa de Ferro → 2 Peças Mecânicas
			inputs: [{ type: ResourceType.IRON_PLATE, amount: 1 }],
			output: { type: ResourceType.MECHANICAL_PARTS, amount: 2 },
			processingTime: 3000 // 3 segundos
		},
		{
			// 1 Bolacha de Silício + 1 Peça Mecânica → 1 Componente Eletrônico
			inputs: [
				{ type: ResourceType.SILICON_WAFER, amount: 1 },
				{ type: ResourceType.MECHANICAL_PARTS, amount: 1 }
			],
			output: { type: ResourceType.ELECTRONIC_COMPONENTS, amount: 1 },
			processingTime: 5000 // 5 segundos
		},
		{
			// 2 Água Purificada + 1 Peça Mecânica → 1 Célula de Combustível
			inputs: [
				{ type: ResourceType.PURIFIED_WATER, amount: 2 },
				{ type: ResourceType.MECHANICAL_PARTS, amount: 1 }
			],
			output: { type: ResourceType.FUEL_CELL, amount: 1 },
			processingTime: 4000 // 4 segundos
		}
	];

	private constructor() {
		this.resourceManager = ResourceManager.getInstance();
	}

	/**
	 * Obtém a instância única do FactoryManager
	 */
	static getInstance(): FactoryManager {
		if (!FactoryManager.instance) {
			FactoryManager.instance = new FactoryManager();
		}
		return FactoryManager.instance;
	}

	/**
	 * Define o SlotManager para verificar fábricas instaladas
	 */
	setSlotManager(slotManager: SlotManager): void {
		this.slotManager = slotManager;
	}

	/**
	 * Atualização do sistema de fabricação (chamado a cada frame)
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
					`🏭 Fábrica no slot ${slotId} produziu ${process.recipe.output.amount}x ${process.recipe.output.type}`
				);

				// Remover processo da lista
				this.activeProcesses.delete(slotId);
			}
		});

		// Tentar iniciar novos processos em fábricas ociosas
		const slots = this.slotManager.getSlots();
		const factorySlots = slots.filter((slot) => slot.installedModule?.type === ModuleType.FACTORY);

		factorySlots.forEach((slot) => {
			// Se essa fábrica já está processando, pular
			if (this.activeProcesses.has(slot.id)) return;

			// Tentar iniciar um novo processo
			this.tryStartManufacturing(slot.id, time);
		});
	}

	/**
	 * Tenta iniciar um processo de fabricação em uma fábrica específica
	 */
	private tryStartManufacturing(slotId: number, currentTime: number): void {
		// Tentar cada receita em ordem de prioridade
		for (const recipe of this.recipes) {
			// Verificar se tem recursos suficientes para esta receita
			const hasEnoughInputs = recipe.inputs.every((ingredient) =>
				this.resourceManager.hasEnough(ingredient.type, ingredient.amount)
			);

			if (hasEnoughInputs) {
				// Consumir inputs
				recipe.inputs.forEach((ingredient) => {
					this.resourceManager.removeResource(ingredient.type, ingredient.amount);
				});

				// Iniciar processo
				this.activeProcesses.set(slotId, {
					recipe,
					startTime: currentTime,
					moduleSlotId: slotId
				});

				const inputsDesc = recipe.inputs
					.map((ing) => `${ing.amount}x ${ing.type}`)
					.join(' + ');

				console.log(
					`⚙️ Fábrica no slot ${slotId} iniciou fabricação: ${inputsDesc} → ${recipe.output.amount}x ${recipe.output.type}`
				);

				break; // Só processar uma receita por vez
			}
		}
	}

	/**
	 * Verifica se uma fábrica específica está processando
	 */
	isProcessing(slotId: number): boolean {
		return this.activeProcesses.has(slotId);
	}

	/**
	 * Retorna o progresso da fabricação em uma fábrica (0 a 1)
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

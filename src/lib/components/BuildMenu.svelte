<script lang="ts">
	import { MODULE_CATALOG, ModuleType, type Module } from '../game/types/ModuleTypes';
	import { ResourceManager, type Resources } from '../game/managers/ResourceManager';
	import { createEventDispatcher } from 'svelte';

	export let visible = false;

	const dispatch = createEventDispatcher<{
		close: void;
		select: { moduleType: ModuleType };
	}>();

	const resourceManager = ResourceManager.getInstance();
	let resources: Resources = resourceManager.getResources();

	// Atualizar recursos automaticamente
	resourceManager.onChange((newResources) => {
		resources = newResources;
	});

	// Lista de módulos do catálogo
	const modules = Object.values(MODULE_CATALOG);

	function handleSelectModule(moduleType: ModuleType) {
		dispatch('select', { moduleType });
	}

	function handleClose() {
		dispatch('close');
	}

	// Verifica se o jogador tem recursos suficientes
	function canAfford(module: Module): boolean {
		return (
			resources.iron_ore >= module.cost.iron_ore &&
			resources.raw_silicon >= module.cost.raw_silicon &&
			resources.cosmic_ice >= module.cost.cosmic_ice &&
			resources.iron_plate >= module.cost.iron_plate &&
			resources.silicon_wafer >= module.cost.silicon_wafer &&
			resources.purified_water >= module.cost.purified_water
		);
	}
</script>

{#if visible}
	<div class="build-menu-overlay" on:click={handleClose} role="presentation">
		<div class="build-menu" on:click|stopPropagation role="dialog" aria-label="Menu de Construção">
			<div class="build-menu-header">
				<h2>🔧 Construir Módulos</h2>
				<button class="close-button" on:click={handleClose} aria-label="Fechar">✕</button>
			</div>

			<div class="build-menu-content">
				<div class="modules-grid">
					{#each modules as module (module.type)}
						{@const affordable = canAfford(module)}
						<button
							class="module-card"
							class:affordable
							class:not-affordable={!affordable}
							on:click={() => handleSelectModule(module.type)}
							disabled={!affordable}
						>
							<div class="module-icon">
								{#if module.type === ModuleType.REFINERY}
									⚙️
								{:else if module.type === ModuleType.ENGINE}
									🚀
								{:else if module.type === ModuleType.STORAGE}
									📦
								{:else if module.type === ModuleType.SHIELD}
									🛡️
								{/if}
							</div>
							<div class="module-info">
								<h3>{module.name}</h3>
								<p class="module-description">{module.description}</p>
								<div class="module-cost">
									<!-- Recursos Brutos -->
									{#if module.cost.iron_ore > 0}
										<span class:insufficient={resources.iron_ore < module.cost.iron_ore}>
											🟤 {module.cost.iron_ore}
										</span>
									{/if}
									{#if module.cost.raw_silicon > 0}
										<span class:insufficient={resources.raw_silicon < module.cost.raw_silicon}>
											⚪ {module.cost.raw_silicon}
										</span>
									{/if}
									{#if module.cost.cosmic_ice > 0}
										<span class:insufficient={resources.cosmic_ice < module.cost.cosmic_ice}>
											🔵 {module.cost.cosmic_ice}
										</span>
									{/if}
									<!-- Materiais Refinados -->
									{#if module.cost.iron_plate > 0}
										<span class:insufficient={resources.iron_plate < module.cost.iron_plate}>
											🔩 {module.cost.iron_plate}
										</span>
									{/if}
									{#if module.cost.silicon_wafer > 0}
										<span class:insufficient={resources.silicon_wafer < module.cost.silicon_wafer}>
											💎 {module.cost.silicon_wafer}
										</span>
									{/if}
									{#if module.cost.purified_water > 0}
										<span class:insufficient={resources.purified_water < module.cost.purified_water}>
											⚗️ {module.cost.purified_water}
										</span>
									{/if}
								</div>
							</div>
						</button>
					{/each}
				</div>
			</div>

			<div class="build-menu-footer">
				<p class="hint">Clique em um módulo para selecioná-lo e depois em um slot vazio na nave</p>
			</div>
		</div>
	</div>
{/if}

<style>
	.build-menu-overlay {
		position: fixed;
		top: 0;
		left: 0;
		width: 100%;
		height: 100%;
		background: rgba(0, 0, 0, 0.7);
		display: flex;
		align-items: center;
		justify-content: center;
		z-index: 2000;
		backdrop-filter: blur(4px);
	}

	.build-menu {
		background: linear-gradient(135deg, #2c3e50 0%, #34495e 100%);
		border: 3px solid #e67e22;
		border-radius: 12px;
		width: 90%;
		max-width: 700px;
		max-height: 80vh;
		box-shadow: 0 10px 40px rgba(0, 0, 0, 0.5);
		display: flex;
		flex-direction: column;
	}

	.build-menu-header {
		display: flex;
		justify-content: space-between;
		align-items: center;
		padding: 20px;
		border-bottom: 2px solid #e67e22;
	}

	.build-menu-header h2 {
		margin: 0;
		font-family: 'Fira Code', monospace;
		font-size: 24px;
		color: #ecf0f1;
	}

	.close-button {
		background: #e74c3c;
		border: none;
		color: white;
		font-size: 24px;
		width: 36px;
		height: 36px;
		border-radius: 50%;
		cursor: pointer;
		display: flex;
		align-items: center;
		justify-content: center;
		transition: all 0.2s;
	}

	.close-button:hover {
		background: #c0392b;
		transform: scale(1.1);
	}

	.build-menu-content {
		flex: 1;
		overflow-y: auto;
		padding: 20px;
	}

	.modules-grid {
		display: grid;
		grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
		gap: 16px;
	}

	.module-card {
		background: linear-gradient(135deg, #34495e 0%, #2c3e50 100%);
		border: 2px solid #7f8c8d;
		border-radius: 8px;
		padding: 16px;
		cursor: pointer;
		transition: all 0.3s;
		display: flex;
		gap: 16px;
		align-items: flex-start;
		text-align: left;
	}

	.module-card.affordable {
		border-color: #27ae60;
	}

	.module-card.affordable:hover {
		background: linear-gradient(135deg, #3a5169 0%, #2e4051 100%);
		border-color: #2ecc71;
		transform: translateY(-2px);
		box-shadow: 0 4px 12px rgba(46, 204, 113, 0.3);
	}

	.module-card.not-affordable {
		opacity: 0.5;
		cursor: not-allowed;
		border-color: #e74c3c;
	}

	.module-icon {
		font-size: 48px;
		flex-shrink: 0;
	}

	.module-info {
		flex: 1;
	}

	.module-info h3 {
		margin: 0 0 8px 0;
		font-family: 'Fira Code', monospace;
		font-size: 18px;
		color: #ecf0f1;
	}

	.module-description {
		margin: 0 0 12px 0;
		font-size: 14px;
		color: #bdc3c7;
		line-height: 1.4;
	}

	.module-cost {
		display: flex;
		gap: 12px;
		font-family: 'Fira Code', monospace;
		font-size: 14px;
		color: #2ecc71;
		font-weight: bold;
	}

	.module-cost .insufficient {
		color: #e74c3c;
	}

	.build-menu-footer {
		padding: 16px 20px;
		border-top: 2px solid #e67e22;
		background: rgba(0, 0, 0, 0.2);
	}

	.hint {
		margin: 0;
		font-size: 14px;
		color: #95a5a6;
		text-align: center;
		font-style: italic;
	}

	/* Scrollbar personalizada */
	.build-menu-content::-webkit-scrollbar {
		width: 8px;
	}

	.build-menu-content::-webkit-scrollbar-track {
		background: #2c3e50;
		border-radius: 4px;
	}

	.build-menu-content::-webkit-scrollbar-thumb {
		background: #e67e22;
		border-radius: 4px;
	}

	.build-menu-content::-webkit-scrollbar-thumb:hover {
		background: #d35400;
	}
</style>

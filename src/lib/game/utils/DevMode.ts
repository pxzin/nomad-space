/**
 * Sistema de modo de desenvolvimento
 * Controla funcionalidades de debug e visualização para desenvolvimento
 */
export class DevMode {
	private static instance: DevMode;
	private _enabled: boolean = false;
	private callbacks: Set<(enabled: boolean) => void> = new Set();

	private constructor() {
		// Privado para garantir singleton
	}

	static getInstance(): DevMode {
		if (!DevMode.instance) {
			DevMode.instance = new DevMode();
		}
		return DevMode.instance;
	}

	/**
	 * Verifica se o modo dev está ativo
	 */
	get enabled(): boolean {
		return this._enabled;
	}

	/**
	 * Ativa ou desativa o modo dev
	 */
	set enabled(value: boolean) {
		if (this._enabled !== value) {
			this._enabled = value;
			console.log(
				`%c[DevMode] Modo de desenvolvimento ${value ? 'ATIVADO' : 'DESATIVADO'}`,
				`color: ${value ? '#2ecc71' : '#e74c3c'}; font-weight: bold; font-size: 14px;`
			);
			// Notificar todos os listeners
			this.callbacks.forEach((callback) => callback(value));
		}
	}

	/**
	 * Alterna entre ativo/inativo
	 */
	toggle(): boolean {
		this.enabled = !this.enabled;
		return this.enabled;
	}

	/**
	 * Registra um callback para ser notificado quando o modo dev mudar
	 */
	onChange(callback: (enabled: boolean) => void): () => void {
		this.callbacks.add(callback);
		// Retorna função para remover o listener
		return () => this.callbacks.delete(callback);
	}
}

// Expor no objeto window para acesso via console
if (typeof window !== 'undefined') {
	(window as any).devMode = {
		enable: () => DevMode.getInstance().enabled = true,
		disable: () => DevMode.getInstance().enabled = false,
		toggle: () => DevMode.getInstance().toggle(),
		status: () => {
			const enabled = DevMode.getInstance().enabled;
			console.log(
				`%c[DevMode] Status: ${enabled ? 'ATIVADO ✓' : 'DESATIVADO ✗'}`,
				`color: ${enabled ? '#2ecc71' : '#95a5a6'}; font-weight: bold;`
			);
			return enabled;
		}
	};

	// Mensagem de ajuda no console
	console.log(
		'%c[Nomad Space] Comandos de desenvolvimento disponíveis:',
		'color: #3498db; font-weight: bold; font-size: 12px;'
	);
	console.log(
		'%cdevMode.enable()  %c- Ativa modo de desenvolvimento',
		'color: #2ecc71; font-weight: bold;',
		'color: #95a5a6;'
	);
	console.log(
		'%cdevMode.disable() %c- Desativa modo de desenvolvimento',
		'color: #e74c3c; font-weight: bold;',
		'color: #95a5a6;'
	);
	console.log(
		'%cdevMode.toggle()  %c- Alterna modo de desenvolvimento',
		'color: #f39c12; font-weight: bold;',
		'color: #95a5a6;'
	);
	console.log(
		'%cdevMode.status()  %c- Mostra status atual',
		'color: #9b59b6; font-weight: bold;',
		'color: #95a5a6;'
	);
}

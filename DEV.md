# Guia de Desenvolvimento - Nomad Space

## Ambiente de Desenvolvimento Configurado

### Stack Tecnológica

- **Engine**: Phaser 3.90.0
- **Frontend/UI**: Svelte 5.43.5 (rune mode disponível)
- **Framework**: SvelteKit 2.48.4
- **Estilização**: UnoCSS 0.63.6
- **Linguagem**: TypeScript 5.9.3
- **Gerenciador de Pacotes**: pnpm

---

## Comandos Disponíveis

```bash
# Instalar dependências
pnpm install

# Iniciar servidor de desenvolvimento
pnpm dev

# Build para produção
pnpm build

# Preview do build de produção
pnpm preview

# Verificar tipos TypeScript
pnpm check

# Verificar tipos em watch mode
pnpm check:watch
```

---

## Estrutura do Projeto

```
nomad-space/
├── src/
│   ├── lib/
│   │   ├── game/              # Core do jogo Phaser
│   │   │   ├── scenes/        # Cenas do jogo
│   │   │   │   ├── MainScene.ts
│   │   │   │   └── index.ts
│   │   │   └── config.ts      # Configuração do Phaser
│   │   ├── components/        # Componentes Svelte
│   │   │   └── GameCanvas.svelte
│   │   ├── stores/           # Stores Svelte (estado global)
│   │   └── utils/            # Utilitários
│   ├── routes/               # Rotas SvelteKit
│   │   ├── +layout.svelte
│   │   └── +page.svelte
│   ├── app.html             # Template HTML
│   └── app.css              # Estilos globais
├── static/                  # Arquivos estáticos
│   └── assets/
│       ├── sprites/
│       ├── audio/
│       └── data/
├── package.json
├── svelte.config.js
├── vite.config.ts
├── tsconfig.json
└── uno.config.ts
```

---

## Arquitetura

### Phaser + Svelte Integration

O jogo usa Phaser para o game engine e Svelte para a interface do usuário:

- **Phaser**: Gerencia o canvas, física, renderização e lógica do jogo
- **Svelte**: Gerencia UI/UX, menus, HUD e estados da aplicação
- **Comunicação**: Através de Svelte stores para sincronizar estado

### Cenas Disponíveis

1. **MainScene** ([src/lib/game/scenes/MainScene.ts](src/lib/game/scenes/MainScene.ts))
   - Cena principal do jogo
   - Contém gameplay core
   - Atualmente exibe tela de teste com starfield

---

## Desenvolvimento

### Adicionando Nova Cena

1. Criar arquivo em `src/lib/game/scenes/NomeDaCena.ts`
2. Exportar em `src/lib/game/scenes/index.ts`
3. Adicionar ao array de scenes em `src/lib/game/config.ts`

### Adicionando Componente Svelte

1. Criar componente em `src/lib/components/NomeDoComponente.svelte`
2. Importar onde necessário

### Estilos com UnoCSS

UnoCSS está configurado com a paleta de cores do GDD:

```typescript
// Cores disponíveis
primary-dark   // #1a1a2e
primary-medium // #16213e
primary-light  // #0f3460
secondary-purple // #533483
secondary-orange // #f39c12
secondary-white  // #ecf0f1
accent-green   // #2ecc71
accent-red     // #e74c3c
```

Uso: `bg-primary-dark text-secondary-white`

---

## Próximos Passos

- [ ] Implementar sistema básico de movimento
- [ ] Criar sprites para nave do jogador
- [ ] Implementar sistema de input (teclado/mouse)
- [ ] Criar sistema de câmera
- [ ] Desenvolver primeira versão do HUD

---

## Troubleshooting

### Erro "navigator is not defined" (SSR)

O Phaser não é compatível com SSR (Server-Side Rendering). A solução implementada usa import dinâmico:

```typescript
// ❌ ERRADO - causa erro SSR
import Phaser from 'phaser';

// ✅ CORRETO - import dinâmico no onMount
onMount(async () => {
  const PhaserModule = await import('phaser');
  game = new PhaserModule.default.Game(config);
});
```

### Phaser não carrega

Verifique se o elemento `#game-container` existe no DOM antes da inicialização.

### TypeScript errors com Phaser

O Phaser vem com suas próprias definições de tipos. Se houver erros, execute:
```bash
pnpm check
```

### UnoCSS não aplica estilos

Certifique-se de que `@unocss-placeholder` está presente em `app.css`.

---

**Última atualização**: 08/11/2025

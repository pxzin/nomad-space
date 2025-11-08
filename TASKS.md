# Índice de Tarefas - Nomad Space

**Última atualização**: 08/11/2025
**Versão do Projeto**: v0.2.0

---

## ✅ Tarefas Concluídas

### Fase 0: Planejamento e Documentação
- [x] Criação do GDD (Game Design Document)
- [x] Definição da stack tecnológica
- [x] Criação de arquivos de memória (CLAUDE.md, GEMINI.md)
- [x] Criação do README.md inicial

### Fase 1: Setup do Ambiente (CONCLUÍDA - 08/11/2025)

#### 1.1 Configuração Base
- [x] Inicializar projeto SvelteKit com TypeScript
  - Arquivo: [package.json](package.json)
  - Arquivo: [svelte.config.js](svelte.config.js)
  - Arquivo: [tsconfig.json](tsconfig.json)

#### 1.2 Configuração do Phaser
- [x] Instalar Phaser 3.90.0
- [x] Criar configuração do Phaser
  - Arquivo: [src/lib/game/config.ts](src/lib/game/config.ts)
- [x] Resolver problema de SSR (import dinâmico)
  - Arquivo: [src/lib/components/GameCanvas.svelte](src/lib/components/GameCanvas.svelte)

#### 1.3 Configuração do UnoCSS
- [x] Instalar UnoCSS 0.63.6
- [x] Configurar paleta de cores do GDD
  - Arquivo: [uno.config.ts](uno.config.ts)
- [x] Integrar com Vite
  - Arquivo: [vite.config.ts](vite.config.ts)

#### 1.4 Estrutura do Projeto
- [x] Criar estrutura de diretórios
  ```
  src/lib/game/
  src/lib/components/
  src/lib/stores/
  src/lib/utils/
  static/assets/{sprites,audio,data}/
  ```
- [x] Configurar .gitignore

#### 1.5 Cena de Teste
- [x] Criar MainScene com starfield
  - Arquivo: [src/lib/game/scenes/MainScene.ts](src/lib/game/scenes/MainScene.ts)
- [x] Integrar Phaser com Svelte
  - Arquivo: [src/lib/components/GameCanvas.svelte](src/lib/components/GameCanvas.svelte)

#### 1.6 Servidor e Testes
- [x] Configurar scripts de desenvolvimento
- [x] Testar servidor de desenvolvimento
- [x] Validar que não há erros de SSR
- [x] Validar renderização do Phaser

#### 1.7 Documentação
- [x] Atualizar README.md com instruções
- [x] Criar DEV.md (guia de desenvolvimento)
- [x] Criar SETUP_COMPLETE.md
- [x] Documentar solução do problema SSR
- [x] Criar TASKS.md (este arquivo)

#### 1.8 Controles Básicos, Câmera e Background (TAREFA 002 - ✅ CONCLUÍDA)
**Origem**: `.ai/tasks/002-implement-basic-controls-and-camera.md`
**Data de conclusão**: 08/11/2025

- [x] Criar classe Player (Nave-Mãe)
  - Arquivo: [src/lib/game/entities/Player.ts](src/lib/game/entities/Player.ts)
  - Triângulo branco com borda verde
  - Física Arcade integrada
- [x] Implementar Background Parallax (2-3 camadas)
  - Arquivo: [src/lib/game/systems/ParallaxBackground.ts](src/lib/game/systems/ParallaxBackground.ts)
  - 3 camadas com scroll factors 0.3, 0.6, 1.0
  - ~350 estrelas com tamanhos e cores variadas
- [x] Adicionar sprite da nave (placeholder simples)
  - Triângulo branco com outline verde
  - Rotação baseada na direção do movimento
- [x] Implementar controles WASD
  - WASD + Arrow keys como alternativa
  - Normalização diagonal para velocidade consistente
- [x] Aplicar física de movimento
  - Aceleração: 300 px/s²
  - Velocidade máxima: 400 px/s
  - Drag: 200 (desaceleração suave)
- [x] Configurar câmera para seguir jogador
  - `camera.startFollow()` com lerp 0.1
  - Mundo 4000x4000 px
  - Debug UI com posição, velocidade e FPS

---

## 📋 Tarefas Pendentes

### Fase 1: Protótipo (Em Andamento)

#### 1.9 Assets Visuais Básicos (PRÓXIMO)
- [ ] Criar sprite temporário para nave (pixel art)
  - Localização: `static/assets/sprites/player-ship.png`
- [ ] Criar sprites para recursos (ferro, silício)
- [ ] Criar sprite para base simples
- [ ] Carregar assets no preload da MainScene

#### 1.10 Sistema de Câmera
- [ ] Configurar câmera para seguir jogador
- [ ] Implementar zoom in/out com scroll
- [ ] Definir bounds do mundo
- [ ] Testar smooth camera

#### 1.11 Sistema de Input
- [ ] Mapear todas as teclas (WASD, Space, ESC, etc)
- [ ] Criar InputManager
  - Localização: `src/lib/game/systems/InputManager.ts`
- [ ] Implementar sistema de eventos de input
- [ ] Adicionar suporte para gamepad (futuro)

#### 1.12 HUD Básico (Interface)
- [ ] Criar componente HUD em Svelte
  - Localização: `src/lib/components/HUD.svelte`
- [ ] Mostrar coordenadas do jogador
- [ ] Mostrar velocidade
- [ ] Mostrar recursos coletados
- [ ] Criar store Svelte para sincronizar dados Phaser → UI
  - Localização: `src/lib/stores/gameStore.ts`

#### 1.13 Sistema de Coleta de Recursos
- [ ] Criar classe Resource
  - Localização: `src/lib/game/entities/Resource.ts`
- [ ] Spawnar recursos aleatórios no mapa
- [ ] Implementar colisão player → resource
- [ ] Atualizar inventário ao coletar
- [ ] Mostrar feedback visual de coleta

#### 1.14 Sistema de Construção Simples
- [ ] Criar classe BuildingModule
  - Localização: `src/lib/game/entities/BuildingModule.ts`
- [ ] Implementar 3-4 estruturas básicas:
  - [ ] Módulo de Comando
  - [ ] Gerador Solar
  - [ ] Extrator de Recursos
  - [ ] Armazém
- [ ] Sistema de grid para posicionamento
- [ ] Preview de construção
- [ ] Verificar recursos antes de construir

#### 1.15 Sistema de Save/Load
- [ ] Criar SaveManager
  - Localização: `src/lib/game/systems/SaveManager.ts`
- [ ] Serializar estado do jogo
- [ ] Salvar em LocalStorage
- [ ] Carregar jogo salvo
- [ ] Menu de save/load

---

### Fase 2: Alpha (Planejada)

#### 2.1 Sistema de Exploração
- [ ] Gerar mapa procedural
- [ ] Criar diferentes tipos de planetas
- [ ] Sistema de descoberta/fog of war
- [ ] Marcar locais explorados

#### 2.2 Mais Estruturas
- [ ] Implementar 15-20 estruturas diferentes
- [ ] Sistema de upgrade de estruturas
- [ ] Conexões entre módulos (energia, oxigênio)

#### 2.3 Árvore de Tecnologia
- [ ] Criar UI da tech tree
- [ ] Implementar sistema de pesquisa
- [ ] Desbloquear tecnologias
- [ ] Requisitos e dependências

#### 2.4 Tipos de Planetas
- [ ] Planetas rochosos
- [ ] Luas de planetas gasosos
- [ ] Asteroides
- [ ] Detritos espaciais

#### 2.5 Eventos Dinâmicos
- [ ] Chuvas de meteoros
- [ ] Descobertas arqueológicas
- [ ] Fenômenos espaciais

---

### Fase 3: Beta (Planejada)

#### 3.1 Arte e Áudio
- [ ] Sprites finalizados
- [ ] Trilha sonora
- [ ] Efeitos sonoros
- [ ] Animações polidas

#### 3.2 Balanceamento
- [ ] Ajustar economia de recursos
- [ ] Balancear dificuldade
- [ ] Testar progressão

#### 3.3 Sistema de Conquistas
- [ ] Definir conquistas
- [ ] Implementar tracking
- [ ] UI de conquistas

#### 3.4 Tutorial
- [ ] Tutorial interativo
- [ ] Tooltips
- [ ] Onboarding para novos jogadores

#### 3.5 Otimização
- [ ] Performance profiling
- [ ] Otimizar renderização
- [ ] Reduzir bundle size
- [ ] Memory leak testing

---

### Fase 4: Release (Planejada)

#### 4.1 Polish Final
- [ ] Refinamentos visuais
- [ ] UX improvements
- [ ] Accessibility features

#### 4.2 Testes
- [ ] Testes unitários
- [ ] Testes E2E
- [ ] Beta testing com usuários
- [ ] Bug fixing

#### 4.3 Documentação
- [ ] Manual do usuário
- [ ] Changelog detalhado
- [ ] API docs (se aplicável)

#### 4.4 Deploy
- [ ] Build de produção otimizado
- [ ] Deploy em hosting
- [ ] Setup CI/CD
- [ ] Monitoramento

---

## 📊 Progresso Geral

### Por Fase
- **Fase 0 - Planejamento**: ✅ 100% (4/4)
- **Fase 1 - Setup**: ✅ 100% (7/7 subtarefas)
- **Fase 1 - Protótipo**: ⏳ 12.5% (1/8 subtarefas - Tarefa 1.8 concluída)
- **Fase 2 - Alpha**: ⏳ 0%
- **Fase 3 - Beta**: ⏳ 0%
- **Fase 4 - Release**: ⏳ 0%

### Estatísticas
- **Total de tarefas concluídas**: 12 (incluindo Tarefa 002)
- **Total de tarefas pendentes**: 39+
- **Próxima tarefa**: Assets Visuais Básicos (1.9)
- **Última atualização**: 08/11/2025

---

## 🎯 Prioridades Atuais

1. **ALTA**: Assets visuais básicos (Tarefa 1.9)
2. **MÉDIA**: HUD básico (Tarefa 1.12)
3. **MÉDIA**: Sistema de coleta (Tarefa 1.13)
4. **BAIXA**: Sistema de construção simples (Tarefa 1.14)
5. **BAIXA**: Save/Load (Tarefa 1.15)

---

## 📝 Notas

### Decisões Técnicas Importantes
1. **SSR**: Phaser usa import dinâmico para evitar erros SSR
2. **Física**: Arcade physics sem gravidade (espaço)
3. **Resolução**: 1920x1080 com scaling automático
4. **Estilo**: Pixel art minimalista

### Arquivos Principais para Referência
- [GDD.md](GDD.md) - Design do jogo
- [README.md](README.md) - Overview do projeto
- [DEV.md](DEV.md) - Guia de desenvolvimento
- [CLAUDE.md](CLAUDE.md) - Memória do programador
- [SETUP_COMPLETE.md](SETUP_COMPLETE.md) - Resumo do setup

### Comandos Úteis
```bash
pnpm dev          # Desenvolvimento
pnpm build        # Build
pnpm check        # Type checking
```

---

**Mantido por**: Claude (Programador)
**Formato**: Markdown
**Atualizar após**: Cada tarefa concluída ou mudança significativa

# Nomad Space

> Um jogo web 2D de exploração espacial e construção de base

[![Status](https://img.shields.io/badge/status-em%20desenvolvimento-yellow)](https://github.com/pxzin/nomad-space)
[![Version](https://img.shields.io/badge/versão-0.1.0-blue)](https://github.com/pxzin/nomad-space)
[![License](https://img.shields.io/badge/licença-MIT-green)](LICENSE)

---

## Sobre o Projeto

**Nomad Space** é um jogo de exploração espacial e construção de base desenvolvido para navegadores web. Os jogadores assumem o papel de um explorador espacial nômade que deve sobreviver, explorar diferentes planetas e asteroides, e construir bases funcionais enquanto descobrem tecnologias alienígenas e desvendam mistérios do espaço.

### Características Principais

- **Exploração Espacial**: Descubra planetas, asteroides e detritos espaciais
- **Construção de Base**: Sistema de construção baseado em grid com múltiplos tipos de módulos
- **Gerenciamento de Recursos**: Colete e processe recursos para expandir suas capacidades
- **Árvore de Tecnologia**: Pesquise e desbloqueie novas construções e habilidades
- **Eventos Dinâmicos**: Chuvas de meteoros, descobertas arqueológicas e fenômenos espaciais
- **Pixel Art**: Visual minimalista com estilo retro-futurista

---

## Tecnologias

### Stack Tecnológica Definida

- **Engine**: Phaser.js - Framework completo para jogos 2D
- **Frontend/UI**: Svelte (com preferência pelo rune mode)
- **Servidor/Estrutura**: SvelteKit
- **Estilização**: UnoCSS
- **Linguagem**: TypeScript
- **Armazenamento**: LocalStorage para sistema de save/load
- **Futuro**: Node.js + WebSockets para multiplayer

### Justificativa da Stack

| Tecnologia | Razão da Escolha |
|-----------|------------------|
| **Phaser** | Framework maduro e completo para jogos 2D com ampla comunidade |
| **Svelte** | Performance superior e sintaxe limpa, rune mode para reatividade otimizada |
| **SvelteKit** | SSR/SSG integrado, roteamento e estrutura full-stack |
| **UnoCSS** | Engine CSS atômica ultra-rápida com ótima DX |
| **TypeScript** | Type safety, melhor DX e manutenibilidade do código |

---

## Arquitetura do Projeto

### Estrutura de Diretórios (Proposta)

```
nomad-space/
├── docs/                    # Documentação do projeto
│   ├── GDD.md              # Game Design Document
│   ├── AGENT_MEMORY.md     # Memória do organizador (Copilot)
│   └── CLAUDE_MEMORY.md    # Memória do programador (Claude)
├── src/                    # Código fonte
│   ├── core/              # Engine principal
│   ├── entities/          # Entidades do jogo
│   ├── systems/           # Sistemas de jogo (ECS)
│   ├── ui/                # Interface de usuário
│   └── utils/             # Utilitários
├── assets/                 # Recursos do jogo
│   ├── sprites/           # Pixel art e sprites
│   ├── audio/             # Música e efeitos sonoros
│   └── data/              # Dados de configuração
├── tests/                  # Testes automatizados
│   ├── unit/              # Testes unitários
│   └── integration/       # Testes de integração
└── config/                # Arquivos de configuração
```

### Padrões de Desenvolvimento

- **Clean Code**: Código limpo e legível
- **SOLID**: Princípios de design orientado a objetos
- **DRY**: Don't Repeat Yourself
- **ECS**: Entity-Component-System para arquitetura flexível
- **Modular**: Sistemas independentes e reutilizáveis

---

## Começando

### Pré-requisitos

```bash
# Node.js (versão 18+ recomendada)
node --version

# pnpm (gerenciador de pacotes)
npm install -g pnpm
```

### Instalação

```bash
# Clone o repositório
git clone https://github.com/pxzin/nomad-space.git

# Entre no diretório
cd nomad-space

# Instale as dependências
pnpm install

# Execute o servidor de desenvolvimento
pnpm dev

# Build para produção
pnpm build

# Preview do build
pnpm preview
```

O servidor de desenvolvimento estará disponível em `http://localhost:5173/`

Para mais informações sobre desenvolvimento, veja [DEV.md](DEV.md).

---

## Roadmap de Desenvolvimento

### Fase 1: Protótipo (2-3 semanas)
- [x] Definir stack tecnológica final
- [x] Configurar ambiente de desenvolvimento (SvelteKit + Phaser + UnoCSS)
  - [x] Projeto SvelteKit inicializado
  - [x] Phaser 3.90.0 configurado
  - [x] UnoCSS com paleta de cores do GDD
  - [x] TypeScript configurado
  - [x] Estrutura de diretórios criada
  - [x] Servidor de desenvolvimento funcional
- [ ] Sistema básico de movimento
- [ ] Construção simples (3-4 estruturas)
- [ ] Coleta de recursos básica
- [ ] Interface fundamental com Svelte
- [ ] Sistema de save/load com LocalStorage

### Fase 2: Alpha (2-3 meses)
- [ ] Sistema de exploração completo
- [ ] 15-20 estruturas diferentes
- [ ] Árvore de tecnologia básica
- [ ] Múltiplos tipos de planetas
- [ ] Sistema de eventos simples

### Fase 3: Beta (4-6 meses)
- [ ] Balanceamento completo
- [ ] Arte e áudio finalizados
- [ ] Sistema de conquistas
- [ ] Tutoriais e onboarding
- [ ] Otimizações de performance

### Fase 4: Release (6-8 meses)
- [ ] Polish final
- [ ] Testes extensivos
- [ ] Documentação completa
- [ ] Lançamento público

---

## Controles (Planejados)

| Ação | Controle |
|------|----------|
| Movimento | WASD |
| Interação | Mouse (clique) |
| Zoom | Scroll |
| Ação Principal | Espaço |
| Menu/Pausar | ESC |
| Alternar Interfaces | Tab |
| Correr/Acelerar | Shift |
| Ações Secundárias | Ctrl |

---

## Estrutura da Equipe

### Desenvolvimento

- **Organizador**: Copilot
  - Estruturação do projeto
  - Definição de arquitetura
  - Documentação
  - Planejamento de tarefas

- **Programador**: Claude
  - Implementação de código
  - Arquitetura técnica
  - Debugging e otimização
  - Testes unitários

### Metodologia

Desenvolvimento ágil com documentação contínua usando arquivos de memória para manter contexto entre sessões de trabalho.

---

## Documentação

- [Game Design Document (GDD)](GDD.md) - Documento completo de design do jogo
- [AGENT_MEMORY.md](.github/copilot-instructions.md) - Memória do organizador
- [CLAUDE_MEMORY.md](CLAUDE.md) - Memória do programador

---

## Pilares de Design

1. **Exploração**: Descobrir novos mundos, recursos e tecnologias
2. **Construção**: Criar bases funcionais e esteticamente agradáveis
3. **Sobrevivência**: Gerenciar recursos vitais como oxigênio, energia e combustível
4. **Progressão**: Desbloquear novas tecnologias e expandir capacidades

---

## Recursos do Jogo

### Recursos Básicos
- **Ferro**: Construção básica
- **Silício**: Componentes eletrônicos
- **Hidrogênio**: Combustível
- **Oxigênio**: Sobrevivência
- **Energia**: Operação de sistemas

### Recursos Avançados
- Elementos raros para tecnologias avançadas
- Cristais energéticos
- Compostos orgânicos
- Tecnologias alienígenas

---

## Tipos de Estruturas

### Habitação
- Módulo de Comando
- Dormitórios
- Refeitório

### Produção
- Refinaria
- Fábrica
- Laboratório

### Infraestrutura
- Geradores de Energia (solar, nuclear, geotérmica)
- Sistemas de Suporte à Vida
- Hangares

### Armazenamento
- Silos de Recursos
- Tanques de Combustível
- Bancos de Dados

---

## Visão de Futuro

### Expansões Planejadas
1. **Multiplayer**: Cooperação e competição entre jogadores
2. **Campanhas**: Modo história estruturado
3. **Mod Support**: Ferramentas para criação de conteúdo pela comunidade
4. **Mobile**: Versão otimizada para dispositivos móveis
5. **VR**: Experiência imersiva em realidade virtual (longo prazo)

---

## Métricas de Sucesso

### KPIs Principais
- **Retenção**: D1 > 70%, D7 > 40%, D30 > 20%
- **Sessão**: Tempo médio > 20 minutos
- **Progressão**: 80% completam tutorial
- **Engajamento**: 60% retornam após primeira sessão

### Métricas Técnicas
- **Performance**: 60fps em 90% dos dispositivos
- **Carregamento**: Tempo inicial < 5 segundos
- **Bugs**: < 1 bug crítico por 1000 sessões

---

## Contribuindo

Este é um projeto em desenvolvimento ativo. Contribuições, sugestões e feedback são bem-vindos!

### Como Contribuir
1. Fork o projeto
2. Crie uma branch para sua feature (`git checkout -b feature/MinhaFeature`)
3. Commit suas mudanças (`git commit -m 'Adiciona MinhaFeature'`)
4. Push para a branch (`git push origin feature/MinhaFeature`)
5. Abra um Pull Request

---

## Licença

Este projeto está sob a licença MIT. Veja o arquivo [LICENSE](LICENSE) para mais detalhes.

---

## Contato

**Projeto**: Nomad Space
**Repositório**: [github.com/pxzin/nomad-space](https://github.com/pxzin/nomad-space)
**Status**: Em Desenvolvimento - Fase de Iniciação

---

## Changelog

### v0.2.0 - 08/11/2025
- Ambiente de desenvolvimento completamente configurado
- Projeto SvelteKit inicializado com TypeScript
- Phaser 3.90.0 integrado e funcionando
- UnoCSS configurado com paleta de cores do GDD
- Estrutura de diretórios criada
- MainScene de teste implementada com starfield
- Servidor de desenvolvimento funcional
- Documentação de desenvolvimento criada (DEV.md)

### v0.1.1 - 08/11/2025
- Stack tecnológica definida: Phaser + Svelte + SvelteKit + UnoCSS + TypeScript
- README atualizado com tecnologias confirmadas
- Marcada como concluída a definição de stack no roadmap

### v0.1.0 - 08/11/2025
- Criação inicial do projeto
- Definição do GDD
- Estruturação de documentação
- Criação de arquivos de memória para agentes

---

**Última atualização**: 08 de Novembro de 2025

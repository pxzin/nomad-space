# Game Design Document (GDD)

## Nomad Space - Jogo Web 2D de Exploração Espacial e Construção de Base

---

## 📋 Informações Básicas

### Título do Jogo

**Nomad Space**

### Gênero

- Exploração Espacial 2D
- Construção de Base
- Survival/Crafting
- Sandbox

### Plataforma

- Web Browser (HTML5)
- Desktop (Chrome, Firefox, Safari, Edge)
- Mobile (Futuro)

### Público-Alvo

- **Idade**: 12+ anos
- **Perfil**: Jogadores casuais e hardcore
- **Interesses**: Ficção científica, exploração, construção, crafting

### Tempo de Desenvolvimento Estimado

- **Protótipo**: 2-3 semanas
- **Alpha**: 2-3 meses
- **Beta**: 4-6 meses
- **Release**: 6-8 meses

---

## 🎯 Visão Geral do Jogo

### Conceito Principal

O jogador assume o papel de um explorador espacial nômade que deve sobreviver, explorar e construir bases em diferentes planetas e asteroides. O jogo combina elementos de exploração, construção, gerenciamento de recursos e descoberta científica.

### Pillares de Design

1. **Exploração**: Descobrir novos mundos, recursos e tecnologias
2. **Construção**: Criar bases funcionais e esteticamente agradáveis
3. **Sobrevivência**: Gerenciar recursos vitais como oxigênio, energia e combustível
4. **Progressão**: Desbloquear novas tecnologias e expandir capacidades

### Tom e Atmosfera

- **Visual**: Pixel art minimalista com paleta espacial (azuis, roxos, brancos)
- **Sonoro**: Ambient espacial com efeitos sintéticos suaves
- **Narrativa**: Misteriosa e contemplativa, focada na solidão e descoberta

---

## 🎮 Mecânicas de Jogo

### Mecânicas Principais

#### 1. Exploração Espacial

- **Movimentação**: Controle suave da nave espacial
- **Descoberta**: Encontrar planetas, asteroides e detritos espaciais
- **Mapeamento**: Sistema de mapa que se revela conforme exploração
- **Recursos**: Diferentes tipos de recursos em cada local

#### 2. Construção de Base

- **Sistema de Grid**: Construção baseada em tiles
- **Módulos**: Diferentes tipos de estruturas (habitação, energia, produção)
- **Conexões**: Sistema de tubulações e cabos de energia
- **Expansão**: Possibilidade de construir em múltiplos locais

#### 3. Gerenciamento de Recursos

- **Recursos Básicos**:
  - Ferro (construção básica)
  - Silício (eletrônicos)
  - Hidrogênio (combustível)
  - Oxigênio (sobrevivência)
  - Energia (operação de sistemas)
- **Recursos Avançados**:
  - Elementos raros para tecnologias avançadas
  - Cristais energéticos
  - Compostos orgânicos

#### 4. Sistema de Tecnologia

- **Árvore de Pesquisa**: Desbloquear novas construções e capacidades
- **Laboratórios**: Estruturas dedicadas à pesquisa
- **Descobertas**: Encontrar tecnologias alienígenas

### Mecânicas Secundárias

#### 1. Sobrevivência

- **Oxigênio**: Necessário para EVAs (atividades externas)
- **Energia**: Manter sistemas da base funcionando
- **Integridade da Base**: Proteção contra meteoros e eventos

#### 2. Crafting

- **Refinarias**: Processar recursos brutos
- **Fábricas**: Produzir componentes complexos
- **Montadoras**: Criar equipamentos e estruturas

#### 3. Eventos Dinâmicos

- **Chuvas de Meteoros**: Ameaças às bases
- **Descobertas**: Achados arqueológicos alienígenas
- **Fenômenos**: Eventos espaciais únicos

---

## 🏗️ Sistemas de Jogo

### Sistema de Construção

#### Tipos de Estruturas

1. **Habitação**

   - Módulo de Comando (centro de controle)
   - Dormitórios (aumento de eficiência)
   - Cozinha/Refeitório (moral da tripulação - futuro)

2. **Produção**

   - Refinaria (processar recursos)
   - Fábrica (criar componentes)
   - Laboratório (pesquisar tecnologias)

3. **Infraestrutura**

   - Geradores de Energia (solar, nuclear, geotérmica)
   - Sistemas de Suporte à Vida (oxigênio, água)
   - Hangares (armazenar veículos)

4. **Armazenamento**
   - Silos de Recursos
   - Tanques de Combustível
   - Bancos de Dados

### Sistema de Exploração

#### Tipos de Locais

1. **Planetas Rochosos**

   - Rico em metais
   - Possibilidade de mineração subterrânea
   - Gravidade variável

2. **Planetas Gasosos (Luas)**

   - Recursos energéticos
   - Estações orbitais
   - Perigos atmosféricos

3. **Asteroides**

   - Concentração alta de recursos raros
   - Baixa gravidade
   - Facilidade de mineração

4. **Detritos Espaciais**
   - Tecnologias alienígenas
   - Componentes pré-fabricados
   - Mistérios para desvendar

### Sistema de Progressão

#### Árvore de Tecnologia

1. **Tier 1 - Sobrevivência Básica**

   - Extratores de Recursos Básicos
   - Geradores Solares
   - Estruturas Simples

2. **Tier 2 - Eficiência**

   - Refinarias Avançadas
   - Sistemas de Automação
   - Veículos de Exploração

3. **Tier 3 - Expansão**

   - Tecnologias de Longo Alcance
   - Sistemas de Teletransporte
   - Mega Estruturas

4. **Tier 4 - Transcendência**
   - Tecnologias Alienígenas
   - Manipulação Espacial
   - Projetos Monumentais

---

## 🎨 Design Visual

### Estilo Artístico

- **Pixel Art**: 16-bit inspirado, moderno e limpo
- **Paleta de Cores**:
  - Primária: Azul escuro (#1a1a2e), Azul médio (#16213e), Azul claro (#0f3460)
  - Secundária: Roxo (#533483), Rosa (#f39c12), Branco (#ecf0f1)
  - Acentos: Verde neon (#2ecc71), Vermelho (#e74c3c)

### Interface do Usuário

- **HUD Minimalista**: Informações essenciais sem poluir a tela
- **Menus Contextuais**: Aparecem quando necessário
- **Iconografia Clara**: Símbolos intuitivos para ações e recursos
- **Responsive**: Adaptável a diferentes resoluções

### Animações

- **Movimento Suave**: Easing natural para transições
- **Feedback Visual**: Animações para ações do jogador
- **Partículas**: Efeitos para recursos, explosões, construção
- **Ambiente**: Animações sutis para criar vida no mundo

---

## 🔊 Design de Áudio

### Música

- **Ambiente Espacial**: Tracks ambientes longos e contemplativos
- **Temas Dinâmicos**: Música que se adapta às ações do jogador
- **Estilos**: Synthwave, ambient, eletrônico minimalista

### Efeitos Sonoros

- **Ambiente**: Sons do espaço, estações espaciais
- **Interação**: Feedback sonoro para ações do jogador
- **Alerta**: Sons distintivos para eventos importantes
- **Construção**: Sons satisfatórios para building

---

## 🕹️ Controles e Interface

### Controles de Teclado/Mouse

- **WASD**: Movimento básico
- **Mouse**: Mira e interação
- **Scroll**: Zoom in/out
- **Espaço**: Ação principal/confirmação
- **Esc**: Menu/pausar
- **Tab**: Alternar interfaces
- **Shift**: Correr/acelerar
- **Ctrl**: Ações secundárias

### Interface Mobile (Futuro)

- **Touch Controls**: Joystick virtual para movimento
- **Gestos**: Pinch para zoom, swipe para navegação
- **Botões Adaptativos**: Interface que se adapta ao contexto

---

## 📈 Progressão e Retenção

### Loops de Gameplay

#### Loop Principal (15-30 minutos)

1. Explorar novo local
2. Coletar recursos
3. Retornar à base
4. Processar recursos
5. Construir/pesquisar
6. Planejar próxima exploração

#### Loop Secundário (2-5 horas)

1. Estabelecer nova base
2. Desenvolver infraestrutura
3. Pesquisar tecnologias
4. Expandir capacidades
5. Descobrir novos desafios

#### Loop de Longo Prazo (10-50 horas)

1. Dominar sistema solar
2. Desbloquear tecnologias finais
3. Construir mega projetos
4. Descobrir mistérios profundos
5. Transcender limitações iniciais

### Sistema de Conquistas

- **Explorador**: Descobrir X locais
- **Construtor**: Construir X estruturas
- **Cientista**: Pesquisar X tecnologias
- **Sobrevivente**: Sobreviver X tempo
- **Colecionador**: Encontrar todos os recursos raros

---

## 🚀 Implementação Técnica

### Tecnologias Sugeridas

- **Frontend**: HTML5 Canvas ou WebGL
- **Linguagem**: JavaScript/TypeScript
- **Framework**: Phaser.js ou engine custom
- **Armazenamento**: LocalStorage para saves
- **Futuro**: WebSockets para multiplayer

### Arquitetura de Código

- **Modular**: Sistemas independentes e reutilizáveis
- **ECS**: Entity-Component-System para flexibilidade
- **State Management**: Sistema de estados claro
- **Performance**: Otimizado para 60fps constante

### Requisitos de Performance

- **60 FPS**: Em dispositivos médios
- **Carregamento Rápido**: < 5 segundos inicial
- **Responsivo**: Suporte a diferentes resoluções
- **Bateria**: Eficiente em dispositivos móveis

---

## 🎯 Roadmap de Desenvolvimento

### Fase 1 - Protótipo (2-3 semanas)

- [ ] Sistema básico de movimento
- [ ] Construção simples (3-4 estruturas)
- [ ] Coleta de recursos básica
- [ ] Interface fundamental
- [ ] Save/Load básico

### Fase 2 - Alpha (2-3 meses)

- [ ] Sistema de exploração completo
- [ ] 15-20 estruturas diferentes
- [ ] Árvore de tecnologia básica
- [ ] Múltiplos tipos de planetas
- [ ] Sistema de eventos simples

### Fase 3 - Beta (4-6 meses)

- [ ] Balanceamento completo
- [ ] Arte e áudio finalizados
- [ ] Sistema de conquistas
- [ ] Tutoriais e onboarding
- [ ] Otimizações de performance

### Fase 4 - Release (6-8 meses)

- [ ] Polish final
- [ ] Testes extensivos
- [ ] Documentação completa
- [ ] Estratégia de lançamento
- [ ] Suporte pós-lançamento

---

## 📊 Métricas de Sucesso

### KPIs Principais

- **Retenção**: D1 > 70%, D7 > 40%, D30 > 20%
- **Sessão**: Tempo médio > 20 minutos
- **Progressão**: 80% completam tutorial
- **Engajamento**: 60% retornam após primeira sessão

### Métricas de Qualidade

- **Performance**: 60fps em 90% dos dispositivos
- **Bugs**: < 1 bug crítico por 1000 sessões
- **Carregamento**: Tempo inicial < 5 segundos
- **Satisfação**: Rating > 4.5/5.0

---

## 🔮 Visão de Futuro

### Expansões Planejadas

1. **Multiplayer**: Cooperação e competição
2. **Campanhas**: Modo história estruturado
3. **Mod Support**: Criação de conteúdo pela comunidade
4. **Mobile**: Versão otimizada para dispositivos móveis
5. **VR**: Experiência imersiva em realidade virtual

### Potencial Comercial

- **Modelo Freemium**: Jogo gratuito com expansões pagas
- **Cosmetics**: Skins e personalizações
- **Season Pass**: Conteúdo regular pós-lançamento
- **Merchandising**: Produtos físicos para fãs

---

**Documento criado em**: 8 de Novembro de 2025  
**Versão**: 1.0  
**Status**: Documento inicial aprovado para desenvolvimento

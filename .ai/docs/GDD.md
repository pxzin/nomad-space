# Game Design Document (GDD)

## Nomad Space - Jogo Web 2D de Exploração Espacial e Construção de Base

---

## 📋 Informações Básicas

### Título do Jogo

**Nomad Space**

### Gênero

- **Principal**: Gestão de Nave-Mãe (Mobile Base Management)
- **Secundários**: Exploração Espacial 2D, Progressão Tecnológica, Aventura
- **Modos Futuros**: Construção de Base Estática (Sandbox), Survival Hardcore

### Plataforma

- Web Browser (HTML5)
- Desktop (Chrome, Firefox, Safari, Edge)

### Público-Alvo

- **Idade**: 12+ anos
- **Perfil**: Jogadores que gostam de progressão, exploração e gerenciamento.
- **Interesses**: Ficção científica, naves espaciais, automação, descoberta.

---

## 🎯 Visão Geral do Jogo

### Conceito Principal

O jogador comanda uma **Nave-Mãe**, uma base móvel que serve como seu lar e principal ferramenta de exploração. O objetivo é viajar por sistemas estelares desconhecidos, aprimorando a nave através de um sistema de módulos, pesquisando novas tecnologias e descobrindo os segredos do universo. O foco inicial do desenvolvimento será exclusivamente na experiência da Nave-Mãe.

### Pilares de Design

1.  **Progressão da Nave**: A Nave-Mãe é o centro de tudo. Aprimorá-la é o principal objetivo.
2.  **Exploração com Propósito**: Cada viagem tem o objetivo de encontrar recursos ou dados para o próximo aprimoramento.
3.  **Gerenciamento Estratégico**: Balancear energia, suporte de vida e capacidade de produção através de módulos.
4.  **Descoberta Contínua**: O universo está cheio de tecnologias, eventos e histórias a serem encontrados.

### Tom e Atmosfera

- **Visual**: Pixel art minimalista com paleta espacial (azuis, roxos, brancos)
- **Sonoro**: Ambient espacial com efeitos sintéticos suaves
- **Narrativa**: Misteriosa e contemplativa, focada na jornada e na evolução da sua nave.

---

## 🎮 Mecânicas de Jogo

### Mecânicas Principais

#### 1. Controle Duplo de Naves

- **Duas Entidades**: O jogador gerencia duas naves: a **Nave-Mãe** (lenta, pesada, foco em produção e pesquisa) e a **Nave de Exploração** (rápida, ágil, foco em coleta e descoberta).
- **Troca de Foco**: O jogador pode alternar o controle e a visão da câmera entre as duas naves a qualquer momento (com uma tecla de atalho).
- **Lançamento e Destruição**: A Nave de Exploração é lançada a partir de um módulo da Nave-Mãe. Se for destruída, uma nova precisa ser fabricada, consumindo recursos.
- **Autonomia da Nave-Mãe**: Enquanto o jogador controla a Nave de Exploração, a Nave-Mãe pode ser instruída a manter um movimento lento e constante. Seus sistemas de defesa (escudos, torretas) funcionarão automaticamente se for atacada.
- **Comando Remoto**: Ao controlar a Nave de Exploração, o jogador pode usar o clique direito do mouse para definir um ponto de destino para a Nave-Mãe. Um efeito visual de "ping" marcará o local.
- **Recolher Naves**: Ao controlar a Nave-Mãe, um botão na interface permite chamar a Nave de Exploração de volta. A ação deve ter um feedback visual no botão.

#### 2. Gerenciamento da Nave-Mãe (Base Móvel)

- **Sistema de Slots**: A nave possui um número limitado de slots onde o jogador pode instalar e aprimorar módulos. A gestão desses slots é um desafio estratégico.
- **Categorias de Módulos**:
    - **Produção/Pesquisa**: Refinarias, Laboratórios, Fábricas, Armazenamento. Essenciais para a progressão tecnológica.
    - **Exploração/Movimento**: Motores de dobra, Scanners, Propulsores. Permitem alcançar novos locais.
    - **Sobrevivência/Suporte**: Geradores de Energia, Sistemas de Oxigênio, Dormitórios. Mantêm a nave e a tripulação operacionais.
    - **Defesa/Combate**: Escudos, Armas a laser, Sistemas de Reparo. Protegem contra perigos espaciais.
- **Ciclo de Aprimoramento**: O ciclo principal é: **Aprimorar -> Pesquisar -> Explorar -> Coletar -> Repetir**.

#### 3. Exploração Espacial

- **Mapa Estelar**: Navegação através de um mapa de sistemas estelares, com informações reveladas por scanners.
- **Pontos de Interesse**: Planetas, asteroides, anomalias e naves abandonadas que podem ser investigados para obter recursos e dados.
- **Eventos Dinâmicos**: Chuvas de meteoros, tempestades solares e outros eventos que afetam a navegação e exigem resposta do jogador.
- **Obstáculos**: O cenário contém objetos não-coletáveis que bloqueiam o movimento das naves (sem causar dano, inicialmente).
    - **Detritos Espaciais**: Pedaços menores de metal e satélites antigos.
    - **Asteroides Estéreis**: Rochas espaciais maiores e sem recursos.
- **Limites do Cenário**: O mapa possui um limite final. Antes de atingi-lo, a nave entra em uma "área de buffer" que a desacelera progressivamente, desencorajando o jogador a colidir com a "parede invisível". **Justificativa Narrativa**: O espaço se torna mais denso nas extremidades do mapa, dificultando a navegação.

#### 4. Gerenciamento de Recursos

- **Coleta**: A coleta de recursos é feita de duas maneiras distintas:
    - **Coleta Ativa (Nave de Exploração)**: O jogador usa a Nave de Exploração para mirar e clicar em alvos (ex: asteroides). Um "laser de mineração" é ativado, coletando o recurso após um curto período. Este método é rápido e preciso.
    - **Coleta Passiva (Nave-Mãe)**: A Nave-Mãe coleta automaticamente quaisquer recursos que entrem em seu raio de alcance. Módulos futuros podem aumentar esse raio e a eficiência da coleta (ex: múltiplos lasers passivos).
- **Processamento**: Recursos brutos são processados em materiais úteis nas refinarias da Nave-Mãe.
- **Recursos Iniciais**:
    - **Ferro**: Material de construção básico para estruturas e cascos.
    - **Silício**: Usado em eletrônicos, computadores e módulos de pesquisa.
    - **Hidrogênio**: Combustível para naves e sistemas de energia.

#### 5. Sistema de Tecnologia

- **Árvore de Pesquisa**: Desbloquear novos módulos, aprimoramentos e habilidades através dos Laboratórios da nave.
- **Dados de Pesquisa**: Um recurso especial encontrado em anomalias ou locais raros, necessário para tecnologias avançadas.

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
- **Perspectiva**: Top-down (visão de cima)
- **Background**: Efeito Parallax para simular uma galáxia infinita e dinâmica.
- **Paleta de Cores**:
  - Primária: Azul escuro (#1a1a2e), Azul médio (#16213e), Azul claro (#0f3460)
  - Secundária: Roxo (#533483), Rosa (#f39c12), Branco (#ecf0f1)
  - Acentos: Verde neon (#2ecc71), Vermelho (#e74c3c)

### Interface do Usuário

- **HUD Minimalista**: Informações essenciais sem poluir a tela. O canto superior direito será reservado para a contagem de recursos (ícone + quantidade).
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

- **Controles Principais**: Teclado e Mouse.
- **Movimentação da Nave**: A nave pode se deslocar em todas as direções.
- **Câmera**: Inicialmente, a câmera acompanha a nave. Futuramente, haverá um modo de câmera livre para visualização do cenário sem deslocamento da nave.
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

### Tecnologias Definidas

- **Engine**: Phaser
- **Frontend/UI**: Svelte (com preferência pelo rune mode)
- **Servidor/Estrutura**: SvelteKit
- **Estilização**: UnoCSS
- **Linguagem**: TypeScript
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

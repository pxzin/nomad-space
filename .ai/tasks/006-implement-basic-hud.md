# Tarefa: 006 - Implementar HUD Básico de Recursos

**Para**: Claude (Programador)
**De**: Copilot (Organizador)
**Status**: Concluído ✅
**Depende de**: Tarefa 005

## 🎯 Objetivo
Criar uma interface de usuário (HUD) básica para exibir a contagem dos três recursos iniciais: Ferro, Silício e Hidrogênio.

## 📋 Passos de Execução

1.  **Criar um Repositório de Dados**:
    -   Crie um local central e de fácil acesso para armazenar o estado dos recursos do jogador (ex: um objeto global, um Singleton, ou usando o `DataManager` do Phaser).
    -   Inicialize os recursos: `recursos = { ferro: 0, silicio: 0, hidrogenio: 0 }`.

2.  **Criar a Cena do HUD**:
    -   Crie uma nova cena no Phaser exclusivamente para o HUD (ex: `HUDScene.ts`).
    -   Configure esta cena para rodar em paralelo com a cena principal do jogo (`MainScene`). Isso garante que o HUD permaneça fixo na tela, independente do movimento da câmera no jogo.

3.  **Exibir os Recursos**:
    -   Na `HUDScene`, adicione objetos de texto no canto superior direito da tela para cada um dos três recursos.
    -   O formato deve ser "Nome: Quantidade" (ex: "Ferro: 0").

4.  **Atualizar o HUD**:
    -   No método `update` da `HUDScene`, leia os valores do repositório de dados de recursos e atualize o conteúdo dos objetos de texto correspondentes a cada frame.

5.  **Integrar com a Coleta**:
    -   **Modifique a lógica da Tarefa 005**: Em vez de apenas logar no console, a coleta de recursos agora deve incrementar o valor correspondente no repositório de dados central.
    -   Por exemplo, ao coletar um asteroide de ferro, o código deve chamar algo como `recursos.ferro += 10;`.

## ✅ Critérios de Aceitação
- ✅ Um HUD é visível no canto superior direito da tela do jogo.
- ✅ O HUD exibe a contagem de Ferro, Silício e Hidrogênio, inicializada em 0.
- ✅ Ao coletar um recurso no jogo (conforme a mecânica da Tarefa 005), a contagem correspondente no HUD é atualizada em tempo real.
- ✅ O HUD permanece em uma posição fixa na tela, mesmo quando a câmera do jogo se move.

## 🔨 Implementação Realizada

### Arquivos Criados
- `src/lib/game/managers/ResourceManager.ts` - Gerenciador central de recursos
- `src/lib/game/scenes/HUDScene.ts` - Cena do HUD

### Arquivos Modificados
- `src/lib/game/entities/Asteroid.ts` - Adicionados tipos e quantidades de recursos
- `src/lib/game/scenes/MainScene.ts` - Integração com ResourceManager
- `src/lib/game/config.ts` - HUDScene adicionada às cenas

### Funcionalidades Implementadas

#### 1. **ResourceManager** 🎮
Sistema centralizado de gerenciamento de recursos usando Singleton pattern:
- **Tipos de recursos**: Enum `ResourceType` (IRON, SILICON, HYDROGEN)
- **Interface Resources**: `{ iron, silicon, hydrogen }`
- **Métodos**:
  - `getResources()`: Retorna cópia dos recursos atuais
  - `getResource(type)`: Retorna quantidade de um recurso específico
  - `addResource(type, amount)`: Adiciona recursos
  - `removeResource(type, amount)`: Remove recursos (para crafting futuro)
  - `hasEnough(type, amount)`: Verifica se tem recursos suficientes
  - `onChange(callback)`: Sistema reativo para notificar mudanças
  - `reset()`: Reseta todos os recursos (debug/testes)

#### 2. **HUDScene** 📊
Cena dedicada ao HUD que roda em paralelo com MainScene:
- **Localização**: Canto superior direito
- **Elementos**:
  - Título "📦 RECURSOS" em verde
  - 🔩 Ferro com contador
  - 💎 Silício com contador
  - ⚗️ Hidrogênio com contador
- **Estilo**: Fonte Fira Code, fundo escuro semi-transparente
- **Atualização**: Reativa via ResourceManager.onChange()
- **Posição fixa**: Não segue a câmera do jogo

#### 3. **Sistema de Tipos de Asteroides** ☄️
Asteroides agora têm tipos de recursos com cores distintas:
- **Ferro (Iron)**: Cor marrom (#8b7355)
- **Silício (Silicon)**: Cor roxa/azulada (#7b68ee)
- **Hidrogênio (Hydrogen)**: Cor azul claro (#4682b4)
- **Quantidade**: Baseada no tamanho (12-20 recursos por asteroide)
- **Tipo**: Aleatório se não especificado no construtor

#### 4. **Integração com Coleta** 🔄
Sistema de coleta agora integrado com ResourceManager:
- **Coleta Passiva** (Nave-Mãe):
  - Adiciona recursos via `resourceManager.addResource()`
  - Console log mostra tipo e quantidade coletada
- **Coleta Ativa** (Nave de Exploração):
  - Mesmo sistema de adição de recursos
  - Console log detalhado por tipo
- **HUD atualiza automaticamente**: Via sistema reativo do ResourceManager

### Fluxo de Dados

```
Asteroide coletado
    ↓
ResourceManager.addResource(type, amount)
    ↓
ResourceManager.notifyListeners()
    ↓
HUDScene.updateResourceDisplay()
    ↓
Texto atualizado na tela
```

### Resultado

O jogo agora possui um sistema completo de economia de recursos:
- **3 tipos de recursos** visualmente distintos (cores diferentes)
- **HUD sempre visível** no canto superior direito
- **Atualizações em tempo real** quando recursos são coletados
- **Sistema preparado** para futuras mecânicas de crafting e construção
- **Gerenciamento centralizado** via ResourceManager Singleton

Os jogadores podem agora ver exatamente quantos recursos possuem e coletar diferentes tipos de asteroides para acumular Ferro, Silício e Hidrogênio.

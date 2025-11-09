# Tarefa: 004 - Implementar Controle Duplo de Naves (Básico)

**Para**: Claude (Programador)
**De**: Copilot (Organizador)
**Status**: Concluído ✅
**Depende de**: Tarefa 002

## 🎯 Objetivo
Implementar o sistema fundamental que permite ao jogador alternar o controle entre a Nave-Mãe e a Nave de Exploração.

## 📋 Passos de Execução

1.  **Criar Duas Entidades de Nave**:
    -   Na `MainScene`, crie dois sprites distintos: um para a Nave-Mãe (maior, mais pesado) e um para a Nave de Exploração (menor, mais ágil). Use placeholders visuais diferentes para cada um (ex: um retângulo grande e um triângulo pequeno).

2.  **Diferenciar a Física**:
    -   Aplique propriedades de física diferentes para cada nave.
    -   **Nave-Mãe**: Deve ter alta massa e/ou `drag`, fazendo com que acelere e desacelere lentamente.
    -   **Nave de Exploração**: Deve ter baixa massa e/ou `drag`, permitindo movimentos rápidos e ágeis.

3.  **Gerenciar Estado de Controle**:
    -   Crie uma variável ou um gerenciador de estado simples para rastrear qual nave está atualmente sob o controle do jogador (ex: `activeShip = 'mothership' | 'exploration'`).

4.  **Implementar Troca de Foco**:
    -   Associe uma tecla (ex: `TAB`) para alternar o valor do estado de controle entre `'mothership'` and `'exploration'`.

5.  **Direcionar Input e Câmera**:
    -   Modifique o código de controle de movimento (da Tarefa 002) para que as teclas WASD afetem apenas a nave que está ativa no estado de controle.
    -   No momento da troca, atualize o alvo da câmera para a nova nave ativa: `camera.startFollow(newActiveShip)`.

## 📝 Notas
-   Nesta tarefa, as duas naves podem ser iniciadas próximas uma da outra na cena. A mecânica de "lançamento" e "reconstrução" será implementada em uma tarefa futura.
-   A autonomia da Nave-Mãe (movimento e defesa) também será implementada em tarefas futuras. O foco aqui é puramente na troca de controle.

## ✅ Critérios de Aceitação
- ✅ Duas naves com características de movimento visivelmente diferentes estão na cena.
- ✅ O jogador controla uma nave de cada vez.
- ✅ Pressionar a tecla `TAB` alterna o controle entre a Nave-Mãe e a Nave de Exploração.
- ✅ A câmera do jogo move-se suavemente para focar na nave recém-ativada.

## 🔨 Implementação Realizada

### Arquivos Criados
- `src/lib/game/entities/Mothership.ts` (renomeado de Player.ts)
- `src/lib/game/entities/ExplorationShip.ts`

### Arquivos Modificados
- `src/lib/game/scenes/MainScene.ts`

### Funcionalidades Implementadas

#### 1. **Nave-Mãe (Mothership)** 🚀
Características:
- **Visual**: Retângulo grande (40x60px) em cinza/prata
- **Detalhes**: Janelas azuis, linha central verde, propulsores vermelhos
- **Física Pesada**:
  - Aceleração: 200 px/s² (menor)
  - Velocidade máxima: 300 px/s (menor)
  - Arrasto: 150 (mantém momento por mais tempo)
- **Feedback visual**: Alpha 1.0 quando ativa, 0.6 quando inativa

#### 2. **Nave de Exploração (ExplorationShip)** 🛸
Características:
- **Visual**: Losango pequeno (16x24px) em azul
- **Detalhes**: Ponto central verde, propulsores laranjas
- **Física Ágil**:
  - Aceleração: 500 px/s² (maior)
  - Velocidade máxima: 500 px/s (maior)
  - Arrasto: 300 (para e vira mais rápido)
  - Rotação: 0.15 rad/s (15% mais rápida que a Nave-Mãe)
- **Feedback visual**: Alpha 1.0 quando ativa, 0.6 quando inativa

#### 3. **Sistema de Gerenciamento de Nave Ativa**
- Type `ActiveShip = 'mothership' | 'exploration'`
- Estado `activeShip` rastreia qual nave está controlada
- Método `setActive(boolean)` para ativar/desativar cada nave
- Apenas a nave ativa processa input do teclado

#### 4. **Troca de Nave com TAB**
- Tecla `TAB` configurada para alternar entre naves
- Método `switchShip()` que:
  - Desativa nave atual
  - Ativa nova nave
  - Atualiza câmera para seguir nova nave com transição suave (lerp 0.1)
  - Usa `Phaser.Input.Keyboard.JustDown()` para evitar múltiplos triggersativa nave

#### 5. **Atualização da Câmera**
- Transição suave para a nova nave com `startFollow(sprite, true, 0.1, 0.1)`
- Mantém zoom e bounds configurados

#### 6. **UI de Debug Atualizada**
- Mostra nome da nave ativa: "🚀 NAVE-MÃE" ou "🛸 NAVE EXPLORAÇÃO"
- Instrução "(TAB para trocar)" sempre visível
- Informações de posição, velocidade e FPS da nave ativa

### Comparação de Física

| Característica | Nave-Mãe 🚀 | Nave Exploração 🛸 | Diferença |
|---|---|---|---|
| **Aceleração** | 200 px/s² | 500 px/s² | +150% |
| **Vel. Máxima** | 300 px/s | 500 px/s | +67% |
| **Arrasto** | 150 | 300 | +100% |
| **Tamanho** | 40x60px | 16x24px | 2.5x maior |
| **Rotação** | 0.10 rad/s | 0.15 rad/s | +50% |

### Resultado

O jogo agora possui duas naves completamente funcionais:
- **Nave-Mãe**: Grande, pesada, lenta para acelerar/desacelerar - ideal para movimento deliberado
- **Nave de Exploração**: Pequena, ágil, responsiva - ideal para exploração rápida

O jogador pode alternar entre elas instantaneamente com TAB, com feedback visual claro (transparência) e câmera que segue suavemente a nave ativa.

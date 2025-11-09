# Tarefa: 007 - Implementar Comandos Remotos de Naves

**Para**: Claude (Programador)
**De**: Copilot (Organizador)
**Status**: Concluído ✅
**Depende de**: Tarefa 004

## 🎯 Objetivo
Implementar as mecânicas de comando remoto: mover a Nave-Mãe via clique direito e recolher a Nave de Exploração via um botão de HUD.

## 📋 Passos de Execução

1.  **Implementar Movimento Remoto da Nave-Mãe**:
    -   No `update` da cena principal, verifique se o `activeShip` é a Nave de Exploração.
    -   Se for, adicione um listener para o clique direito do mouse (`pointerdown` com `event.rightButton`).
    -   Ao receber o clique direito, guarde as coordenadas do ponteiro em uma variável `mothershipTargetPosition`.
    -   Crie e execute a animação do "ping" de destino (`move_to_marker_effect`) nessas coordenadas.
    -   Implemente uma IA de movimento simples para a Nave-Mãe. Use `this.physics.moveTo(mothership, mothershipTargetPosition, speed)` para movê-la em direção ao alvo. A velocidade (`speed`) deve ser baixa, conforme o GDD.
    -   Faça a Nave-Mãe parar quando chegar perto do destino.

2.  **Implementar Botão de Recolher**:
    -   Na `HUDScene`, adicione o ícone do botão "Recolher" (`recall_button_icon`).
    -   Torne o botão visível apenas quando o `activeShip` for a Nave-Mãe.
    -   Adicione um evento de clique ao botão.
    -   No clique:
        -   Execute um efeito visual de feedback no botão.
        -   Defina o alvo da Nave de Exploração para ser a própria Nave-Mãe.
        -   Use a mesma lógica de `moveTo` para fazer a Nave de Exploração se mover em direção à Nave-Mãe.

## 📝 Notas
-   A IA de movimento pode ser simples por enquanto. O objetivo é ter a funcionalidade principal, não uma navegação de pathfinding complexa.
-   Lembre-se de parar o movimento das naves quando elas atingirem seus respectivos alvos para evitar que fiquem "tremendo".

## ✅ Critérios de Aceitação
- ✅ Ao controlar a Nave de Exploração, o clique direito move a Nave-Mãe para o ponto clicado.
- ✅ Um "ping" visual aparece no local do clique direito.
- ✅ Um botão "Recolher" aparece no HUD apenas quando se controla a Nave-Mãe.
- ✅ Clicar no botão faz a Nave de Exploração voar de volta para a Nave-Mãe.

## 🔨 Implementação Realizada

### Arquivos Modificados
- [src/lib/game/entities/Mothership.ts](src/lib/game/entities/Mothership.ts) - Sistema de movimento automático
- [src/lib/game/entities/ExplorationShip.ts](src/lib/game/entities/ExplorationShip.ts) - Sistema de movimento automático
- [src/lib/game/scenes/MainScene.ts](src/lib/game/scenes/MainScene.ts) - Comandos remotos e efeito de ping
- [src/lib/game/scenes/HUDScene.ts](src/lib/game/scenes/HUDScene.ts) - Botão de recolher

### Funcionalidades Implementadas

#### 1. **Sistema de Movimento Automático** 🎯
Ambas as naves agora possuem capacidade de movimento automático:

**Mothership.ts**:
- `setTargetPosition(x, y)`: Define um destino para movimento automático
- `cancelAutoMovement()`: Cancela o movimento em andamento
- `isAutoMoving()`: Verifica se está em movimento automático
- `AUTO_MOVE_SPEED = 150`: Velocidade do movimento automático (lenta, conforme GDD)
- `ARRIVAL_THRESHOLD = 10`: Distância mínima para considerar chegada

**ExplorationShip.ts**:
- Mesmos métodos que a Nave-Mãe
- `AUTO_MOVE_SPEED = 250`: Velocidade maior (mais ágil)
- `ARRIVAL_THRESHOLD = 20`: Margem maior de chegada

**Lógica de Movimento**:
```typescript
if (this.targetPosition) {
    const distance = Phaser.Math.Distance.Between(...)
    if (distance < this.ARRIVAL_THRESHOLD) {
        this.targetPosition = null;
        body.setVelocity(0, 0);
    } else {
        this.scene.physics.moveTo(this.sprite, targetX, targetY, speed)
    }
}
```

#### 2. **Comando Remoto da Nave-Mãe** 🎮
**MainScene.ts** - Clique direito do mouse:
- Detecta clique direito (`pointer.rightButtonDown()`)
- Funciona apenas quando Nave de Exploração está ativa
- Converte coordenadas do clique para posição do mundo (`pointer.worldX/Y`)
- Chama `mothership.setTargetPosition(x, y)`
- Console log: `🎯 Nave-Mãe comandada para ir até (x, y)`

#### 3. **Efeito Visual de Ping** 💫
**Método `createMoveToPing(x, y)`**:
- Cria círculo verde (`0x2ecc71`) no ponto clicado
- Raio inicial: 30px
- Animação com Phaser Tweens:
  - Expande para 60px
  - Fade out (alpha 0)
  - Duração: 1000ms
  - Easing: `Cubic.Out`
- Auto-destruição após animação

#### 4. **Botão de Recolher** 🔙
**HUDScene.ts** - Botão interativo:

**Visual**:
- Localização: Centro inferior da tela
- Tamanho: 180x50px
- Cor: Azul (`0x3498db`)
- Texto: "🔙 RECOLHER NAVE"
- Fonte: Fira Code, 16px, bold

**Interatividade**:
- Hover: Escurece para `0x2980b9`
- Clique: Escurece mais (`0x1c638e`) + animação de escala
- Emite evento: `recall-exploration-ship`

**Visibilidade**:
- Método `updateRecallButtonVisibility(activeShip)`
- Visível apenas quando `activeShip === 'mothership'`
- Atualizado automaticamente ao trocar de nave (TAB)

#### 5. **Lógica de Retorno** 🔄
**MainScene.ts** - Método `recallExplorationShip()`:
```typescript
private recallExplorationShip(): void {
    const mothershipPos = this.mothership.getPosition();
    this.explorationShip.setTargetPosition(mothershipPos.x, mothershipPos.y);
    console.log('🔙 Nave de Exploração retornando à Nave-Mãe');
}
```

**Integração**:
- Listener de evento da HUDScene
- Obtém posição atual da Nave-Mãe
- Define como alvo da Nave de Exploração
- Nave retorna automaticamente usando sistema de movimento

### Fluxo de Uso

**Comando Remoto da Nave-Mãe**:
1. Jogador controla Nave de Exploração (TAB)
2. Clica com botão direito no mapa
3. Ping verde aparece e expande
4. Nave-Mãe se move automaticamente para o ponto
5. Para ao chegar perto do destino

**Recolher Nave de Exploração**:
1. Jogador troca para Nave-Mãe (TAB)
2. Botão "🔙 RECOLHER NAVE" aparece na tela
3. Jogador clica no botão
4. Nave de Exploração retorna automaticamente
5. Para ao chegar perto da Nave-Mãe

### Características Técnicas

**Prioridade de Controles**:
- Movimento automático tem prioridade sobre controle manual
- Impede controle WASD durante movimento automático
- Garante que a nave chegue ao destino sem interferência

**Parada Suave**:
- Usa `ARRIVAL_THRESHOLD` para evitar "tremor"
- Zera velocidade ao chegar (`setVelocity(0, 0)`)
- Limpa alvo automaticamente

**Feedback Visual e Sonoro**:
- ✅ Ping visual no destino (1 segundo de duração)
- ✅ Botão com hover/click effects
- ✅ Console logs para debug
- ✅ Animação de clique no botão

**Performance**:
- Ping único (destrói anterior se existir)
- Animações otimizadas com Tweens
- Cálculo de distância apenas quando necessário

### Resultado

O jogo agora possui um sistema completo de comandos remotos:
- **Estratégia avançada**: Jogador pode posicionar Nave-Mãe enquanto explora
- **Qualidade de vida**: Botão de retorno evita navegação manual
- **Feedback claro**: Efeitos visuais indicam ações executadas
- **Controle fluido**: Sistema não interfere com controles normais

Os comandos remotos permitem gameplay mais dinâmico e estratégico, alinhado com a visão do GDD de um jogo de exploração espacial e gestão.

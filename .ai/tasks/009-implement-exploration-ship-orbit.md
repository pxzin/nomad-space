# Tarefa: 009 - Implementar Órbita da Nave de Exploração

**Para**: Claude (Programador)
**De**: Copilot (Organizador)
**Status**: Concluído ✅
**Depende de**: Tarefa 007

## 🎯 Objetivo
Fazer com que a Nave de Exploração entre em uma órbita estável ao redor da Nave-Mãe após ser recolhida.

## 📋 Passos de Execução

1.  **Detectar Chegada**:
    -   Na lógica de movimento da Tarefa 007, quando a Nave de Exploração se aproxima da Nave-Mãe (atinge o seu "alvo"), em vez de parar, ela deve mudar para um novo estado, como `isOrbiting`.

2.  **Implementar Lógica de Órbita**:
    -   Para cada nave de exploração, armazene um `orbitAngle` e defina um `orbitRadius` (ex: 150 pixels) e uma `orbitSpeed` (ex: 0.02 radianos/frame).
    -   No método `update` da cena, se o estado da nave de exploração for `isOrbiting`:
        -   Incremente seu `orbitAngle` pela `orbitSpeed`.
        -   Calcule a nova posição orbital em relação à Nave-Mãe:
            -   `targetX = mothership.x + orbitRadius * Math.cos(orbitAngle)`
            -   `targetY = mothership.y + orbitRadius * Math.sin(orbitAngle)`
        -   Atualize a posição da nave de exploração para `(targetX, targetY)`.

3.  **Sair da Órbita**:
    -   Quando o jogador pressionar a tecla `TAB` (da Tarefa 004) para assumir o controle da Nave de Exploração, o estado `isOrbiting` deve ser desativado, e a nave deve parar de orbitar, passando a seguir os comandos do jogador.

## 📝 Notas
-   A transição do movimento de "recolher" para o de "orbitar" deve ser suave.
-   A lógica deve, futuramente, suportar múltiplas naves orbitando. Uma forma de fazer isso é garantir que cada nave tenha seu próprio `orbitAngle`.

## ✅ Critérios de Aceitação
- ✅ Após ser recolhida, a Nave de Exploração começa a orbitar a Nave-Mãe.
- ✅ A órbita é circular e a uma distância constante.
- ✅ Ao assumir o controle da Nave de Exploração, a órbita é interrompida e o jogador tem controle total.

## 🔨 Implementação Realizada

### Arquivos Modificados
- [src/lib/game/entities/ExplorationShip.ts](../../src/lib/game/entities/ExplorationShip.ts) - Sistema de órbita
- [src/lib/game/scenes/MainScene.ts](../../src/lib/game/scenes/MainScene.ts) - Detecção e controle da órbita

### Funcionalidades Implementadas

#### 1. **Sistema de Órbita na ExplorationShip** 🌀

**Propriedades adicionadas**:
```typescript
private isOrbiting: boolean = false;
private orbitAngle: number = 0;
private readonly ORBIT_RADIUS = 100;
private readonly ORBIT_SPEED = 0.02;
private orbitTarget: { x: number; y: number } | null = null;
```

**Métodos de controle**:
- `startOrbiting(centerX, centerY, startAngle?)`: Inicia órbita ao redor de um ponto
  - Calcula ângulo inicial baseado na posição atual se não especificado
  - Define o centro da órbita (posição da Nave-Mãe)
  - Log: `🌀 Nave de Exploração iniciou órbita`

- `stopOrbiting()`: Para a órbita
  - Limpa estado de órbita
  - Log: `⏹️ Órbita da Nave de Exploração interrompida`

- `getIsOrbiting()`: Verifica se está orbitando

- `updateOrbitCenter(centerX, centerY)`: Atualiza centro da órbita
  - Usado para seguir a Nave-Mãe quando ela se move

#### 2. **Lógica de Órbita no Update Loop** 🔄

**Sistema de prioridades** no método `update()`:
1. **PRIORIDADE 1 - Órbita**: Se `isOrbiting`:
   - Incrementa `orbitAngle` por `ORBIT_SPEED` (0.02 rad/frame)
   - Normaliza ângulo (mantém entre 0 e 2π)
   - Calcula posição orbital: `x = centerX + radius * cos(angle)`
   - Move nave diretamente para posição (sem física)
   - Zera velocidade

2. **PRIORIDADE 2 - Movimento Automático**: Se `targetPosition`:
   - Move em direção ao alvo
   - Quando distância < `ARRIVAL_THRESHOLD` (80px): para
   - Órbita será iniciada pela MainScene

3. **PRIORIDADE 3 - Controle Manual**: Se `isActive`:
   - Processa input WASD/Setas
   - Controle normal do jogador

#### 3. **Interrupção Automática de Órbita** ⏹️

Modificação no `setActive()`:
```typescript
if (active && this.isOrbiting) {
    this.stopOrbiting();
}
```
- Quando jogador pressiona TAB para assumir controle
- Órbita é interrompida automaticamente
- Nave passa a responder a comandos

#### 4. **Detecção e Inicialização de Órbita (MainScene)** 🎯

No método `update()` da MainScene:

**Detecção de chegada**:
```typescript
if (!isOrbiting && !isAutoMoving && !isActive) {
    const distance = Phaser.Math.Distance.Between(...);
    if (distance < 100) {
        explorationShip.startOrbiting(mothershipPos.x, mothershipPos.y);
    }
}
```

**Atualização contínua do centro**:
```typescript
if (explorationShip.getIsOrbiting()) {
    const mothershipPos = this.mothership.getPosition();
    explorationShip.updateOrbitCenter(mothershipPos.x, mothershipPos.y);
}
```
- Centro da órbita sempre segue a Nave-Mãe
- Órbita permanece estável mesmo se Nave-Mãe se mover

### Parâmetros de Configuração

- **ORBIT_RADIUS**: 100px - Distância da órbita
- **ORBIT_SPEED**: 0.02 rad/frame - Velocidade angular (~1.14°/frame, ~68°/s a 60fps)
- **ARRIVAL_THRESHOLD**: 80px - Distância para considerar chegada (aumentado para transição mais suave)

### Fluxo de Uso

**Ciclo completo de órbita**:
1. Jogador controla Nave-Mãe
2. Clica no botão "🔙 RECOLHER NAVE"
3. Nave de Exploração se move automaticamente até a Nave-Mãe
4. Ao chegar perto (< 100px), órbita inicia automaticamente
5. Nave orbita circularmente ao redor da Nave-Mãe
6. Jogador pressiona TAB
7. Órbita é interrompida
8. Jogador assume controle da Nave de Exploração

**Órbita durante movimento da Nave-Mãe**:
- Se Nave-Mãe se mover, órbita se move junto
- Raio permanece constante
- Não há "arrasto" ou atraso

### Resultado Final

O sistema de órbita está completamente funcional:
- **Transição suave**: Do movimento automático para órbita
- **Órbita estável**: Circular e constante
- **Segue a Nave-Mãe**: Centro da órbita atualiza automaticamente
- **Interrupção imediata**: TAB para em controle instantaneamente
- **Preparado para múltiplas naves**: Cada nave tem seu próprio `orbitAngle`
- **Visual agradável**: Velocidade de órbita não é muito rápida nem muito lenta

A Nave de Exploração agora tem um comportamento "de guarda" realista, orbitando a Nave-Mãe quando não está em uso, pronta para ser despachada a qualquer momento.

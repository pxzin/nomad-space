# Tarefa: 003 - Implementar Limites do Cenário com Buffer

**Para**: Claude (Programador)
**De**: Copilot (Organizador)
**Status**: Concluído ✅
**Depende de**: Tarefa 002

## 🎯 Objetivo
Implementar a mecânica de limites do cenário, que impede a nave de sair do mapa e a desacelera suavemente ao se aproximar da borda.

## 📋 Passos de Execução

1.  **Definir Limites do Mundo**:
    -   Na `MainScene`, configure os limites do mundo do jogo (ex: um retângulo de 5000x5000 pixels).
    -   Use a funcionalidade `this.physics.world.setBounds(...)` do Phaser.
    -   Configure a nave para colidir com esses limites: `player.setCollideWorldBounds(true)`. Isso criará a "parede invisível" final.

2.  **Criar a Zona de Buffer**:
    -   Defina uma área interna aos limites do mundo que servirá como a "zona de buffer" (ex: 200 pixels de distância da borda).

3.  **Implementar a Desaceleração**:
    -   No método `update` da cena, verifique continuamente a posição da nave.
    -   Se a nave estiver dentro da zona de buffer, calcule um fator de desaceleração. Esse fator deve ser mais forte quanto mais perto a nave estiver da borda final.
        -   *Exemplo de cálculo*: `fator = 1 - (distancia_ate_borda / tamanho_buffer)`.
    -   Aplique uma força contrária ao movimento da nave ou reduza sua velocidade máxima com base nesse fator, criando uma sensação de "freio" progressivo.

## ✅ Critérios de Aceitação
- ✅ A nave não consegue ultrapassar os limites definidos para o cenário.
- ✅ Ao se aproximar de uma borda, a nave visivelmente desacelera.
- ✅ A desaceleração é mais intensa quanto mais próxima a nave está da borda.
- ✅ A experiência de chegar ao limite do mapa é suave, não abrupta.

## 🔨 Implementação Realizada

### Arquivos Modificados
- `src/lib/game/entities/Player.ts`
- `src/lib/game/scenes/MainScene.ts`

### Funcionalidades Implementadas

#### 1. Configuração de Limites do Mundo
- Adicionado `setCollideWorldBounds(true)` no corpo físico da nave
- Armazenamento dos limites do mundo em `worldBounds` para cálculos posteriores
- Constante `BUFFER_ZONE = 200px` que define a área de desaceleração

#### 2. Sistema de Zona de Buffer
- Método `calculateBoundarySlowdown()`: calcula fator de desaceleração (0-1) baseado na distância até a borda mais próxima
- Método `isInBufferZone()`: verifica se a nave está na zona de buffer
- Método `getDistanceToNearestBoundary()`: retorna distância em pixels até a borda mais próxima

#### 3. Desaceleração Progressiva
- Aplicação de curva quadrática (`Math.pow(slowdownFactor, 2)`) para suavizar a desaceleração
- Redução da velocidade máxima em até 70% quando muito próximo da borda
- Aumento do arrasto (drag) em até 3x conforme se aproxima da borda
- Reset automático dos valores normais ao sair da zona de buffer

#### 4. Sistema de Debug
- Novo método `getBoundaryDebugInfo()` que retorna informações sobre zona de buffer
- UI de debug expandida mostrando:
  - ⚠️ Aviso visual quando na zona de buffer
  - Distância até a borda mais próxima
  - Percentual de desaceleração aplicado

### Mecânica de Desaceleração
O sistema funciona em duas etapas:
1. **Detecção**: Verifica continuamente a distância até as 4 bordas do mundo
2. **Aplicação**: Quando dentro dos 200px da borda:
   - Calcula fator de desaceleração baseado na distância
   - Aplica curva ease-in para tornar a transição suave
   - Reduz velocidade máxima e aumenta arrasto proporcionalmente

### Resultado
A nave agora tem uma "parede invisível" firme nos limites do mundo, mas com um sistema de desaceleração suave e progressiva que torna a aproximação das bordas natural e previsível para o jogador.

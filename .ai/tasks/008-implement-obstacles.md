# Tarefa: 008 - Implementar Obstáculos de Cenário

**Para**: Claude (Programador)
**De**: Copilot (Organizador)
**Status**: Concluído ✅
**Depende de**: Tarefa 002

## 🎯 Objetivo
Adicionar obstáculos estáticos ao cenário que colidem com as naves do jogador, tornando a navegação mais interessante.

## 📋 Passos de Execução

1.  **Criar Grupo de Obstáculos**:
    -   Crie um novo grupo de física **estática** no Phaser para os obstáculos (`obstaclesGroup`). Objetos estáticos são imovíveis, o que é ideal para obstáculos.

2.  **Adicionar Sprites de Obstáculos**:
    -   Usando os novos assets (`space_debris_*.png`, `barren_asteroid_*.png`), adicione vários sprites de obstáculos à cena, dentro do `obstaclesGroup`.
    -   Distribua-os aleatoriamente pelo mapa, garantindo que não bloqueiem completamente nenhuma área importante no início.

3.  **Configurar Colisão**:
    -   Adicione um `collider` entre a Nave-Mãe e o `obstaclesGroup`.
    -   Adicione um `collider` entre a Nave de Exploração e o `obstaclesGroup`.
    -   A colisão deve ser sólida, impedindo o movimento das naves.

## 📝 Notas
-   Certifique-se de que a colisão não aciona nenhum outro evento (dano, coleta, etc.). É puramente uma barreira física.
-   Os obstáculos devem ser imóveis ao serem atingidos pelas naves.

## ✅ Critérios de Aceitação
- ✅ Detritos espaciais e asteroides estéreis são visíveis no cenário.
- ✅ Tanto a Nave-Mãe quanto a Nave de Exploração colidem e são bloqueadas por esses obstáculos.
- ✅ As naves não conseguem atravessar os obstáculos.
- ✅ Os obstáculos não se movem ao serem atingidos.

## 🔨 Implementação Realizada

### Arquivos Criados
- [src/lib/game/entities/Obstacle.ts](src/lib/game/entities/Obstacle.ts) - Classe de obstáculos estáticos

### Arquivos Modificados
- [src/lib/game/scenes/MainScene.ts](src/lib/game/scenes/MainScene.ts) - Sistema de obstáculos e colisões

### Funcionalidades Implementadas

#### 1. **Classe Obstacle** 🪨
Sistema completo de obstáculos estáticos com variedade visual:

**Tipos de Obstáculos**:
- `SPACE_DEBRIS_SMALL/MEDIUM/LARGE` - Detritos espaciais metálicos
- `BARREN_ASTEROID_SMALL/MEDIUM/LARGE` - Asteroides estéreis rochosos

**Tamanhos**:
- Small: 30px de raio
- Medium: 50px de raio
- Large: 80px de raio

**Características Visuais**:
- **Detritos Espaciais**:
  - Cor metálica escura (#4a5568)
  - Forma irregular angulada (6-8 pontos)
  - Detalhes: riscos e marcas metálicas
  - Aparência de sucata espacial

- **Asteroides Estéreis**:
  - Cor cinza rochosa (#78716c)
  - Forma circular irregular (12-15 pontos para aparência mais arredondada)
  - Detalhes: crateras escuras (#44403c)
  - Quantidade de crateras baseada no tamanho

**Sistema de Física**:
- Corpo estático (`StaticBody`) - não se move com colisões
- Colisão circular baseada no tamanho
- Imóvel ao ser atingido por naves

#### 2. **Sistema de Distribuição Inteligente** 🎯
Algoritmo de posicionamento que garante boa jogabilidade:

**Regras de Posicionamento**:
```typescript
const minDistanceFromCenter = 200;      // Não bloqueia spawn das naves
const minDistanceBetweenObstacles = 100; // Evita agrupamentos
const maxAttempts = 50;                  // Limite de tentativas por obstáculo
```

**Validações**:
- `isTooCloseToCenter()`: Evita obstáculos próximos ao spawn (0,0)
- `isTooCloseToOtherObstacles()`: Distribui obstáculos uniformemente
- Sistema de retry: Até 50 tentativas para encontrar posição válida

**Resultado**: 30 obstáculos bem distribuídos pelo mapa 4000x4000

#### 3. **Sistema de Colisão** 💥
Colisões sólidas configuradas no Phaser:

```typescript
// Grupo estático de obstáculos
this.obstacleGroup = this.physics.add.staticGroup();

// Colisões com ambas as naves
this.physics.add.collider(this.mothership.sprite, this.obstacleGroup);
this.physics.add.collider(this.explorationShip.sprite, this.obstacleGroup);
```

**Comportamento**:
- Colisão sólida: Naves param ao colidir
- Sem eventos adicionais: Puramente física (sem dano, sons, etc)
- Obstáculos imóveis: Permanecem na posição original
- Não afeta movimento automático: Naves desviam ou param

#### 4. **Integração com o Jogo** 🎮
Sistema totalmente integrado ao gameplay:

**Inicialização**:
```typescript
// No create() da MainScene
this.createObstacleSystem();
```

**Posicionamento no mundo**:
- Distribuídos em todo o mapa (-2000 a +2000 em X e Y)
- Margem de segurança de 100px das bordas
- Área central livre (raio de 200px)

**Tipos Aleatórios**:
- Se não especificado, escolhe tipo aleatório entre os 6 disponíveis
- Mix de detritos e asteroides para variedade visual

**Console Log**:
```
🪨 30 obstáculos criados no mapa
```

### Fluxo de Jogo

**Exploração com Obstáculos**:
1. Jogador navega pelo espaço
2. Encontra obstáculos visualmente distintos
3. Deve desviar ou parar ao colidir
4. Naves não podem atravessar
5. Obstáculos criam desafio de navegação

**Movimento Automático**:
- Nave em auto-movimento para ao colidir com obstáculo
- Jogador precisa encontrar rota alternativa
- Adiciona necessidade de planejamento estratégico

### Resultado Final

O jogo agora possui um sistema completo de obstáculos que:
- **Variedade visual**: 6 tipos diferentes de obstáculos
- **Distribuição inteligente**: Não bloqueia áreas importantes
- **Colisão sólida**: Bloqueia passagem das naves
- **Performance**: Física estática otimizada
- **Gameplay**: Adiciona desafio de navegação

Os obstáculos tornam a exploração espacial mais interessante e desafiadora, exigindo que o jogador planeje suas rotas e desvie de detritos e asteroides perigosos.

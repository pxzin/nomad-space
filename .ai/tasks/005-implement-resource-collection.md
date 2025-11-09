# Tarefa: 005 - Implementar Coleta de Recursos Ativa e Passiva

**Para**: Claude (Programador)
**De**: Copilot (Organizador)
**Status**: Concluído ✅
**Depende de**: Tarefa 004

## 🎯 Objetivo
Implementar os dois sistemas de coleta de recursos: a coleta passiva da Nave-Mãe e a coleta ativa (laser de mineração) da Nave de Exploração.

## 📋 Passos de Execução

1.  **Criar Asteroides de Recurso**:
    -   Crie um grupo de física no Phaser para os asteroides (`resourceAsteroids`).
    -   Adicione alguns sprites de asteroides (placeholders) à cena, pertencentes a este grupo. Torne-os interativos para eventos de input (`.setInteractive()`).

2.  **Implementar Coleta Passiva (Nave-Mãe)**:
    -   Crie um sensor de física circular (uma zona de trigger, sem colisão sólida) ao redor da Nave-Mãe. Este será seu "raio de coleta".
    -   Configure um evento de `overlap` entre este sensor e o grupo `resourceAsteroids`.
    -   Quando um asteroide entrar no raio, inicie um processo de coleta (ex: um timer de 2 segundos). Após o tempo, o asteroide é destruído e uma mensagem é logada no console (ex: "Nave-Mãe coletou recurso.").

3.  **Implementar Coleta Ativa (Nave de Exploração)**:
    -   Adicione um listener para o evento de clique do mouse (`pointerdown`).
    -   No listener, verifique as seguintes condições:
        1.  O `activeShip` (da Tarefa 004) é a Nave de Exploração.
        2.  O objeto clicado pertence ao grupo `resourceAsteroids`.
        3.  A distância entre a Nave de Exploração e o asteroide clicado é menor que uma "distância de mineração" máxima (ex: 300 pixels).
    -   Se todas as condições forem verdadeiras:
        -   Desenhe uma linha temporária (usando `Phaser.GameObjects.Line`) da nave até o asteroide para simular o laser.
        -   Inicie um timer de "mineração" (ex: 1 segundo).
        -   Após o timer, destrua o asteroide e a linha do laser. Logue uma mensagem no console (ex: "Nave de Exploração minerou recurso.").

## ✅ Critérios de Aceitação
- ✅ Asteroides de recurso aparecem no cenário.
- ✅ A Nave-Mãe coleta automaticamente asteroides que entram em seu raio de alcance.
- ✅ O jogador, controlando a Nave de Exploração, pode clicar em um asteroide próximo para minerá-lo com um "laser".
- ✅ A coleta ativa só funciona com a Nave de Exploração.
- ✅ A coleta é comunicada através de logs no console.

## 🔨 Implementação Realizada

### Arquivos Criados
- `src/lib/game/entities/Asteroid.ts`

### Arquivos Modificados
- `src/lib/game/scenes/MainScene.ts`

### Funcionalidades Implementadas

#### 1. **Entidade Asteroid** ☄️
Características:
- **Visual**: Polígono irregular marrom com crateras
- **Física**: Corpo circular interativo
- **Tamanho**: Variável entre 15-30px
- **Interatividade**: Detecta cliques do mouse
- **Detalhes visuais**: Forma irregular com crateras aleatórias para aparência realista

#### 2. **Sistema de Spawn de Asteroides**
- Spawn de 15 asteroides em posições aleatórias pelo mundo
- Distribuição uniforme dentro dos limites do mundo
- Tamanhos variados para diversidade visual
- Grupo de física (`asteroidGroup`) para gerenciar colisões

#### 3. **Coleta Passiva - Nave-Mãe** 🚀
Características:
- **Raio de coleta**: 150px ao redor da Nave-Mãe
- **Sensor invisível**: Segue a Nave-Mãe continuamente
- **Detecção automática**: Overlap physics com asteroides
- **Timer de coleta**: 2 segundos para coletar cada asteroide
- **Feedback**: Console log "🚀 Nave-Mãe coletou recurso (passivo)"
- **Gerenciamento**: Map de asteroides sendo coletados para evitar duplicação

#### 4. **Coleta Ativa - Nave de Exploração** 🛸
Características:
- **Ativação**: Apenas quando Nave de Exploração está ativa
- **Clique em asteroides**: Sistema de hit test para detectar cliques
- **Distância máxima**: 300px de alcance do laser
- **Laser visual**: Linha verde conectando nave ao asteroide
- **Timer de mineração**: 1 segundo para minerar
- **Feedback visual**: Laser que segue a nave durante mineração
- **Feedback console**: "🛸 Nave de Exploração minerou recurso (ativo)"
- **Validações**:
  - Verifica se nave correta está ativa
  - Verifica distância até asteroide
  - Previne múltiplas minerações simultâneas

#### 5. **Gerenciamento de Recursos**
- Sistema de remoção limpa de asteroides
- Cancelamento de timers ao remover asteroide
- Limpeza de referências (array, grupo, sprite)
- Prevenção de duplicação de coleta

### Comparação dos Sistemas

| Característica | Coleta Passiva 🚀 | Coleta Ativa 🛸 |
|---|---|---|
| **Nave** | Nave-Mãe | Nave de Exploração |
| **Ativação** | Automática | Clique do mouse |
| **Raio/Alcance** | 150px (raio) | 300px (laser) |
| **Tempo** | 2 segundos | 1 segundo |
| **Visual** | Invisível | Laser verde |
| **Condição** | Proximidade | Clique + Distância |

### Resultado

O jogo agora possui um sistema completo de coleta de recursos com duas mecânicas distintas:
- **Coleta Passiva**: A Nave-Mãe automaticamente coleta asteroides próximos, incentivando posicionamento estratégico
- **Coleta Ativa**: A Nave de Exploração permite mineração precisa e rápida com feedback visual do laser

Os sistemas funcionam independentemente e são comunicados via console, preparando o terreno para a implementação de um sistema de HUD que mostrará os recursos coletados.

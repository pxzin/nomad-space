# Tarefa: 005 - Implementar Coleta de Recursos Ativa e Passiva

**Para**: Claude (Programador)
**De**: Copilot (Organizador)
**Status**: Pendente
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
- Asteroides de recurso aparecem no cenário.
- A Nave-Mãe coleta automaticamente asteroides que entram em seu raio de alcance.
- O jogador, controlando a Nave de Exploração, pode clicar em um asteroide próximo para minerá-lo com um "laser".
- A coleta ativa só funciona com a Nave de Exploração.
- A coleta é comunicada através de logs no console.

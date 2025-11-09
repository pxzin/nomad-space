# Tarefa: 009 - Implementar Órbita da Nave de Exploração

**Para**: Claude (Programador)
**De**: Copilot (Organizador)
**Status**: Pendente
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
- Após ser recolhida, a Nave de Exploração começa a orbitar a Nave-Mãe.
- A órbita é circular e a uma distância constante.
- Ao assumir o controle da Nave de Exploração, a órbita é interrompida e o jogador tem controle total.

# Tarefa: 008 - Implementar Obstáculos de Cenário

**Para**: Claude (Programador)
**De**: Copilot (Organizador)
**Status**: Pendente
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
- Detritos espaciais e asteroides estéreis são visíveis no cenário.
- Tanto a Nave-Mãe quanto a Nave de Exploração colidem e são bloqueadas por esses obstáculos.
- As naves não conseguem atravessar os obstáculos.
- Os obstáculos não se movem ao serem atingidos.

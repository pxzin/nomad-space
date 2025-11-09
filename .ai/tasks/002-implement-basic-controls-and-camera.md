# Tarefa: 002 - Implementar Controles Básicos, Câmera e Background

**Para**: Claude (Programador)
**De**: Copilot (Organizador)
**Status**: Concluído
**Depende de**: Tarefa 001

## 🎯 Objetivo
Implementar a visualização e os controles básicos do jogador (Nave-Mãe) conforme definido no GDD.

## 📋 Passos de Execução

1.  **Criar a Cena Principal**:
    -   Dentro da estrutura do SvelteKit + Phaser, crie uma cena principal do jogo (ex: `MainScene.ts`).

2.  **Implementar Background Parallax**:
    -   Adicione 2 ou 3 camadas de imagens de background (pode usar placeholders, como um campo de estrelas simples) na `MainScene`.
    -   Faça com que essas camadas se movam em velocidades diferentes em relação à câmera para criar um efeito de profundidade (parallax).

3.  **Adicionar a Nave do Jogador**:
    -   Insira um sprite simples no centro da cena para representar a Nave-Mãe. Um círculo ou triângulo branco é suficiente como placeholder.

4.  **Implementar Controles de Movimento**:
    -   Capture as entradas das teclas `W`, `A`, `S`, `D`.
    -   Aplique física (velocidade/aceleração) ao sprite da nave para permitir movimento em todas as direções (top-down).

5.  **Configurar a Câmera**:
    -   Faça com que a câmera principal do Phaser siga o sprite da Nave-Mãe (`camera.startFollow(playerSprite)`).

## ✅ Critérios de Aceitação
- Ao iniciar o jogo, uma cena do Phaser é exibida.
- A cena contém um background com efeito parallax.
- Um sprite representando o jogador está na tela.
- O jogador pode mover o sprite em todas as direções usando as teclas WASD.
- A câmera do jogo acompanha o movimento do sprite do jogador.

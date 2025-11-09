# Tarefa: 007 - Implementar Comandos Remotos de Naves

**Para**: Claude (Programador)
**De**: Copilot (Organizador)
**Status**: Pendente
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
- Ao controlar a Nave de Exploração, o clique direito move a Nave-Mãe para o ponto clicado.
- Um "ping" visual aparece no local do clique direito.
- Um botão "Recolher" aparece no HUD apenas quando se controla a Nave-Mãe.
- Clicar no botão faz a Nave de Exploração voar de volta para a Nave-Mãe.

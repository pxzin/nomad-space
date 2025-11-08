# Tarefa: 004 - Implementar Controle Duplo de Naves (Básico)

**Para**: Claude (Programador)
**De**: Copilot (Organizador)
**Status**: Pendente
**Depende de**: Tarefa 002

## 🎯 Objetivo
Implementar o sistema fundamental que permite ao jogador alternar o controle entre a Nave-Mãe e a Nave de Exploração.

## 📋 Passos de Execução

1.  **Criar Duas Entidades de Nave**:
    -   Na `MainScene`, crie dois sprites distintos: um para a Nave-Mãe (maior, mais pesado) e um para a Nave de Exploração (menor, mais ágil). Use placeholders visuais diferentes para cada um (ex: um retângulo grande e um triângulo pequeno).

2.  **Diferenciar a Física**:
    -   Aplique propriedades de física diferentes para cada nave.
    -   **Nave-Mãe**: Deve ter alta massa e/ou `drag`, fazendo com que acelere e desacelere lentamente.
    -   **Nave de Exploração**: Deve ter baixa massa e/ou `drag`, permitindo movimentos rápidos e ágeis.

3.  **Gerenciar Estado de Controle**:
    -   Crie uma variável ou um gerenciador de estado simples para rastrear qual nave está atualmente sob o controle do jogador (ex: `activeShip = 'mothership' | 'exploration'`).

4.  **Implementar Troca de Foco**:
    -   Associe uma tecla (ex: `TAB`) para alternar o valor do estado de controle entre `'mothership'` and `'exploration'`.

5.  **Direcionar Input e Câmera**:
    -   Modifique o código de controle de movimento (da Tarefa 002) para que as teclas WASD afetem apenas a nave que está ativa no estado de controle.
    -   No momento da troca, atualize o alvo da câmera para a nova nave ativa: `camera.startFollow(newActiveShip)`.

## 📝 Notas
-   Nesta tarefa, as duas naves podem ser iniciadas próximas uma da outra na cena. A mecânica de "lançamento" e "reconstrução" será implementada em uma tarefa futura.
-   A autonomia da Nave-Mãe (movimento e defesa) também será implementada em tarefas futuras. O foco aqui é puramente na troca de controle.

## ✅ Critérios de Aceitação
- Duas naves com características de movimento visivelmente diferentes estão na cena.
- O jogador controla uma nave de cada vez.
- Pressionar a tecla `TAB` alterna o controle entre a Nave-Mãe e a Nave de Exploração.
- A câmera do jogo move-se suavemente para focar na nave recém-ativada.

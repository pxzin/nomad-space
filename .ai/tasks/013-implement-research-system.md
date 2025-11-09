# Tarefa: 013 - Implementar Laboratório e Árvore de Tecnologia (Básico)

**Para**: Claude (Programador)
**De**: Copilot (Organizador)
**Status**: Pendente
**Depende de**: Tarefa 005, Tarefa 006

## 🎯 Objetivo
Implementar o sistema de pesquisa, incluindo o módulo Laboratório, a geração de Pontos de Pesquisa e uma interface básica para a Árvore de Tecnologia.

## 📋 Passos de Execução

1.  **Expandir Repositório de Dados**:
    -   Adicione os recursos de pesquisa ao repositório de dados: `research_data` e `research_points`.
    -   Adicione `research_data` à lógica de coleta da Tarefa 005 (pode ser um novo tipo de "asteroide" ou "anomalia" rara).
    -   Atualize o HUD para exibir ambos os novos recursos.

2.  **Lógica do Laboratório**:
    -   No sistema de produção, adicione a lógica para o Laboratório.
    -   A cada intervalo de tempo, para cada Laboratório instalado, consuma uma quantidade de `research_data` e `energia` (a ser implementada) para gerar `research_points`.
    -   *Exemplo*: `1 research_data` -> `10 research_points` (tempo: 10 segundos).

3.  **UI da Árvore de Tecnologia (Componente Svelte)**:
    -   Crie um novo botão no HUD para abrir a tela da "Árvore de Tecnologia".
    -   Crie um novo componente Svelte para esta tela.
    -   Nesta tela, exiba uma lista de tecnologias pesquisáveis. Para esta tarefa, crie 2-3 tecnologias placeholder.
    -   *Exemplo de tecnologias*:
        -   "Refinaria Avançada" (Custo: 50 Pontos de Pesquisa)
        -   "Fábricas Automatizadas" (Custo: 100 Pontos de Pesquisa)
        -   "Propulsores Eficientes" (Custo: 75 Pontos de Pesquisa)

4.  **Lógica de Pesquisa**:
    -   Permita que o jogador clique em uma tecnologia na UI.
    -   Se o jogador tiver `research_points` suficientes, subtraia o custo e marque a tecnologia como "pesquisada".
    -   O botão da tecnologia deve mudar de aparência (ex: ficar colorido ou com um contorno verde) para indicar que foi desbloqueada.

## 📝 Notas
-   Nesta tarefa, o desbloqueio da tecnologia ainda **não precisa ter um efeito real no jogo**. O foco é na UI, no gasto de pontos e na marcação do desbloqueio. A aplicação dos bônus será feita em tarefas futuras.

## ✅ Critérios de Aceitação
- O HUD exibe `Dados de Pesquisa` e `Pontos de Pesquisa`.
- Instalar um Laboratório consome `Dados de Pesquisa` e gera `Pontos de Pesquisa`.
- Um botão no HUD abre a tela da Árvore de Tecnologia.
- A tela de tecnologia exibe nós pesquisáveis com seus custos.
- O jogador pode gastar pontos para desbloquear uma tecnologia, e a UI reflete essa mudança.

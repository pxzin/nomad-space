# Tarefa: 012 - Implementar Módulo de Fábrica e Componentes

**Para**: Claude (Programador)
**De**: Copilot (Organizador)
**Status**: Pendente
**Depende de**: Tarefa 011

## 🎯 Objetivo
Implementar o segundo estágio da cadeia de produção: a Fábrica, que converte Materiais Refinados em Componentes.

## 📋 Passos de Execução

1.  **Expandir Repositório de Dados**:
    -   Adicione os Componentes ao repositório de dados de recursos: `mechanical_parts`, `electronic_components`, `fuel_cell`.
    -   Atualize o HUD para que todos os tipos de Componentes sejam exibidos.

2.  **Lógica da Fábrica**:
    -   Expanda o sistema de produção da Tarefa 011 para gerenciar a lógica da Fábrica.
    -   O sistema deve verificar, a cada intervalo de tempo, quantas Fábricas estão instaladas e se há Materiais Refinados suficientes para as receitas.

3.  **Processo de Fabricação**:
    -   Implemente as receitas de fabricação.
    -   *Exemplo de receitas iniciais*:
        -   `1 iron_plate` -> `2 mechanical_parts` (tempo: 3 segundos).
        -   `1 silicon_wafer` + `1 mechanical_parts` -> `1 electronic_components` (tempo: 5 segundos).
    -   Consuma os materiais refinados e, após o tempo de processamento, adicione os componentes ao inventário.
    -   Adicione um feedback visual para a Fábrica em funcionamento (ex: um brilho ou animação sutil).

## 📝 Notas
-   Assim como na Tarefa 011, as receitas e velocidades podem ser fixas por enquanto.
-   O objetivo é criar o segundo nível da cadeia de produção, onde o jogador transforma materiais simples em peças complexas.

## ✅ Critérios de Aceitação
- O HUD exibe a contagem dos novos Componentes.
- Instalar um módulo de Fábrica inicia a conversão automática de Materiais Refinados em Componentes.
- A quantidade de Materiais Refinados diminui e a de Componentes aumenta, seguindo as receitas.
- Se não houver Fábricas, nenhum Componente é fabricado.

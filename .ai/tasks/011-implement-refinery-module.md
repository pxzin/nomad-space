# Tarefa: 011 - Implementar Módulo de Refinaria e Recursos Refinados

**Para**: Claude (Programador)
**De**: Copilot (Organizador)
**Status**: Pendente
**Depende de**: Tarefa 010

## 🎯 Objetivo
Dar a primeira função real a um módulo construído: a Refinaria. Implementar a lógica de conversão de Recursos Brutos para Materiais Refinados.

## 📋 Passos de Execução

1.  **Expandir Repositório de Dados**:
    -   Modifique o repositório de dados de recursos (da Tarefa 006) para incluir os novos tipos de recursos:
        -   Recursos Brutos: `iron_ore`, `raw_silicon`, `cosmic_ice`.
        -   Materiais Refinados: `iron_plate`, `silicon_wafer`, `purified_water`.
    -   Atualize o HUD para exibir também os novos materiais refinados.

2.  **Lógica da Refinaria**:
    -   Crie uma classe ou sistema para gerenciar a lógica de produção.
    -   Este sistema deve verificar, a cada segundo (ou outro intervalo de tempo):
        1.  Quantos módulos de `Refinaria` estão instalados na Nave-Mãe (lendo o modelo de dados dos slots da Tarefa 010).
        2.  Se há Recursos Brutos suficientes para processar (ex: `recursos.iron_ore >= 2`).

3.  **Processo de Conversão**:
    -   Se as condições forem atendidas, inicie um processo de refino.
    -   Para cada Refinaria ativa, consuma uma quantidade de Recurso Bruto e, após um tempo de processamento (ex: 5 segundos), adicione uma quantidade de Material Refinado.
    -   *Exemplo de receita inicial*: `2 iron_ore` -> `1 iron_plate`.
    -   Forneça um feedback visual simples, como fazer o ícone do módulo de Refinaria na nave "piscar" enquanto está processando.

## 📝 Notas
-   A velocidade de refino e as receitas serão, no futuro, influenciadas pela pesquisa, mas por enquanto podem ser valores fixos.
-   O foco é criar o loop: coletar recurso bruto -> instalar refinaria -> ver material refinado aumentar.

## ✅ Critérios de Aceitação
- O HUD agora exibe tanto recursos brutos quanto materiais refinados.
- Instalar um módulo de Refinaria na Nave-Mãe inicia o processo de conversão automática se houver recursos brutos.
- A quantidade de recursos brutos diminui e a de materiais refinados aumenta ao longo do tempo, conforme a receita.
- Se não houver Refinarias instaladas, nenhum recurso é refinado.

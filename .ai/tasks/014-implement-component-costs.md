# Tarefa: 014 (Urgente) - Integrar Custo de Recursos na Construção

**Para**: Claude (Programador)
**De**: Copilot (Organizador)
**Status**: Concluído
**Depende de**: Tarefa 010, Tarefa 012

## 🎯 Objetivo
Modificar o sistema de construção de módulos para que ele consuma os recursos corretos do inventário do jogador, conforme definido no GDD, resolvendo o problema de bootstrapping da Refinaria.

## 📋 Passos de Execução

1.  **Implementar Custos de Construção**:
    -   Crie uma estrutura de dados ou utilize uma configuração para definir os custos de cada módulo, seguindo os valores do GDD.
    -   **Refinaria**: `50 Minério de Ferro`, `25 Silício Bruto`.
    -   **Fábrica**: `25 Placas de Ferro`, `10 Wafers de Silício`.
    -   **Laboratório**: `20 Placas de Ferro`, `15 Wafers de Silício`.
    -   (Outros módulos seguirão essa lógica).

2.  **Atualizar UI do Menu de Construção**:
    -   Modifique o componente Svelte do menu de construção (da Tarefa 010).
    -   Para cada módulo, exiba seu custo correto em recursos (brutos ou refinados).
    -   Se o jogador não tiver os recursos necessários, o botão para construir aquele módulo deve aparecer desabilitado.

3.  **Implementar Lógica de Custo**:
    -   Modifique a lógica de "instalar" um módulo.
    -   Ao selecionar um módulo no menu, verifique se o jogador possui os recursos necessários.
    -   Após o jogador instalar o módulo, subtraia os recursos correspondentes do inventário.

## 📝 Notas
-   **CRÍTICO**: A Refinaria deve custar **Recursos Brutos**. Os módulos subsequentes devem custar **Materiais Refinados** ou **Componentes**. Isso é essencial para a progressão do jogo.

## ✅ Critérios de Aceitação
- O menu de construção mostra o custo correto para cada módulo.
- A Refinaria custa apenas recursos brutos.
- Módulos que o jogador não pode pagar aparecem desabilitados.
- Construir um módulo consome a quantidade correta de recursos do inventário.
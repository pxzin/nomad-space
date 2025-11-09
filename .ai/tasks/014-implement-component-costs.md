# Tarefa: 014 - Integrar Custo de Componentes na Construção

**Para**: Claude (Programador)
**De**: Copilot (Organizador)
**Status**: Pendente
**Depende de**: Tarefa 010, Tarefa 012

## 🎯 Objetivo
Modificar o sistema de construção de módulos para que ele consuma Componentes do inventário do jogador, em vez de ser gratuito.

## 📋 Passos de Execução

1.  **Definir Custos dos Módulos**:
    -   Crie uma estrutura de dados que defina o custo de cada módulo.
    -   *Exemplo de custos*:
        -   **Refinaria**: 10 Peças Mecânicas.
        -   **Fábrica**: 15 Peças Mecânicas, 5 Componentes Eletrônicos.
        -   **Motor Nv. 1**: 5 Peças Mecânicas, 2 Células de Combustível.

2.  **Atualizar UI do Menu de Construção**:
    -   Modifique o componente Svelte do menu de construção (da Tarefa 010).
    -   Para cada módulo listado, exiba seu custo em Componentes.
    -   Se o jogador não tiver os componentes necessários, o botão para construir aquele módulo deve aparecer desabilitado (ex: cinza, não clicável).

3.  **Implementar Lógica de Custo**:
    -   Modifique a lógica de "instalar" um módulo.
    -   Antes de entrar no "modo de posicionamento", verifique se o jogador possui os componentes necessários.
    -   Após o jogador clicar em um slot válido para instalar o módulo, subtraia os componentes correspondentes do repositório de dados de recursos.

## 📝 Notas
-   Esta tarefa conecta a cadeia de produção (Tarefas 011 e 012) ao sistema de construção (Tarefa 010), criando o ciclo de jogo principal.
-   A "Montadora" que mencionamos no GDD pode ser abstraída por enquanto; a própria ação de construir a partir do menu representa a montagem.

## ✅ Critérios de Aceitação
- O menu de construção agora mostra o custo de cada módulo em Componentes.
- Módulos que o jogador não pode pagar aparecem desabilitados.
- Construir um módulo consome a quantidade correta de Componentes do inventário do jogador.
- Não é possível construir um módulo sem os recursos necessários.

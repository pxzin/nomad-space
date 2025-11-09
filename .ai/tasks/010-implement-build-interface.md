# Tarefa: 010 - Implementar Interface de Construção de Módulos (Básico)

**Para**: Claude (Programador)
**De**: Copilot (Organizador)
**Status**: Concluído
**Depende de**: Tarefa 006

## 🎯 Objetivo
Implementar a interface de usuário (UI) que permite ao jogador construir e instalar módulos na Nave-Mãe.

## 📋 Passos de Execução

1.  **Modelo de Dados dos Slots**:
    -   Crie uma estrutura de dados para representar os slots da Nave-Mãe. Pode ser um array de objetos, onde cada objeto representa um slot e tem propriedades como `id`, `position` (relativa à nave), e `installedModule` (inicialmente `null`).

2.  **Botão "Construir" no HUD**:
    -   Adicione o `build_menu_button.png` à `HUDScene`.
    -   Faça com que o clique neste botão alterne a visibilidade de um componente Svelte que será o menu de construção.

3.  **Menu de Construção (Componente Svelte)**:
    -   Crie um novo componente Svelte para o menu de construção.
    -   Este menu deve exibir uma lista de módulos construíveis (use os placeholders `module_refinery_icon.png`, `module_engine_icon.png`).
    -   Inicialmente, os botões no menu não precisam ter lógica de custo de recursos, apenas de seleção.

4.  **Modo de Posicionamento**:
    -   Ao clicar em um módulo no menu, o jogo deve entrar em um "modo de posicionamento".
    -   Neste modo, os slots vazios na Nave-Mãe devem ser visualmente destacados (ex: com um contorno ou uma cor diferente).
    -   O clique do mouse sobre um slot válido e vazio deve "instalar" o módulo.

5.  **Lógica de Instalação**:
    -   "Instalar" um módulo significa:
        1.  Atualizar o modelo de dados (ex: `slots[2].installedModule = 'refinery'`).
        2.  Fechar o menu de construção.
        3.  Adicionar um feedback visual na Nave-Mãe (ex: exibir o ícone do módulo sobre o sprite da nave na posição do slot correspondente).

## ✅ Critérios de Aceitação
- Um botão "Construir" está visível no HUD.
- Clicar no botão abre um menu com módulos para construir.
- Selecionar um módulo no menu entra em um modo de posicionamento, destacando os slots vazios.
- Clicar em um slot vazio instala o módulo, com feedback visual na nave.
- O menu de construção é um componente Svelte sobreposto ao canvas do Phaser.

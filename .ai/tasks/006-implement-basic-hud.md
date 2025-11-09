# Tarefa: 006 - Implementar HUD Básico de Recursos

**Para**: Claude (Programador)
**De**: Copilot (Organizador)
**Status**: Pendente
**Depende de**: Tarefa 005

## 🎯 Objetivo
Criar uma interface de usuário (HUD) básica para exibir a contagem dos três recursos iniciais: Ferro, Silício e Hidrogênio.

## 📋 Passos de Execução

1.  **Criar um Repositório de Dados**:
    -   Crie um local central e de fácil acesso para armazenar o estado dos recursos do jogador (ex: um objeto global, um Singleton, ou usando o `DataManager` do Phaser).
    -   Inicialize os recursos: `recursos = { ferro: 0, silicio: 0, hidrogenio: 0 }`.

2.  **Criar a Cena do HUD**:
    -   Crie uma nova cena no Phaser exclusivamente para o HUD (ex: `HUDScene.ts`).
    -   Configure esta cena para rodar em paralelo com a cena principal do jogo (`MainScene`). Isso garante que o HUD permaneça fixo na tela, independente do movimento da câmera no jogo.

3.  **Exibir os Recursos**:
    -   Na `HUDScene`, adicione objetos de texto no canto superior direito da tela para cada um dos três recursos.
    -   O formato deve ser "Nome: Quantidade" (ex: "Ferro: 0").

4.  **Atualizar o HUD**:
    -   No método `update` da `HUDScene`, leia os valores do repositório de dados de recursos e atualize o conteúdo dos objetos de texto correspondentes a cada frame.

5.  **Integrar com a Coleta**:
    -   **Modifique a lógica da Tarefa 005**: Em vez de apenas logar no console, a coleta de recursos agora deve incrementar o valor correspondente no repositório de dados central.
    -   Por exemplo, ao coletar um asteroide de ferro, o código deve chamar algo como `recursos.ferro += 10;`.

## ✅ Critérios de Aceitação
- Um HUD é visível no canto superior direito da tela do jogo.
- O HUD exibe a contagem de Ferro, Silício e Hidrogênio, inicializada em 0.
- Ao coletar um recurso no jogo (conforme a mecânica da Tarefa 005), a contagem correspondente no HUD é atualizada em tempo real.
- O HUD permanece em uma posição fixa na tela, mesmo quando a câmera do jogo se move.

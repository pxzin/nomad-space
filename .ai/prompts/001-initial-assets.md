# Prompts de Assets Iniciais (Estilo: Pixel Art 8-bit)

Este documento contém os prompts para a geração dos assets visuais iniciais do projeto Nomad Space.

**Estilo Geral**: Pixel art 8-bit, minimalista, com uma paleta de cores limitada focada em tons de azul, roxo e branco, conforme definido no GDD. A perspectiva para todos os objetos de jogo é **top-down (visão de cima)**.

---

### 1. Nave-Mãe (Mothership)

- **Nome do Asset**: `mothership_sprite.png`
- **Descrição**: Uma nave espacial grande e imponente, com um design mais pesado e industrial. Deve parecer lenta e robusta. O formato pode ser retangular ou hexagonal, com motores grandes e visíveis na parte traseira.
- **Paleta de Cores**: Cinza escuro para o casco, com luzes de navegação azuis e talvez uma faixa roxa para identificação.
- **Resolução Sugerida**: 128x128 pixels.
- **Notas**: A nave deve ter áreas visíveis que pareçam "slots" ou docas, onde módulos futuros poderiam ser encaixados. Sem animação de idle por enquanto.

---

### 2. Nave de Exploração (Exploration Ship)

- **Nome do Asset**: `exploration_ship_sprite.png`
- **Descrição**: Uma nave pequena, ágil e aerodinâmica. Formato de seta ou um caça espacial clássico. Deve parecer rápida e manobrável.
- **Paleta de Cores**: Branca ou cinza claro, com uma faixa da mesma cor roxa da Nave-Mãe para mostrar a afiliação. Luzes do motor em tom ciano.
- **Resolução Sugerida**: 32x32 pixels.
- **Notas**: Deve ser claramente distinguível da Nave-Mãe em tamanho e formato.

---

### 3. Background Parallax

- **Nome dos Assets**: `background_layer_01.png`, `background_layer_02.png`, `background_layer_03.png`
- **Descrição**:
    - **Camada 1 (Mais distante)**: Um campo de estrelas muito pequenas e esparsas (pixels únicos) em um fundo quase preto.
    - **Camada 2 (Intermediária)**: Estrelas um pouco maiores (2x2 pixels) e mais brilhantes, talvez com um leve brilho azulado. Menos densas que a camada 3.
    - **Camada 3 (Mais próxima)**: Algumas estrelas maiores e um pouco de "poeira cósmica" ou uma nébula muito sutil e escura em tons de roxo.
- **Resolução Sugerida**: Tiles repetíveis de 512x512 pixels.
- **Notas**: As camadas devem ser transparentes para serem sobrepostas.

---

### 4. Asteroides

- **Nomes dos Assets**: `asteroid_iron.png`, `asteroid_silicon.png`, `asteroid_hydrogen.png`
- **Descrição**:
    - **Asteroide de Ferro**: Formato irregular de rocha espacial. Cor cinza-metálico com algumas áreas mais escuras.
    - **Asteroide de Silício**: Formato mais cristalino e angular. Cor azul-acinzentado com pequenos pontos brilhantes (brancos ou ciano) na superfície.
    - **Asteroide de Hidrogênio**: Um aglomerado de gelo espacial. Formato irregular, mas com uma superfície mais suave. Cor branca com um leve tom azulado, quase translúcido.
- **Resolução Sugerida**: Variações de tamanho entre 16x16 e 48x48 pixels.
- **Notas**: Criar 2-3 variações de formato para cada tipo de asteroide para evitar repetição visual.

---

### 5. Laser de Mineração

- **Nome do Asset**: `mining_laser_effect.png`
- **Descrição**: Um feixe de energia contínuo.
- **Paleta de Cores**: Um núcleo branco brilhante com um brilho externo ciano ou verde.
- **Animação**: O feixe deve "pulsar" ou ter pequenas partículas de energia se movendo ao longo de seu comprimento. Pode ser uma spritesheet.
- **Resolução Sugerida**: Largura de 2-4 pixels, comprimento variável.

---

### 6. Ícones do HUD

- **Nomes dos Assets**: `icon_iron.png`, `icon_silicon.png`, `icon_hydrogen.png`
- **Descrição**: Representações simplificadas dos recursos correspondentes.
    - **Ícone de Ferro**: Um pequeno lingote ou uma rocha metálica.
    - **Ícone de Silício**: Um cristal ou um chip de computador.
    - **Ícone de Hidrogênio**: Uma gota ou o símbolo atômico 'H'.
- **Paleta de Cores**: Usar as mesmas cores dos asteroides correspondentes.
- **Resolução Sugerida**: 16x16 pixels.
- **Notas**: Devem ser claros e legíveis em tamanho pequeno.

---

### 7. Efeito de Comando "Mover Para"

- **Nome do Asset**: `move_to_marker_effect.png`
- **Descrição**: Um efeito visual de "ping" que aparece no local do clique direito. Deve ser uma animação curta.
- **Animação**: Um círculo que expande rapidamente e desaparece.
- **Paleta de Cores**: Ciano ou verde-limão para se destacar no fundo do espaço.
- **Resolução Sugerida**: Spritesheet de 64x64 pixels (4-5 frames).
- **Notas**: A animação deve ser rápida e não poluir a tela.

---

### 8. Ícone do Botão "Recolher"

- **Nome do Asset**: `recall_button_icon.png`
- **Descrição**: Um ícone para o botão que recolhe as naves de exploração.
- **Design**: Uma seta apontando para um círculo ou um ícone de hangar. Deve ser intuitivo.
- **Paleta de Cores**: Branco ou ciano sobre um fundo transparente.
- **Resolução Sugerida**: 24x24 pixels.
- **Notas**: Criar também uma versão "pressionada" ou "hover" do ícone, talvez com um brilho ou cor invertida.
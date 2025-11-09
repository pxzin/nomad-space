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

### 4. Asteroides de Recursos Brutos

- **Nomes dos Assets**: `asteroid_iron_ore.png`, `asteroid_raw_silicon.png`, `asteroid_cosmic_ice.png`
- **Descrição**:
    - **Minério de Ferro**: Formato irregular de rocha espacial. Cor cinza-metálico com veios visíveis de um metal mais escuro.
    - **Silício Bruto**: Formato mais cristalino e angular. Cor azul-acinzentado com pequenos pontos brilhantes (brancos ou ciano) na superfície.
    - **Gelo Cósmico**: Um aglomerado de gelo espacial. Formato irregular, mas com uma superfície mais suave. Cor branca com um leve tom azulado, quase translúcido.
- **Resolução Sugerida**: Variações de tamanho entre 16x16 e 48x48 pixels.
- **Notas**: Substituem os asteroides genéricos anteriores.

---

### 5. Laser de Mineração

- **Nome do Asset**: `mining_laser_effect.png`
- **Descrição**: Um feixe de energia contínuo.
- **Paleta de Cores**: Um núcleo branco brilhante com um brilho externo ciano ou verde.
- **Animação**: O feixe deve "pulsar" ou ter pequenas partículas de energia se movendo ao longo de seu comprimento. Pode ser uma spritesheet.
- **Resolução Sugerida**: Largura de 2-4 pixels, comprimento variável.

---

### 6. Ícones de Recursos e Componentes (HUD e Menus)

- **Resolução Sugerida**: 16x16 pixels.
- **Notas**: Devem ser claros e legíveis em tamanho pequeno.
- **Recursos Brutos**:
    - `icon_iron_ore.png`: Um ícone de uma rocha com veios de metal.
    - `icon_raw_silicon.png`: Um ícone de um cristal bruto.
    - `icon_cosmic_ice.png`: Um ícone de um bloco de gelo irregular.
- **Materiais Refinados**:
    - `icon_iron_plate.png`: Um ícone de uma placa de metal empilhada.
    - `icon_silicon_wafer.png`: Um ícone de um disco circular (wafer) com linhas de circuito.
    - `icon_purified_water.png`: Um ícone de uma gota de água limpa.
- **Componentes**:
    - `icon_mechanical_parts.png`: Um ícone de engrenagens e parafusos.
    - `icon_electronic_components.png`: Um ícone de um chip de computador com pinos.
    - `icon_fuel_cell.png`: Um ícone de uma bateria ou célula de energia cilíndrica.
- **Recurso Especial**:
    - `icon_research_data.png`: Um ícone de um tablet de dados ou um cérebro estilizado.

---

### 7. Efeitos e UI de Comandos

- **Efeito "Mover Para"**: `move_to_marker_effect.png` (Círculo que expande, ciano ou verde, 64x64).
- **Ícone Botão "Recolher"**: `recall_button_icon.png` (Seta apontando para hangar, 24x24).

---

### 8. Obstáculos

- **Nomes**: `space_debris_01.png`, `barren_asteroid_01.png`
- **Descrição**: Detritos de metal e rochas estéreis, marrons/cinzas.
- **Resolução**: 24x24 a 80x80 pixels.

---

### 9. Ícones de Módulos e UI de Construção

- **Resolução Sugerida**: 24x24 para botões de HUD, 32x32 para ícones de menu.
- **Botão "Construir"**: `build_menu_button.png` (Chave inglesa ou martelo).
- **Ícones de Módulos de Produção**:
    - `module_refinery_icon.png`: Uma bigorna ou chaminé industrial.
    - `module_factory_icon.png`: Um braço robótico ou uma esteira rolante.
    - `module_assembler_icon.png`: Um diagrama de explosão de um objeto sendo montado.
    - `module_laboratory_icon.png`: Um microscópio ou um béquer.
- **Outros Ícones de Módulo**:
    - `module_engine_icon.png`: Uma hélice ou turbina.

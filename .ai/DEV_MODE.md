# 🔧 Modo de Desenvolvimento

O projeto Nomad Space inclui um sistema de modo de desenvolvimento que permite ativar visualizações e ferramentas de debug úteis durante o desenvolvimento.

## 🎮 Como Usar

Abra o console do navegador (F12) e use os seguintes comandos:

### Comandos Disponíveis

```javascript
// Ativar modo de desenvolvimento
devMode.enable()

// Desativar modo de desenvolvimento
devMode.disable()

// Alternar entre ativo/inativo
devMode.toggle()

// Ver status atual
devMode.status()
```

## 🎨 Funcionalidades do Modo Dev

### 1. **Visualização da Zona de Buffer**
Quando ativado, mostra visualmente a zona de buffer de 200px nas bordas do mundo:
- **Área vermelha semi-transparente**: Zona onde a desaceleração é aplicada
- **Linha vermelha grossa**: Limites absolutos do mundo
- **Label**: Indicador "BUFFER ZONE (200px)" no canto superior esquerdo

### 2. **Indicador no Debug UI**
Quando ativado, mostra "🔧 MODO DEV ATIVO" no painel de debug superior esquerdo.

### 3. **Feedback Visual**
O console mostra mensagens coloridas quando você ativa/desativa o modo:
- **Verde**: Modo ativado
- **Vermelho**: Modo desativado

## 📋 Exemplos de Uso

### Testar Limites do Mundo
```javascript
// 1. Ativar modo dev
devMode.enable()

// 2. Navegar até as bordas do mundo
// 3. Observar a zona de buffer vermelha
// 4. Verificar a desaceleração no painel de debug

// 5. Quando terminar
devMode.disable()
```

### Alternar Rapidamente
```javascript
// Atalho: pressione várias vezes para visualizar on/off
devMode.toggle()
```

## 🔍 Informações Técnicas

- **Singleton Pattern**: Uma única instância compartilhada em todo o jogo
- **Reactive**: Mudanças são propagadas automaticamente para todos os listeners
- **Performance**: Elementos de debug são ocultados (não destruídos) quando desativados
- **Persistência**: O estado não persiste entre reloads da página

## 📁 Arquivos Relacionados

- `src/lib/game/utils/DevMode.ts` - Sistema de gerenciamento do modo dev
- `src/lib/game/scenes/MainScene.ts` - Visualização da zona de buffer

## 🚀 Próximas Funcionalidades (Planejadas)

- [ ] Visualização de hitboxes
- [ ] Grid de coordenadas
- [ ] Contador de entidades ativas
- [ ] Profiler de performance
- [ ] God mode / No-clip

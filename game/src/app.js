import { Game, AUTO, Scale } from 'phaser'
import { PreloadScene } from './scenes/preload'
import { MenuScene } from './scenes/menu'
import { PlayScene } from './scenes/play'

import UtteranceListener from './lib/utterance-listener'

console.log('create')
window.utterances = new UtteranceListener()
console.log(window.utterances)
const config = {
  type: AUTO,
  width: 348,
  height: 196,
  zoom: 3,
  pixelArt: true,
  scene: [PreloadScene, MenuScene, PlayScene],
  scale: {
    mode: Scale.FIT,
    autoCenter: Scale.CENTER_BOTH
  },
  physics: {
    default: 'arcade',
    arcade: {
      debug: true
    }
  },
  backgroundColor: 0x000000
}

function newGame () {
  if (game) return
  game = new Game(config)
}

function destroyGame () {
  if (!game) return
  game.destroy(true)
  game.runDestroy()
  game = null
}

let game

if (module.hot) {
  module.hot.dispose(destroyGame)
  module.hot.accept(newGame)
}

if (!game) newGame()

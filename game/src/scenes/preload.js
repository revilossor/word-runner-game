import getConfig from '../config'
import Phaser from 'phaser'

const { baseURL } = getConfig()

export class PreloadScene extends Phaser.Scene {
  constructor () {
    super('PreloadScene')
  }

  preload () {
    this.load.setBaseURL(baseURL)
    this.load.image('menu_word', 'images/menu_word.png')
    this.load.image('menu_runner', 'images/menu_runner.png')
    this.load.image('menu_say', 'images/menu_say.png')
    this.load.image('menu_start', 'images/menu_start.png')

    this.load.bitmapFont('font_word', 'fonts/Teletactile.png', 'fonts/Teletactile.xml')
    this.load.bitmapFont('font_speak', 'fonts/PixelMix.png', 'fonts/PixelMix.xml')

    this.load.image('play_floor', 'images/play_floor.png')
    this.load.image('play_ground', 'images/play_ground.png')

    this.load.image('play_jump_trigger', 'images/play_jump_trigger.png')
    this.load.spritesheet('play_cactii', 'images/play_trees_sheet.png', {
      frameWidth: 25,
      frameHeight: 50
    })
    this.load.spritesheet('play_dino', 'images/play_man_sheet.png', {
      frameWidth: 44,
      frameHeight: 47
    })
  }

  create () {
    this.scene.start('MenuScene')
  }
}

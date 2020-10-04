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
    this.load.image('menu_press', 'images/menu_press.png')
    this.load.image('menu_space', 'images/menu_space.png')
    this.load.image('menu_say', 'images/menu_say.png')
    this.load.image('menu_start', 'images/menu_start.png')

    // this.load.bitmapFont('font_retro', 'fonts/RetroGaming.png', 'fonts/RetroGaming.xml')
    this.load.bitmapFont('font_word', 'fonts/Teletactile.png', 'fonts/Teletactile.xml')
    this.load.bitmapFont('font_speak', 'fonts/PixelMix.png', 'fonts/PixelMix.xml')

    this.load.image('play_floor', 'images/play_floor.png')
    this.load.image('play_ground', 'images/play_ground.png')
    this.load.image('play_cat', 'images/play_cat.png')
    this.load.image('play_obstacle', 'images/play_obstacle.png')
    this.load.image('play_jump_trigger', 'images/play_jump_trigger.png')
  }

  create () {
    this.scene.start('MenuScene')
  }
}

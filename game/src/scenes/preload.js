import getConfig from '../config'
import Phaser from 'phaser'

const { baseURL } = getConfig()

export class PreloadScene extends Phaser.Scene {
  constructor () {
    super('PreloadScene')
  }

  preload () {
    this.load.setBaseURL(baseURL)
    console.log('preload!')
  }

  create () {
    this.scene.start('MenuScene')
  }
}

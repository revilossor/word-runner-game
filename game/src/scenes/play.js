import Phaser from 'phaser'

export class PlayScene extends Phaser.Scene {
  constructor () {
    super('PlayScene')
  }

  create () {
    this.cameras.main.setBackgroundColor('#ff00ff')
  }

  update (time, delta) {

  }
}

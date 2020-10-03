import Phaser from 'phaser'

const objects = {}

const introDuration = 1000

export class PlayScene extends Phaser.Scene {
  constructor () {
    super('PlayScene')
  }

  create () {
    objects.floor = this.add.sprite(0, 150, 'play_floor')

    objects.floor.setAlpha(0)

    this.time.addEvent({
      delay: introDuration,
      callback: () => {
        console.log('intro complete')
      }
    })

    this.tweens.add({
      targets: objects.floor,
      alpha: 0.9,
      duration: introDuration,
      ease: 'Sine.easeIn'
    })

    objects.mshape = this.add.graphics()
    objects.mshape.fillStyle(0xffff00, 1)
    objects.mshape.fillRect(0, 0, 16, 16)

    this.physics.add.existing(objects.mshape)
    objects.mshape.body.setSize(16, 16)
    objects.mshape.body.velocity.x = 500
    objects.mshape.body.velocity.y = 0
    objects.mshape.body.bounce.x = 1
    objects.mshape.body.bounce.y = 1
    objects.mshape.body.collideWorldBounds = true
    this.physics.world.setBounds(0, 0, this.game.config.width, this.game.config.height)
  }
}

import Phaser from 'phaser'

const objects = {}

const introDuration = 1000
const acceleration = 6

export class PlayScene extends Phaser.Scene {
  constructor () {
    super('PlayScene')
  }

  create () {
    objects.floor1 = this.add.sprite(0, 150, 'play_floor')
    objects.floor1.setAlpha(0)
    objects.floor2 = this.add.sprite(696, 150, 'play_floor')
    objects.floor2.setAlpha(0)

    // objects.cat = this.add.graphics()
    // objects.cat.fillStyle(0xffff00, 1)
    // objects.cat.fillRect(0, 0, 16, 16)

    this.tweens.add({
      targets: [objects.floor1, objects.floor2],
      alpha: 1,
      duration: 1000,
      ease: 'Sine.easeIn'
    })

    this.time.addEvent({
      delay: introDuration,
      callback: () => {
        this.tweens.add({
          targets: [objects.floor1, objects.floor2],
          alpha: 0.7,
          duration: introDuration,
          ease: 'Sine.easeIn',
          yoyo: 1,
          loop: -1
        })

        objects.floor1.body.acceleration.x = -acceleration
        objects.floor2.body.acceleration.x = -acceleration
      }
    })

    // objects.mshape = this.add.graphics()
    // objects.mshape.fillStyle(0xffff00, 1)
    // objects.mshape.fillRect(0, 0, 16, 16)
    //
    // this.physics.add.existing(objects.mshape)
    // objects.mshape.body.setSize(16, 16)
    // objects.mshape.body.velocity.x = 500
    // objects.mshape.body.velocity.y = 0
    // objects.mshape.body.bounce.x = 1
    // objects.mshape.body.bounce.y = 1
    // objects.mshape.body.collideWorldBounds = true

    this.physics.add.existing(objects.floor1)
    objects.floor1.body.setSize(348, 16)

    this.physics.add.existing(objects.floor2)
    objects.floor2.body.setSize(348, 16)

    this.physics.world.setBounds(0, 0, this.game.config.width, this.game.config.height)
  }

  update (time, delta) {
    if (objects.floor1.x <= -696) { objects.floor1.x = objects.floor2.x + 696 }
    if (objects.floor2.x <= -696) { objects.floor2.x = objects.floor1.x + 696 }
  }
}

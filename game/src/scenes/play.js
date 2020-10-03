import Phaser from 'phaser'

const objects = {}
let keys

const introDuration = 1000
const velocity = 100

export class PlayScene extends Phaser.Scene {
  constructor () {
    super('PlayScene')
  }

  catHitGround (cat, ground) {
    // console.log('1')
  }

  catHitObstacle (cat, obstacle) {
    console.log('ded')
  }

  create () {
    keys = this.input.keyboard.createCursorKeys()

    this.physics.world.setBounds(0, 0, this.game.config.width, this.game.config.height)

    objects.ground = this.physics.add.sprite(348 / 2, 176, 'play_ground')
      .setImmovable()
      .setAlpha(0.1)

    objects.floor1 = this.physics.add.sprite(0, 150, 'play_floor')
      .setAlpha(0)
    objects.floor2 = this.physics.add.sprite(696, 150, 'play_floor')
      .setAlpha(0)

    objects.cat = this.physics.add.sprite(50, -30, 'play_cat')
      .setGravityY(velocity * 4)

    objects.obstacle = this.physics.add.sprite(450, 127, 'play_obstacle')
      .setImmovable()
      .setAlpha(0)

    this.tweens.add({
      targets: [objects.floor1, objects.floor2, objects.obstacle],
      alpha: 0.8,
      duration: 1000,
      ease: 'Sine.easeIn'
    })
    this.tweens.add({
      targets: [
        objects.floor1.body.velocity,
        objects.floor2.body.velocity,
        objects.obstacle.body.velocity
      ],
      x: -velocity,
      duration: introDuration,
      ease: 'Circ.easeOut'
    })

    this.time.addEvent({
      delay: introDuration,
      callback: () => {
        this.tweens.add({
          targets: [objects.floor1, objects.floor2],
          alpha: 0.55,
          duration: introDuration * 3,
          ease: 'Back',
          yoyo: 1,
          loop: -1
        })
        this.tweens.add({
          targets: objects.ground,
          alpha: 0.25,
          duration: introDuration * 5,
          ease: 'Back',
          yoyo: 1,
          loop: -1
        })
      }
    })

    this.physics.add.collider(objects.cat, objects.ground, this.catHitGround)
    this.physics.add.overlap(objects.cat, objects.obstacle, this.catHitObstacle)
  }

  update (time, delta) {
    if (objects.floor1.x <= -696) { objects.floor1.x = objects.floor2.x + 696 }
    if (objects.floor2.x <= -696) { objects.floor2.x = objects.floor1.x + 696 }
    if (objects.obstacle.x <= -30) { objects.obstacle.x = 400 }

    keys.space.on('up', () => {
      if (objects.cat.body.velocity.y === 0) {
        objects.cat.setVelocityY(-(velocity * 2.5))
      }
    })
  }
}

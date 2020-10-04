import Phaser from 'phaser'
import words from '../lib/words'

const objects = {}
let keys

const introDuration = 1000
const velocity = 120

const interval = 100

let triggered = false

// TODO mic indicator in UI
// TODO show score
// TODO graphics - dino, cactus, clouds - 4 frames of dino
// TODO pass set of words from menu
// TODO sound
// TODO hi scores

let level = 0

export class PlayScene extends Phaser.Scene {
  constructor () {
    super('PlayScene')
    level = 0
  }

  changeWord () {
    objects.word = this.add.bitmapText(-200, 20, 'font_word', words[level])
      .setAlpha(0)
    this.tweens.add({
      targets: objects.word,
      x: 320 - objects.word.width,
      duration: 750,
      ease: 'Back'
    })
    this.tweens.add({
      targets: objects.word,
      alpha: 0.5,
      duration: 500
    })
    this.tweens.add({
      targets: objects.word,
      alpha: 0.2,
      delay: 750,
      duration: 400,
      ease: 'Cerc.easeInOut',
      yoyo: 1,
      repeat: -1
    })
  }

  changeChatter (to) {
    if (objects.chatter.text === to) { return }
    const outTime = 80
    this.tweens.add({
      targets: objects.chatter,
      y: 200,
      duration: outTime
    })
    this.time.addEvent({
      delay: outTime,
      callback: () => {
        objects.chatter.text = to
        this.tweens.add({
          targets: objects.chatter,
          y: 170,
          duration: outTime * 1.2
        })
      }
    })
  }

  gameOver () {
    const d = 2000
    window.utterances.stop()
    Object.values(objects).forEach(obj => {
      if (obj.body) {
        obj.body.velocity.x = 0
        obj.body.velocity.y = 0
      }
      this.tweens.add({
        targets: obj,
        alpha: 0,
        duration: d,
        ease: 'Power4'
      })
    })
    this.time.addEvent({
      delay: d,
      callback: () => {
        this.scene.start('MenuScene')
      }
    })
  }

  onUtterance (utterance) {
    const said = utterance.toLowerCase()
    const expected = words[level].toLowerCase()

    this.changeChatter(utterance)
    if (said.match('menu')) {
      window.utterances.stop()
      this.scene.start('MenuScene')
    } else if (said.match(expected)) {
      triggered = true
      this.tweens.add({
        targets: objects.word,
        x: 350,
        duration: 200,
        ease: 'Sine'
      })
    }
  }

  catHitObstacle (cat, obstacle) {
    this.gameOver()
  }

  catHitTrigger (cat, trigger) {
    if (triggered && objects.cat.body.velocity.y === 0) {
      level = (level + 1) % words.length
      objects.cat.setVelocityY(-(velocity * 2.2))
    }
  }

  create () {
    keys = this.input.keyboard.createCursorKeys()

    this.physics.world.setBounds(0, 0, this.game.config.width, this.game.config.height)

    this.changeWord()

    objects.chatter = this.add.bitmapText(10, 170, 'font_speak', '')
      .setAlpha(0.5)

    objects.ground = this.physics.add.sprite(348 / 2, 176, 'play_ground')
      .setImmovable()
      .setAlpha(0)

    objects.floor1 = this.physics.add.sprite(0, 150, 'play_floor')
      .setAlpha(0)
    objects.floor2 = this.physics.add.sprite(696, 150, 'play_floor')
      .setAlpha(0)

    objects.cat = this.physics.add.sprite(50, -30, 'play_cat')
      .setGravityY(velocity * 4)

    objects.obstacle = this.physics.add.sprite(450, 127, 'play_obstacle')
      .setImmovable()
      .setAlpha(0)

    objects.trigger = this.physics.add.sprite(408, 146, 'play_jump_trigger')
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
        objects.obstacle.body.velocity,
        objects.trigger.body.velocity
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
      }
    })

    this.physics.add.collider(objects.cat, objects.ground)
    this.physics.add.overlap(objects.cat, objects.obstacle, this.catHitObstacle.bind(this))
    this.physics.add.overlap(objects.cat, objects.trigger, this.catHitTrigger)

    window.utterances.listen(this.onUtterance.bind(this))
  }

  update (time, delta) {
    if (objects.floor1.x <= -696) { objects.floor1.x = objects.floor2.x + 696 }
    if (objects.floor2.x <= -696) { objects.floor2.x = objects.floor1.x + 696 }
    if (objects.obstacle.x <= -30) {
      objects.obstacle.x += 348 + interval
      objects.trigger.x += 348 + interval
      if (triggered) {
        this.time.addEvent({
          delay: 100,
          callback: () => {
            objects.word.destroy()
            this.changeWord()
          }
        })
      }
      triggered = false
    }

    keys.space.on('up', () => { // TODO remove me
      this.onUtterance(words[level])
    })
  }
}

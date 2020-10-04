import Phaser from 'phaser'

const objects = {}

let changing = false

export class MenuScene extends Phaser.Scene {
  constructor () {
    super('MenuScene')
  }

  onUtterance (utterance) {
    const said = utterance.toLowerCase()

    if (said.match('start')) {
      this.start()
    }
  }

  create () {
    objects.word = this.add.sprite(-100, 24, 'menu_word')
    objects.runner = this.add.sprite(-130, 60, 'menu_runner')
    objects.word.setAlpha(0.6)

    const i = 400

    objects.say = this.add.sprite(20, 220, 'menu_say')
    objects.start = this.add.sprite(65, 220, 'menu_start')

    objects.say.setAlpha(0.5)
    objects.start.setAlpha(0.7)

    const onLoop = ({ targets }) => {
      const offset = 50 + Math.round(Math.random() * 100)
      targets.forEach(target => {
        target.x += offset
      })
      const mp = targets.reduce((x, y) => x + y.x, 0) / 2
      if (mp > 300) {
        const d = (mp % 300) + 30
        targets.forEach(target => {
          const o = mp - target.x
          target.x = d - o
        })
      }
    }

    this.time.addEvent({
      delay: 1000,
      callback: () => {
        this.tweens.add({ delay: this.tweens.stagger(i * 0.5), onLoop, loopDelay: i * 3, targets: [objects.say, objects.start], y: 180, duration: i * 3, ease: 'Sine.easeInOut', yoyo: 1, loop: -1 })
      }
    })

    this.tweens.add({ targets: objects.word, scale: 0.90, duration: i, ease: 'Sine.easeInOut' })
    this.tweens.add({ targets: objects.word, scale: 1.10, duration: i * 2, ease: 'Sine.easeInOut', yoyo: 1, loop: -1 })
    this.tweens.add({ targets: objects.word, alpha: 1, duration: i * 2, ease: 'Sine.easeInOut', yoyo: 1, loop: -1 })

    this.tweens.add({ targets: objects.runner, scale: 1.10, duration: i, ease: 'Sine.easeInOut' })
    this.tweens.add({ targets: objects.runner, scale: 0.90, duration: i * 2, ease: 'Sine.easeInOut', yoyo: 1, loop: -1 })
    this.tweens.add({ targets: objects.runner, alpha: 0.6, duration: i * 2, ease: 'Sine.easeInOut', yoyo: 1, loop: -1 })

    this.tweens.add({ targets: objects.word, x: 74, duration: i * 2, ease: 'Circ.easeIn' })
    this.tweens.add({ targets: objects.runner, x: 95, duration: i * 2, ease: 'Circ.easeIn', delay: i })

    window.utterances.listen(this.onUtterance.bind(this))
  }

  start () {
    if (changing === false) {
      changing = true
      this.tweens.add({
        targets: objects.word,
        x: 750,
        duration: 400,
        ease: 'Sine.easeOut'
      })
      this.tweens.add({
        targets: objects.runner,
        x: 500,
        duration: 500,
        delay: 150,
        ease: 'Sine.easeOut'
      })
      this.tweens.add({
        targets: [objects.say, objects.start, objects.press, objects.space],
        y: 1000,
        duration: 5000,
        ease: 'Sine.easeOut'
      })
      this.time.addEvent({
        delay: 500,
        callback: () => {
          changing = false
          this.scene.start('PlayScene')
        }
      })
    }
  }
}

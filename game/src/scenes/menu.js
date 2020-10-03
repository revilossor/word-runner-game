import Phaser from 'phaser'

export class MenuScene extends Phaser.Scene {
  constructor () {
    super('MenuScene')
  }

  create () {
    const word = this.add.sprite(-100, 24, 'menu_word')
    const runner = this.add.sprite(-130, 60, 'menu_runner')
    word.setAlpha(0.6)

    const i = 400

    const press = this.add.sprite(270, 220, 'menu_press')
    const space = this.add.sprite(320, 220, 'menu_space')

    press.setAlpha(0.5)
    space.setAlpha(0.7)

    const say = this.add.sprite(20, 220, 'menu_say')
    const start = this.add.sprite(65, 220, 'menu_start')

    say.setAlpha(0.5)
    start.setAlpha(0.7)

    const onLoop = ({ targets }) => {
      const offset = 10 + Math.round(Math.random() * 80)
      targets.forEach(target => {
        target.x += offset
      })
      const mp = targets.reduce((x, y) => x + y.x, 0) / 2
      if (mp > 300) {
        const d = (mp % 300) + 20
        targets.forEach(target => {
          const o = mp - target.x
          target.x = d - o
        })
      }
    }
    this.tweens.add({ onLoop, loopDelay: 800, targets: [say, start], y: 180, duration: i * 3, ease: 'Sine.easeInOut', yoyo: 1, loop: -1 })
    this.tweens.add({ onLoop, loopDelay: 1400, targets: [press, space], y: 180, duration: i * 3, ease: 'Sine.easeInOut', yoyo: 1, loop: -1 })

    this.tweens.add({ targets: word, scale: 0.90, duration: i, ease: 'Sine.easeInOut' })
    this.tweens.add({ targets: word, scale: 1.10, duration: i * 2, ease: 'Sine.easeInOut', yoyo: 1, loop: -1 })
    this.tweens.add({ targets: word, alpha: 1, duration: i * 2, ease: 'Sine.easeInOut', yoyo: 1, loop: -1 })

    this.tweens.add({ targets: runner, scale: 1.10, duration: i, ease: 'Sine.easeInOut' })
    this.tweens.add({ targets: runner, scale: 0.90, duration: i * 2, ease: 'Sine.easeInOut', yoyo: 1, loop: -1 })
    this.tweens.add({ targets: runner, alpha: 0.6, duration: i * 2, ease: 'Sine.easeInOut', yoyo: 1, loop: -1 })

    this.tweens.add({ targets: word, x: 74, duration: i * 2, ease: 'Circ.easeIn' })
    this.tweens.add({ targets: runner, x: 95, duration: i * 2, ease: 'Circ.easeIn', delay: i })
  }
}

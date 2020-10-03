const generator = require('@rtpa/phaser-bitmapfont-generator');

(async () => {
  // generate textures
  await generator.TextStyle2BitmapFont({
    path: './assets/fonts',
    fileName: 'RetroGaming',
    textStyle: {
      fontFamily: 'RetroGaming',
      fontSize: '32px',
      fixedWidth: 20
    },
    antialias: false
  })

  return process.exit(0)
})()

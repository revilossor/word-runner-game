const generator = require('@rtpa/phaser-bitmapfont-generator');

(async () => {
  // generate textures
  // await generator.TextStyle2BitmapFont({
  //   path: './assets/fonts',
  //   fileName: 'RetroGaming',
  //   textStyle: {
  //     fontFamily: 'RetroGaming',
  //     fontSize: '32px'
  //   },
  //   antialias: false
  // })
  await generator.TextStyle2BitmapFont({
    path: './assets/fonts',
    fileName: 'Teletactile',
    textStyle: {
      fontFamily: 'Teletactile',
      fontSize: '32px'
    },
    antialias: false
  })

  return process.exit(0)
})()

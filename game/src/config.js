const config = {
  dev: {
    baseURL: 'https://revilossor.github.io/word-runner-game/release/'
  }
}

export default () => {
  const stage = process.env.STAGE || 'dev'
  return config[stage]
}

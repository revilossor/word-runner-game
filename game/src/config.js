const config = {
  dev: {
    baseURL: 'https://revilossor.github.io/word-runner-game/release/'
    // baseURL: 'http://localhost:8000'
  }
}

export default () => {
  const stage = process.env.STAGE || 'dev'
  return config[stage]
}

const config = {
  dev: {
    baseURL: 'http://localhost:8000'
  }
}

export default () => {
  const stage = process.env.STAGE || 'dev'
  return config[stage]
}

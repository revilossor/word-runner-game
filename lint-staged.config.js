module.exports = {
  '*.js': files => [
    ...files.map(file => `standard ${file} --fix`),
    ...files.map(file => `git add ${file}`)
  ],
  '*.json': files => [
    ...files.map(file => `jsonlint ${file} -si`),
    ...files.map(file => `git add ${file}`)
  ]
}

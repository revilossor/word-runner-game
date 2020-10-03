export default class UtteranceListener {
  constructor (utterances) {
    const Grammar = window.SpeechGrammarList || window.webkitSpeechGrammarList
    const Recogniser = window.SpeechRecognition || window.webkitSpeechRecognition

    if (!utterances || utterances.length === 0) { throw Error('expected an utterance list') }

    const grammar = `#JSGF V1.0; grammar utterances; public <utterance> = ${utterances.join(' | ')} ;`
    this.speechRecognitionList = new Grammar()
    this.speechRecognitionList.addFromString(grammar, 1)

    this.utterances = utterances
    this.Recogniser = Recogniser
  }

  listen (handler) { // TODO listen for speech, listen for utterance
    const recognition = new this.Recogniser()
    recognition.grammars = this.speechRecognitionList
    recognition.maxAlternatives = 1
    recognition.continuous = true
    recognition.interimResults = true

    recognition.onerror = ({ error }) => {
      if (error !== 'aborted') {
        throw Error('there was an error with recognition : ' + error)
      }
    }
    recognition.onend = () => {
      recognition.start()
    }
    recognition.onresult = event => {
      const result = event.results[event.results.length - 1]
      const utterance = result[0].transcript
      if (utterance && handler) {
        handler(utterance.toLowerCase())
      }
    }

    recognition.start()
    this.recognition = recognition
  }

  stop () { // TODO unit test me!
    this.recognition.abort()
  }
}

import words from './words'

export default class UtteranceListener {
  constructor () {
    const Grammar = window.SpeechGrammarList || window.webkitSpeechGrammarList
    const Recogniser = window.SpeechRecognition || window.webkitSpeechRecognition

    const grammar = `#JSGF V1.0; grammar utterances; public <utterance> = ${words.join(' | ')} ;`
    this.speechRecognitionList = new Grammar()
    this.speechRecognitionList.addFromString(grammar, 1)

    this.Recogniser = Recogniser
  }

  listen (handler) {
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

    recognition.onstart = () => {
      console.log('start!')
    }
    recognition.onend = () => {
      console.log('end!')
    }
    this.recognition = recognition
  }

  stop () {
    this.recognition.stop()
    // this.recognition.abort()
  }
}

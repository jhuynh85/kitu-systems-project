import React, { Component } from 'react'
import axios from 'axios'
import './Main.css'
import Arena from '../Arena/Arena'

import TrophyImg from '../../assets/images/trophy.png'

class Main extends Component {
  constructor (props) {
    super(props)
    this.state = {
      word: '',
      hint: '',
      guessedLetters: [],
      lettersRemaining: 99,
      guessesRemaining: 99,
      incorrectLetters: [],
      wordState: [],
      macHP: 100,
      mikeHP: 100,
      score: 0
    }

    this.getNewWord = this.getNewWord.bind(this)
    this.win = this.win.bind(this)
    this.lose = this.lose.bind(this)
    this.reset = this.reset.bind(this)
    this.handleKeyDown = this.handleKeyDown.bind(this)
    this.checkLetter = this.checkLetter.bind(this)
    this.calculateMacHP = this.calculateMacHP.bind(this)
    this.calculateMikeHP = this.calculateMikeHP.bind(this)
  }

  // Gets a random word from the API
  async getNewWord () {
    // Get a new word
    const newWord = await axios.get('/api/random')
    const { word, hint } = newWord.data
    this.setState({ word, hint })
    return { word, hint }
  }

  // Start a new round
  async reset () {
    const { word, hint } = await this.getNewWord()
    this.setState({
      word,
      hint,
      guessedLetters: [],
      lettersRemaining: word.length,
      guessesRemaining: 6,
      incorrectLetters: [],
      wordState: '_'.repeat(word.length).split(''),
      macHP: 100,
      mikeHP: 100
    })
  }

  async win () {
    await this.reset()
    this.setState({ score: this.state.score + 1 })
  }

  async lose () {
    await this.reset()
  }

  async componentDidMount () {
    document.addEventListener('keydown', this.handleKeyDown, false)
    await this.reset()
  }

  componentWillUnmount () {
    document.removeEventListener('keydown', this.handleKeyDown, false)
  }

  // Handles key presses by user
  // Only accepts alphabet chars
  handleKeyDown (event) {
    // Accept only letter key presses
    if (event.keyCode >= 65 && event.keyCode <= 90) {
      // Check if letter exists in word
      this.checkLetter(event.key)
      this.calculateMacHP()
      this.calculateMikeHP()
    }
  }

  // Check if the current word contains the given letter
  checkLetter (c) {
    // Check if letter has already been guessed before
    if (this.state.guessedLetters.indexOf(c) !== -1) {
      // Letter has been already guessed, do nothing
      return
    }

    // Add letter to list of guessed letters
    this.setState({ guessedLetters: [...this.state.guessedLetters, c] })

    let found = false // Flags whether a letter was found
    let currentWordState = this.state.wordState.slice() // Copy wordState array
    let currentLettersRemaining = this.state.lettersRemaining

    // Check if current word contains the given letter and reveal them in currentWordState
    for (let i = 0; i < this.state.word.length; i++) {
      // Letter found
      if (c === this.state.word.charAt(i)) {
        currentWordState[i] = c
        currentLettersRemaining--
        found = true
      }
    }

    if (found) {
      // Perform punch animation
      this.setState({
        wordState: currentWordState,
        lettersRemaining: currentLettersRemaining
      })
      // Trigger win if there are no letters left
      if (currentLettersRemaining === 0) {
        this.win()
      }
    } else {
      let currentIncorrectLetters = this.state.incorrectLetters.slice()
      let currentGuessesRemaining = this.state.guessesRemaining
      // Add to list of incorrect letters
      currentIncorrectLetters.push(c)
      currentGuessesRemaining--
      this.setState({
        incorrectLetters: currentIncorrectLetters,
        guessesRemaining: currentGuessesRemaining
      })
      // Trigger lose if there are no guesses left
      if (currentGuessesRemaining === 0) {
        this.lose()
      }
      // Perform miss animation
    }
  }

  calculateMacHP () {
    let macHP = Math.floor((this.state.guessesRemaining / 6) * 100)
    this.setState({ macHP })
  }

  calculateMikeHP () {
    let mikeHP = Math.floor((this.state.lettersRemaining / this.state.word.length) * 100)
    this.setState({ mikeHP })
  }

  render () {
    return (
      <div>
        <div className={'main'}>
          <h1>Main</h1>
          <Arena macHP={this.state.macHP} mikeHP={this.state.mikeHP}/>
          <div className={'score-container'}>
            <img src={TrophyImg} alt={'Trophy image'}/> x {this.state.score}
          </div>
          <div>
            Word: {this.state.word}
          </div>
          <div>
            Wordstate: {this.state.wordState.join(' ')}
          </div>
          <div>
            Incorrect letters: {this.state.incorrectLetters.join(' ')}
          </div>
          <div>
            {}
          </div>
        </div>
      </div>
    )
  }
}

export default Main

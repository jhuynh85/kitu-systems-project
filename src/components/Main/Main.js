import React, { Component } from 'react'
import axios from 'axios'
import './Main.css'
import Arena from '../Arena/Arena'
import Modal from '../Modal/Modal'

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
      status: 'idle',
      macHP: 100,
      mikeHP: 100,
      score: 0,
      showModal: false
    }

    this.getNewWord = this.getNewWord.bind(this)
    this.win = this.win.bind(this)
    this.lose = this.lose.bind(this)
    this.reset = this.reset.bind(this)
    this.handleKeyDown = this.handleKeyDown.bind(this)
    this.checkLetter = this.checkLetter.bind(this)
    this.calculateMacHP = this.calculateMacHP.bind(this)
    this.calculateMikeHP = this.calculateMikeHP.bind(this)
    this.hit = this.hit.bind(this)
    this.miss = this.miss.bind(this)
    this.showModal = this.showModal.bind(this)
    this.hideModal = this.hideModal.bind(this)
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
      // Check whether it's a hit or miss
      this.checkLetter(event.key)
    }
  }

  // Function to check if the current word contains the given letter
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
      this.setState({
        wordState: currentWordState,
        lettersRemaining: currentLettersRemaining
      })
      this.calculateMikeHP()
      this.hit()
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
      this.calculateMacHP()
      this.miss()
    }
  }

  // Calculate Mac's remaining HP percentage
  calculateMacHP () {
    let macHP = Math.floor((this.state.guessesRemaining / 6) * 100)
    this.setState({ macHP })
  }

  // Calculate Mike's remaining HP percentage
  calculateMikeHP () {
    let mikeHP = Math.floor((this.state.lettersRemaining / this.state.word.length) * 100)
    this.setState({ mikeHP })
  }

  // Sets status to 'hit' for 500ms before changing back to 'idle'
  hit () {
    this.setState({ status: 'hit' })
    setTimeout(() => {
      this.setState({ status: 'idle' })
      // Trigger win if there are no letters left
      if (this.state.lettersRemaining === 0) {
        this.win()
      }
    }, 750)
  }

  // Sets status to 'miss' for 500ms before changing back to 'idle'
  miss () {
    this.setState({ status: 'miss' })
    setTimeout(() => {
      this.setState({ status: 'idle' })
      // Trigger lose if there are no guesses left
      if (this.state.guessesRemaining === 0) {
        this.lose()
      }
    }, 750)
  }

  showModal () {
    this.setState({ showModal: true })
    document.removeEventListener('keydown', this.handleKeyDown, false)
  }

  hideModal () {
    this.setState({ showModal: false })
    document.addEventListener('keydown', this.handleKeyDown, false)
  }

  render () {
    return (
      <div>
        <div className={'main'}>
          <h1>Main</h1>
          <Arena status={this.state.status} macHP={this.state.macHP} mikeHP={this.state.mikeHP}/>
          <div className={'score-container'}>
            <img src={TrophyImg} alt={'Trophy image'}/> x&nbsp;
            <div className={'score'}>{this.state.score}</div>
          </div>
          <div>
            {this.state.word}
          </div>
          <div className={'wordState'}>
            {this.state.wordState.join(' ')}
          </div>
          <div>
            Incorrect letters: {this.state.incorrectLetters.join(' ')}
          </div>
        </div>
        <div>
          <Modal show={this.state.showModal} handleClose={this.hideModal}>
            <p>Modal</p>
            <p>Data</p>
          </Modal>
          <button type='button' onClick={this.showModal}>
            Open
          </button>
        </div>
      </div>
    )
  }
}

export default Main

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
      wordBank: [],
      status: 'idle',
      macHP: 100,
      mikeHP: 100,
      score: 0,
      showModal: false,
      modal: 'list',
      wordInput: '',
      hintInput: ''
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
    this.loadWordBank = this.loadWordBank.bind(this)
    this.deleteWord = this.deleteWord.bind(this)
    this.handleInputChange = this.handleInputChange.bind(this)
    this.addNewWord = this.addNewWord.bind(this)
  }

  // Gets a random word from the API
  async getNewWord () {
    // Get a new word
    try {
      const newWord = await axios.get('/api/random')
      const { word, hint } = newWord.data
      this.setState({ word, hint })
      return { word, hint }
    } catch (e) {
      console.log(e)
    }
  }

  // Start a new round
  async reset () {
    try {
      const { word, hint } = await this.getNewWord()
      if (word && hint) {
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
      } else {
        window.alert('Word bank is empty, unable to get a new word!')
      }
    } catch (e) {
      console.log(e)
    }
  }

  // Increments the score and resets the board
  async win () {
    await this.reset()
    this.setState({ score: this.state.score + 1 })
  }

  // Resets the board
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
    this.loadWordBank()
    this.setState({ showModal: true })
    document.removeEventListener('keydown', this.handleKeyDown, false)
  }

  hideModal () {
    this.setState({ showModal: false })
    document.addEventListener('keydown', this.handleKeyDown, false)
  }

  // Gets the word bank from API and saves to state
  async loadWordBank () {
    const wordBank = await axios.get('/api/all')
    this.setState({ wordBank: wordBank.data })
  }

  // Deletes word from word bank
  async deleteWord (word) {
    await axios.delete(`/api/${word}`)
  }

  // Adds/overwrites word and its hint to the word bank
  // Checks to see if user input is valid
  async addNewWord ({ word, hint }) {
    const letterRegex = RegExp('^[a-zA-Z]+$')
    if (letterRegex.test(word)) {
      await axios.put(`/api/${word}`, { hint })
      this.setState({
        wordInput: '',
        hintInput: ''
      })
      this.hideModal()
    } else {
      window.alert('Invalid input. Word must only consist of alphabet letters.')
    }
  }

  handleInputChange (event) {
    const target = event.target
    const name = target.name
    const value = target.value
    this.setState({ [name]: value })
  }

  render () {
    return (
      <div>
        <div className={'main'}>
          <h1>Mike Tyson's Super Hangman Punchout (React Edition)</h1>
          <div className={'arena-container'}>
            <Arena status={this.state.status} macHP={this.state.macHP} mikeHP={this.state.mikeHP}/>
            <div className={'btnContainer'}>
              <div className={'modal-text'}>
                {this.state.modal === 'list' &&
                <Modal show={this.state.showModal} handleClose={this.hideModal}>
                  <p>WORD BANK</p>
                  <ul className={'wordBank-list'}>
                    {Object.keys(this.state.wordBank).map(wordObj => {
                      return (
                        <li key={wordObj}>{wordObj}
                          <span className={'red clickable'} title={'Delete from word bank'} onClick={() => {
                            this.deleteWord(wordObj)
                            this.loadWordBank()
                          }}> X</span>
                          <br/>
                          <span className={'small-text'}>{this.state.wordBank[wordObj]}</span>
                          <br/><br/>
                        </li>
                      )
                    })}
                  </ul>
                </Modal>}
                {this.state.modal === 'add' &&
                <Modal show={this.state.showModal} handleClose={this.hideModal}>
                  <p>ADD NEW WORD</p>
                  <form className={'align-left'}>
                    <label>
                      Word:
                      <textarea name={'wordInput'} value={this.state.wordInput} onChange={this.handleInputChange}/>
                    </label>
                    <br/>
                    <label>
                      Hint:
                      <textarea name={'hintInput'} value={this.state.hintInput} onChange={this.handleInputChange}/>
                    </label>
                    <br/>
                  </form>
                  <div className={'btn'} onClick={() => {
                    this.addNewWord({ word: this.state.wordInput, hint: this.state.hintInput })
                  }}>SUBMIT
                  </div>
                </Modal>}
                <div className={'btn'} title={'View word bank'} onClick={() => {
                  this.setState({ modal: 'list' })
                  this.showModal()
                }}>VIEW
                </div>
                <div className={'btn'} title={'Add or update a word'} onClick={() => {
                  this.setState({ modal: 'add' })
                  this.showModal()
                }}>ADD/EDIT
                </div>
                <div className={'btn'} title={'Get another word'} onClick={this.reset}>
                  RESET
                </div>
              </div>
            </div>
          </div>
          <div className={'score-container'}>
            <img src={TrophyImg} alt={'Trophy'}/> x&nbsp;
            <div className={'score'}>{this.state.score}</div>
          </div>
          <div>Type a letter and guess the word!</div>
          <br/>
          <div className={'hint'}>
            HINT: {this.state.hint}
          </div>
          <div className={'wordState'}>
            {this.state.wordState.join(' ')}
          </div>
          <br/>
          <div>
            Incorrect letters:
          </div>
          <div className={'incorrect-letters'}>
            {this.state.incorrectLetters.join(' ')}
          </div>
        </div>
      </div>
    )
  }
}

export default Main

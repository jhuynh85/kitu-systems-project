// ============== DEPENDENCIES =============== //
const express = require('express')
const bodyParser = require('body-parser')
const path = require('path')

// ============== INITIALIZE EXPRESS APP & SETUP FOR DATA PARSING===============//
const app = express()
const port = process.env.PORT || 5000

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.text())
app.use(bodyParser.json({ type: 'application/vnd.api+json' }))

// =============== SERVE STATIC ASSETS =============== //
app.use(express.static(path.resolve(__dirname, '..', 'dist')))

// =============== API ROUTES =============== //
const WORD_BANK = require('./wordBank')

// Get word bank
app.get('/api/all', function (req, res) {
  res.json(WORD_BANK)
})

// Add or update a word in the word bank
// and returns JSON of updated word bank
app.put('/api/:word', function (req, res) {
  const { word } = req.params
  // Check for valid request
  if (req.body && req.body.hint) {
    WORD_BANK[word] = req.body.hint
    res.json(WORD_BANK)
  } else {
    res.status(400).send('Bad Request')
  }
})

// Deletes a word from the word bank and returns
// JSON of updated word bank
app.delete('/api/:word', function (req, res) {
  const { word } = req.params
  // Delete word from word bank if it exists
  if (WORD_BANK[word]) {
    delete WORD_BANK[word]
    res.json(WORD_BANK)
  } else {
    res.status(400).send('Word does not exist!')
  }
})

// Always return the main index.html
app.get('*', (req, res) => {
  res.sendFile(path.resolve(__dirname, '..', 'dist', 'index.html'))
})

// =============== STARTING THE SERVER =============== //
const server = app.listen(port, () =>
  console.log('App listening on PORT ' + port)
)

// Export server for testing
module.exports = server

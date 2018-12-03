require('babel-polyfill')
const request = require('supertest')
const server = require('./index.js')

// Default initial word bank
const WORD_BANK = require('./wordBank')

// Close the server after each test
afterEach(() => {
  server.close()
})

// Dummy request to be used for testing
const req = { 'word': 'object', 'hint': 'This is a hint' }

// Test root
describe('GET /', () => {
  it('should respond with a 200 status', async () => {
    const response = await request(server).get('/')
    expect(response.status).toEqual(200)
  })
})

// Test GET route
describe('GET /api/all', () => {
  it('should respond with a 200 status', async () => {
    const response = await request(server).get('/api/all')
    expect(response.status).toEqual(200)
  })

  it('should respond with word bank JSON', async () => {
    const response = await request(server).get('/api/all')
    expect(response.body).toEqual(WORD_BANK)
  })
})

// Test PUT route
describe('PUT /api/:word', () => {
  it('should respond with a 200 status when the request is valid', async () => {
    const response = await request(server)
      .put(`/api/${req.word}`)
      .send(req)
    expect(response.status).toEqual(200)
  })

  it('should respond with a 400 status when the request is invalid', async () => {
    const response = await request(server)
      .put(`/api/${req.word}`)
      .send()
    expect(response.status).toEqual(400)
  })

  it('should update the word bank entry with the new word/hint', async () => {
    const response = await request(server)
      .put(`/api/${req.word}`)
      .send(req)
    const updatedWordBank = response.body
    expect(updatedWordBank[req.word]).toEqual(req.hint)
  })

  it('should respond with JSON of the newly updated word bank', async () => {
    const updatedWordBank = Object.assign({}, WORD_BANK)
    updatedWordBank[req.word] = req.hint
    const response = await request(server)
      .put(`/api/${req.word}`)
      .send(req)
    expect(response.body).toEqual(updatedWordBank)
  })
})

// Test DELETE route
describe('DELETE /api/:word', () => {
  it('should respond with a 400 status if the word bank does not contain the word', async () => {
    const response = await request(server).delete(`/api/flubber`)
    expect(response.status).toEqual(400)
  })

  it('should delete the word from the word bank if the word exists', async () => {
    const updatedWordBank = Object.assign({}, WORD_BANK)
    delete updatedWordBank[req.word]
    const response = await request(server).delete(`/api/${req.word}`)
    expect(response.body).toEqual(updatedWordBank)
  })
})

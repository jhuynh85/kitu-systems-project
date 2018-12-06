## Mike Tyson's Super Hangman Punchout! (React Edition)
by Joseph Huynh

Deployed at: https://hangman-react-edition.herokuapp.com/

This application a hangman game which consists of a React frontend and a 
Node/Express backend. The frontend displays the graphical interface while the backend
provides the list of available words. API routes are available to retrieve or modify 
the word bank by adding or deleting words.  For the sake of convenience, the word bank is stored
in memory on the backend and not in a database.

Note: Users make guesses by pressing their keyboard keys. As such,
this application is not playable on a mobile device

### Technologies

* Node
* Express
* React
* webpack
* Babel
* Jest
* Enzyme
* supertest

### Information

To install the necessary modules, run `npm install` while in the application's root directory.
React files can be found in the `/src` directory and Node files in the `/server` directory.
Compiled frontend files are stored in the `/dist` directory.

##### Development
Use `npm run dev` to run the application while developing. This will automatically run
the backend server in addition to starting the application in watch mode. In this mode,
any changes to the frontend files will automatically trigger a rebuild. The application
can be accessed at `http://localhost:8080` while in this mode. 

##### Production
Use `npm run build` to build the application with production optimizations. Once built, 
serve the application locally using the `node ./server` command. Then navigate to `http://localhost:4000` on
your browser.

#### API

The backend API consists of four routes

| Route | Description | Request data | Response data |
|:---:|---|:---:|:---:|
|`GET /api/all`|Gets the entire word bank| N/A | `{'react': 'A frontend framework', 'apple': 'A fruit', 'jest': 'A testing library'}` |
|`GET /api/random`|Gets a random word and its associated hint| N/A | `{'word': 'React', 'hint': 'A frontend framework'}`|
|`PUT /api/:word`|Adds a word and its hint to the word bank. If the word already exists, it will be overwritten with the new data.| `{'hint': 'This is a hint for :word'}`|N/A |
|`DELETE /api/:word`|Deletes a word from the word bank| N/A | N/A|


### Code-style

ESlint with [JavaScript Standard Style](https://standardjs.com/)
rules is used to maintain code consistency.

### Testing

Jest, Enzyme, and supertest are used for unit and integration 
testing. Test coverage information is automatically displayed after tests are
ran and can also be found in the `/coverage` directory.

`npm test` - Run all tests  
`npm run test:api` - Run only API tests
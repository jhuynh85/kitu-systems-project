import React, { Component } from 'react'
import './Main.css'
import Arena from '../Arena/Arena'

class Main extends Component {
  render () {
    return (
      <div>
        <div className={'main'}>
          <h1>Main</h1>
          <Arena/>
        </div>
      </div>
    )
  }
}

export default Main

import React, { Component } from 'react'
import './Arena.css'
import RingImg from '../../assets/images/ring.jpg'
import Mac from '../Mac/Mac'
import Mike from '../Mike/Mike'
import HealthBars from '../HealthBars/HealthBars'

class Arena extends Component {
  constructor (props) {
    super(props)
    this.state = {
      mikeStatus: '',
      macStatus: '',
      macHP: 100,
      mikeHP: 100
    }

    this.hit = this.hit.bind(this)
  }

  hit () {
    this.setState({ mikeStatus: 'isPunched', macStatus: 'isPunching' })
  }

  render () {
    return (
      <div className={'arena'}>
        <img className={'ring-img'} src={RingImg}/>
        <Mac status={this.state.macStatus}/>
        <Mike status={this.state.mikeStatus}/>
        <HealthBars macHP={this.state.macHP} mikeHP={this.state.mikeHP}/>
      </div>)
  }
}

export default Arena

import React, { Component } from 'react'
import './Arena.css'
import RingImg from '../../assets/images/ring.jpg'
import Mac from '../Mac/Mac'
import Mike from '../Mike/Mike'
import HealthBar from '../HealthBar/HealthBar'

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
        <img className={'ring-img'} src={RingImg} alt={'Boxing ring image'}/>
        <Mac status={this.state.macStatus}/>
        <Mike status={this.state.mikeStatus}/>
        <HealthBar color={'white'} percent={100} bottom={'14px'} left={'10px'}/>
        <HealthBar color={'red'} percent={11} bottom={'14px'} right={'10px'}/>
      </div>)
  }
}

export default Arena

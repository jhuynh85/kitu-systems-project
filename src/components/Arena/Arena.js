import React, { Component } from 'react'
import PropTypes from 'prop-types'
import './Arena.css'
import RingImg from '../../assets/images/ring.jpg'
import Mac from '../Mac/Mac'
import Mike from '../Mike/Mike'
import HealthBar from '../HealthBar/HealthBar'

class Arena extends Component {
  constructor (props) {
    super(props)
    this.state = {
      macStatus: '',
      mikeStatus: ''
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
        <HealthBar color={'white'} percent={this.props.macHP} bottom={'14px'} left={'10px'}/>
        <HealthBar color={'red'} percent={this.props.mikeHP} bottom={'14px'} right={'10px'}/>
      </div>)
  }
}

Arena.propTypes = {
  macHP: PropTypes.number.isRequired,
  mikeHP: PropTypes.number.isRequired
}

export default Arena

import React, { Component } from 'react'
import PropTypes from 'prop-types'
import Sound from 'react-sound'
import './Arena.css'
import RingImg from '../../assets/images/ring.jpg'
import Mac from '../Mac/Mac'
import Mike from '../Mike/Mike'
import HealthBar from '../HealthBar/HealthBar'

import STATUS from '../statusTypes'

// Load audio files
import missAudioFile from '../../assets/audio/miss.mp3'
import hitAudioFile from '../../assets/audio/hit.mp3'
import winAudioFile from '../../assets/audio/ko-win.mp3'
import loseAudioFile from '../../assets/audio/ko-lose.mp3'

class Arena extends Component {
  constructor (props) {
    super(props)
    this.state = {
      macStatus: '',
      mikeStatus: '',
      sound: ''
    }
    this.hit = this.hit.bind(this)
    this.miss = this.miss.bind(this)
    this.idle = this.idle.bind(this)
  }

  componentDidUpdate (prevProps) {
    // Check status prop and update animation accordingly
    if (this.props.status !== prevProps.status) {
      if (this.props.status === 'hit') {
        this.hit(this.props.mikeHP)
      } else if (this.props.status === 'miss') {
        this.miss(this.props.macHP)
      } else {
        this.idle()
      }
    }
  }

  // Perform hit animation
  hit (mikeHP) {
    let mikeStatus, macStatus
    if (mikeHP <= 0) {
      mikeStatus = STATUS.KO
      macStatus = STATUS.KOPUNCHING
    } else {
      mikeStatus = STATUS.PUNCHED
      macStatus = STATUS.PUNCHING
    }
    this.setState({ mikeStatus, macStatus })
  }

  // Perform miss animation
  miss (macHP) {
    let mikeStatus, macStatus
    if (macHP <= 0) {
      macStatus = STATUS.KO
      mikeStatus = STATUS.KOPUNCHING
    } else {
      macStatus = STATUS.PUNCHED
      mikeStatus = STATUS.PUNCHING
    }
    this.setState({ mikeStatus, macStatus })
  }

  // Perform idle animation
  idle () {
    this.setState({ mikeStatus: STATUS.IDLE, macStatus: STATUS.IDLE })
  }

  render () {
    return (
      <div className={'arena'}>
        <Sound
          url={hitAudioFile}
          autoLoad
          playStatus={this.props.status === 'hit' && this.props.mikeHP > 0 ? Sound.status.PLAYING : Sound.status.STOPPED}
        />
        <Sound
          url={winAudioFile}
          autoLoad
          playStatus={this.props.status === 'hit' && this.props.mikeHP <= 0 ? Sound.status.PLAYING : Sound.status.STOPPED}
        />
        <Sound
          url={missAudioFile}
          autoLoad
          playStatus={this.props.status === 'miss' && this.props.macHP > 0 ? Sound.status.PLAYING : Sound.status.STOPPED}
        />
        <Sound
          url={loseAudioFile}
          autoLoad
          playStatus={this.props.status === 'miss' && this.props.macHP <= 0 ? Sound.status.PLAYING : Sound.status.STOPPED}
        />
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
  mikeHP: PropTypes.number.isRequired,
  status: PropTypes.string.isRequired
}

export default Arena

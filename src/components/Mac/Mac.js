import React from 'react'
import PropTypes from 'prop-types'
import './Mac.css'

import STATUS from '../statusTypes'
import MacPunched from '../../assets/images/mac-hit.png'
import MacPunching from '../../assets/images/mac-punch.png'
import MacKOPunching from '../../assets/images/mac-punch-KO.png'
import MacKOed from '../../assets/images/mac-KO.png'

const Mac = props => {
  // Display default Mac idle animation
  if (props.status === STATUS.IDLE || !props.status) {
    return <div className={'player'}/>
  }

  let style

  // Display Mac punching
  if (props.status === STATUS.PUNCHING) {
    style = { backgroundImage: `url(${MacPunching})` }
  }

  // Display Mac doing KO punch
  if (props.status === STATUS.KOPUNCHING) {
    style = { backgroundImage: `url(${MacKOPunching})` }
  }

  // Display Mac getting punched
  if (props.status === STATUS.PUNCHED) {
    style = { backgroundImage: `url(${MacPunched})` }
  }

  // Display Mac getting KOed
  if (props.status === STATUS.KO) {
    style = { backgroundImage: `url(${MacKOed})`, width: '73px', height: '40px' }
  }

  return <div className={'player-punch'} style={style}/>
}

Mac.propTypes = {
  status: PropTypes.string
}

export default Mac

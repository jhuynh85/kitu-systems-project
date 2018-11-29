import React from 'react'
import PropTypes from 'prop-types'
import './Mac.css'

import MacPunched from '../../assets/images/mac-hit.png'
import MacPunching from '../../assets/images/mac-punch.png'
import MacKOPunching from '../../assets/images/mac-punch-KO.png'
import MacKOed from '../../assets/images/mac-KO.png'

const Mac = props => {
  // Display default Mac idle animation
  if (props.status === 'isIdle' || !props.status) {
    return <div className={'player'}/>
  }

  let style

  // Display Mac punching
  if (props.status === 'isPunching') {
    style = { backgroundImage: `url(${MacPunching})` }
  }

  // Display Mac doing KO punch
  if (props.status === 'isKOPunching') {
    style = { backgroundImage: `url(${MacKOPunching})` }
  }

  // Display Mac getting punched
  if (props.status === 'isPunched') {
    style = { backgroundImage: `url(${MacPunched})` }
  }

  // Display Mac getting KOed
  if (props.status === 'isKOed') {
    style = { backgroundImage: `url(${MacKOed})`, width: '73px', height: '40px' }
  }

  return <div className={'player-punch'} style={style}/>
}

Mac.propTypes = {
  status: PropTypes.string.isRequired
}

export default Mac

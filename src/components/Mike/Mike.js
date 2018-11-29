import React from 'react'
import PropTypes from 'prop-types'
import './Mike.css'

import MikePunched from '../../assets/images/mike-hit.png'
import MikePunching from '../../assets/images/mike-punch.png'
import MikeKOPunching from '../../assets/images/mike-punch-KO.png'
import MikeKOed from '../../assets/images/mike-KO.png'

const Mike = props => {
  // Display default Mike idle animation
  if (props.status === 'isIdle' || !props.status) {
    return <div className={'PC'}/>
  }

  let style

  // Display Mike punching
  if (props.status === 'isPunching') {
    style = { backgroundImage: `url(${MikePunching})` }
  }

  // Display Mike doing KO punch
  if (props.status === 'isKOPunching') {
    style = { backgroundImage: `url(${MikeKOPunching})` }
  }

  // Display Mike getting punched
  if (props.status === 'isPunched') {
    style = { backgroundImage: `url(${MikePunched})` }
  }

  // Display Mike getting KOed
  if (props.status === 'isKOed') {
    style = { backgroundImage: `url(${MikeKOed})` }
  }

  return <div className={'PC-punch'} style={style}/>
}

Mike.propTypes = {
  status: PropTypes.string.isRequired
}

export default Mike

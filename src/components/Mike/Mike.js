import React from 'react'
import PropTypes from 'prop-types'
import './Mike.css'

import STATUS from '../statusTypes'
import MikePunched from '../../assets/images/mike-hit.png'
import MikePunching from '../../assets/images/mike-punch.png'
import MikeKOPunching from '../../assets/images/mike-punch-KO.png'
import MikeKOed from '../../assets/images/mike-KO.png'

const Mike = props => {
  // Display default Mike idle animation
  if (props.status === STATUS.IDLE || !props.status) {
    return <div className={'PC'}/>
  }

  let style

  // Display Mike punching
  if (props.status === STATUS.PUNCHING) {
    style = { backgroundImage: `url(${MikePunching})` }
  }

  // Display Mike doing KO punch
  if (props.status === STATUS.KOPUNCHING) {
    style = { backgroundImage: `url(${MikeKOPunching})` }
  }

  // Display Mike getting punched
  if (props.status === STATUS.PUNCHED) {
    style = { backgroundImage: `url(${MikePunched})` }
  }

  // Display Mike getting KOed
  if (props.status === STATUS.KO) {
    style = { backgroundImage: `url(${MikeKOed})` }
  }

  return <div className={'PC-punch'} style={style}/>
}

Mike.propTypes = {
  status: PropTypes.string
}

export default Mike

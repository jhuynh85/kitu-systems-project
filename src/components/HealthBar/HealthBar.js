import React from 'react'
import PropTypes from 'prop-types'
import './HealthBar.css'
import CONSTANTS from '../constants'

const HealthBar = props => {
  const hpBarWidth = Math.floor((props.percent / 100) * CONSTANTS.HEALTHBAR_WIDTH)
  const hpBarStyle = {
    backgroundColor: props.color,
    width: hpBarWidth + '%',
    top: props.top,
    bottom: props.bottom,
    left: props.left,
    right: props.right
  }
  const hpBarBackgroundStyle = {
    borderColor: props.color,
    width: CONSTANTS.HEALTHBAR_WIDTH + '%',
    top: props.top,
    bottom: props.bottom,
    left: props.left,
    right: props.right
  }

  return (
    <div>
      <div className={'hpBar'} style={hpBarStyle}/>
      <div className={'hpBarBackground'} style={hpBarBackgroundStyle}/>
    </div>
  )
}

HealthBar.propTypes = {
  color: PropTypes.string.isRequired,
  percent: PropTypes.number.isRequired,
  top: PropTypes.string,
  bottom: PropTypes.string,
  left: PropTypes.string,
  right: PropTypes.string
}

export default HealthBar

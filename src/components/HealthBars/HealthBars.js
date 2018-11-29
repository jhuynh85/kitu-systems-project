import React from 'react'
import './HealthBars.css'

const HealthBars = props => {
  return (
    <div className={'healthBars'}>
      <div className={'playerHP'}/>
      <div className={'playerHPBackground'}/>
      <div className={'CPUHP'}/>
      <div className={'CPUHPBackground'}/>
    </div>
  )
}

export default HealthBars

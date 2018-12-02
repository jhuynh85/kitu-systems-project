import React from 'react'
import { shallow } from 'enzyme'
import '../../setupTests'

import CONSTANTS from '../constants'
import HealthBar from './HealthBar'

describe('HealthBar component', () => {
  it('shows one HP-bar', () => {
    const wrapper = shallow(<HealthBar color={'white'} percent={100}/>)
    const hpBar = wrapper.find('.hpBar')
    expect(hpBar.length).toEqual(1)
  })

  it('shows one HP-bar-background', () => {
    const wrapper = shallow(<HealthBar color={'white'} percent={100}/>)
    expect(wrapper.find('.hpBarBackground').length).toEqual(1)
  })

  it('HP-bar color should be equal to props.color', () => {
    const COLOR = 'red'
    const wrapper = shallow(<HealthBar color={COLOR} percent={100}/>)
    const hpBarStyle = wrapper.find('.hpBar').props().style
    expect(hpBarStyle).toHaveProperty('backgroundColor', COLOR)
  })

  it('HP-bar-background border color should be equal to props.color', () => {
    const COLOR = 'white'
    const wrapper = shallow(<HealthBar color={COLOR} percent={100}/>)
    const hpBarStyle = wrapper.find('.hpBarBackground').props().style
    expect(hpBarStyle).toHaveProperty('borderColor', COLOR)
  })

  it('percentage of HP-bar width to HP-bar-background width should be equal to props.percent ', () => {
    const PERCENT = 75
    const EXPECTED_WIDTH = Math.floor((PERCENT / 100) * CONSTANTS.HEALTHBAR_WIDTH)
    const wrapper = shallow(<HealthBar percent={PERCENT} color={'white'}/>)
    const hpBarStyle = wrapper.find('.hpBar').props().style
    expect(hpBarStyle).toHaveProperty('width', EXPECTED_WIDTH + '%')
  })
})

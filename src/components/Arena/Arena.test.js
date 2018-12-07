import React from 'react'
import { shallow } from 'enzyme'
import '../../setupTests'

import Arena from './Arena'
import Mac from '../Mac/Mac'
import Mike from '../Mike/Mike'
import HealthBar from '../HealthBar/HealthBar'
import RingImage from '../../assets/images/ring.jpg'
import STATUS from '../statusTypes'

let wrapper

beforeEach(() => {
  wrapper = shallow(<Arena status='idle' macHP={75} mikeHP={45}/>)
})

describe('Arena component', () => {
  it('shows an image of the ring', () => {
    const image = wrapper.find('img.ring-img')
    const imageSrc = image.prop('src')
    expect(imageSrc).toEqual(RingImage)
  })

  it('shows one Mac component', () => {
    expect(wrapper.find(Mac).length).toEqual(1)
  })

  it('shows one Mike component', () => {
    expect(wrapper.find(Mike).length).toEqual(1)
  })

  it('shows two HealthBar components', () => {
    expect(wrapper.find(HealthBar).length).toEqual(2)
  })

  it(`sets state.macStatus to "${STATUS.PUNCHED}" and state.mikeStatus to "${STATUS.PUNCHING}" if props.status==="miss" and props.macHP > 0`,
    () => {
      wrapper.setProps({ status: 'miss', macHP: 50, mikeHP: 100 })
      expect(wrapper.state('macStatus')).toEqual(STATUS.PUNCHED)
      expect(wrapper.state('mikeStatus')).toEqual(STATUS.PUNCHING)
    })

  it(`sets state.macStatus to "${STATUS.KO}" and state.mikeStatus to "${STATUS.KOPUNCHING}" if props.status==="miss" and props.macHP <== 0`,
    () => {
      wrapper.setProps({ status: 'miss', macHP: 0, mikeHP: 100 })
      expect(wrapper.state('macStatus')).toEqual(STATUS.KO)
      expect(wrapper.state('mikeStatus')).toEqual(STATUS.KOPUNCHING)
    })

  it(`sets state.macStatus to "${STATUS.PUNCHING}" and state.mikeStatus to "${STATUS.PUNCHED}" if props.status==="hit" and props.mikeHP > 0`,
    () => {
      wrapper.setProps({ status: 'hit', macHP: 100, mikeHP: 50 })
      expect(wrapper.state('macStatus')).toEqual(STATUS.PUNCHING)
      expect(wrapper.state('mikeStatus')).toEqual(STATUS.PUNCHED)
    })

  it(`sets state.macStatus to "${STATUS.KOPUNCHING}" and state.mikeStatus to "${STATUS.KO}" if props.status==="hit" and props.mikeHP <== 0`,
    () => {
      wrapper.setProps({ status: 'hit', macHP: 100, mikeHP: 0 })
      expect(wrapper.state('macStatus')).toEqual(STATUS.KOPUNCHING)
      expect(wrapper.state('mikeStatus')).toEqual(STATUS.KO)
    })

  it(`sets both state.macStatus and state.mikeStatus to "${STATUS.IDLE}" if props.status !=="hit" or "miss"`,
    () => {
      wrapper.setProps({ status: 'hit', macHP: 90, mikeHP: 50 })
      wrapper.setProps({ status: 'idle', macHP: 90, mikeHP: 50 })
      expect(wrapper.state('macStatus')).toEqual(STATUS.IDLE)
      expect(wrapper.state('mikeStatus')).toEqual(STATUS.IDLE)
    })
})

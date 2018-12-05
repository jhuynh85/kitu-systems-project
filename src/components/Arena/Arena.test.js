import React from 'react'
import { shallow } from 'enzyme'
import '../../setupTests'

import Arena from './Arena'
import Mac from '../Mac/Mac'
import Mike from '../Mike/Mike'
import HealthBar from '../HealthBar/HealthBar'
import RingImage from '../../assets/images/ring.jpg'

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
})

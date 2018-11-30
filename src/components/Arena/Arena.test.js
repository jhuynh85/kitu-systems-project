import React from 'react'
import { shallow } from 'enzyme'
import '../../setupTests'
import Arena from './Arena'
import Mac from '../Mac/Mac'
import Mike from '../Mike/Mike'
import Healthbars from '../HealthBars/HealthBars'
import RingImage from '../../assets/images/ring.jpg'

let wrapper

beforeEach(() => {
  wrapper = shallow(<Arena/>)
})

describe('Arena component', () => {
  it('contains an image of the ring', () => {
    const image = wrapper.find('img.ring-img')
    const imageSrc = image.prop('src')
    expect(imageSrc).toEqual(RingImage)
  })

  it('contains a Mac component', () => {
    expect(wrapper.find(Mac).length).toEqual(1)
  })

  it('contains a Mike component', () => {
    expect(wrapper.find(Mike).length).toEqual(1)
  })

  it('contains a Healthbars component', () => {
    expect(wrapper.find(Healthbars).length).toEqual(1)
  })
})

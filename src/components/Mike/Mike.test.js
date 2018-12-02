import React from 'react'
import { shallow } from 'enzyme'
import '../../setupTests'

import STATUS from '../../components/statusTypes'
import Mike from './Mike'
import MikePunched from '../../assets/images/mike-hit.png'
import MikePunching from '../../assets/images/mike-punch.png'
import MikeKOPunching from '../../assets/images/mike-punch-KO.png'
import MikeKOed from '../../assets/images/mike-KO.png'

describe('Mike component', () => {
  // Checks that the component has the '.PC' class, which
  // is set to loop the default Mike animation
  it('shows default Mike animation when "status" prop is not set', () => {
    const wrapper = shallow(<Mike/>)
    expect(wrapper.find('.PC').length).toEqual(1)
  })

  // Checks that the component has the '.PC' class, which
  // is set to loop the default Mike animation
  it(`shows default Mike animation when "status" prop is set to "${STATUS.IDLE}"`, () => {
    const wrapper = shallow(<Mike status={STATUS.IDLE}/>)
    expect(wrapper.find('.PC').length).toEqual(1)
  })

  it(`shows Mike punching when "status" prop is set to "${STATUS.PUNCHING}"`, () => {
    const wrapper = shallow(<Mike status={STATUS.PUNCHING}/>)
    const mikeDivStyle = wrapper.find('.PC-punch').props().style
    expect(mikeDivStyle).toHaveProperty('backgroundImage', `url(${MikePunching})`)
  })

  it(`shows Mike getting punched when "status" prop is set to "${STATUS.PUNCHED}"`, () => {
    const wrapper = shallow(<Mike status={STATUS.PUNCHED}/>)
    const mikeDivStyle = wrapper.find('.PC-punch').props().style
    expect(mikeDivStyle).toHaveProperty('backgroundImage', `url(${MikePunched})`)
  })

  it(`shows Mike doing KO punch when "status" prop is set to "${STATUS.KOPUNCHING}"`, () => {
    const wrapper = shallow(<Mike status={STATUS.KOPUNCHING}/>)
    const mikeDivStyle = wrapper.find('.PC-punch').props().style
    expect(mikeDivStyle).toHaveProperty('backgroundImage', `url(${MikeKOPunching})`)
  })

  it(`shows Mike getting KOed when "status" prop is set to "${STATUS.KO}"`, () => {
    const wrapper = shallow(<Mike status={STATUS.KO}/>)
    const mikeDivStyle = wrapper.find('.PC-punch').props().style
    expect(mikeDivStyle).toHaveProperty('backgroundImage', `url(${MikeKOed})`)
  })
})

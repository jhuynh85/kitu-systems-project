import React from 'react'
import { shallow } from 'enzyme'
import '../../setupTests'

import STATUS from '../../components/statusTypes'
import Mac from './Mac'
import MacPunched from '../../assets/images/mac-hit.png'
import MacPunching from '../../assets/images/mac-punch.png'
import MacKOPunching from '../../assets/images/mac-punch-KO.png'
import MacKOed from '../../assets/images/mac-KO.png'

describe('Mac component', () => {
  // Checks that the component has the '.player' class, which
  // is set to loop the default Mac animation
  it('shows default Mac animation when "status" prop is not set', () => {
    const wrapper = shallow(<Mac/>)
    expect(wrapper.find('.player').length).toEqual(1)
  })

  // Checks that the component has the '.player' class, which
  // is set to loop the default Mac animation
  it(`shows default Mac animation when "status" prop is set to "${STATUS.IDLE}"`, () => {
    const wrapper = shallow(<Mac status={STATUS.IDLE}/>)
    expect(wrapper.find('.player').length).toEqual(1)
  })

  it(`shows Mac punching when "status" prop is set to "${STATUS.PUNCHING}"`, () => {
    const wrapper = shallow(<Mac status={STATUS.PUNCHING}/>)
    const macDivStyle = wrapper.find('.player-punch').props().style
    expect(macDivStyle).toHaveProperty('backgroundImage', `url(${MacPunching})`)
  })

  it(`shows Mac getting punched when "status" prop is set to "${STATUS.PUNCHED}"`, () => {
    const wrapper = shallow(<Mac status={STATUS.PUNCHED}/>)
    const macDivStyle = wrapper.find('.player-punch').props().style
    expect(macDivStyle).toHaveProperty('backgroundImage', `url(${MacPunched})`)
  })

  it(`shows Mac doing KO punch when "status" prop is set to "${STATUS.KOPUNCHING}"`, () => {
    const wrapper = shallow(<Mac status={STATUS.KOPUNCHING}/>)
    const macDivStyle = wrapper.find('.player-punch').props().style
    expect(macDivStyle).toHaveProperty('backgroundImage', `url(${MacKOPunching})`)
  })

  it(`shows Mac getting KOed when "status" prop is set to "${STATUS.KO}"`, () => {
    const wrapper = shallow(<Mac status={STATUS.KO}/>)
    const macDivStyle = wrapper.find('.player-punch').props().style
    expect(macDivStyle).toHaveProperty('backgroundImage', `url(${MacKOed})`)
    expect(macDivStyle).toHaveProperty('width', '73px')
    expect(macDivStyle).toHaveProperty('height', '40px')
  })
})

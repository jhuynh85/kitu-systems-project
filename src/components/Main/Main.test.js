import React from 'react'
import { shallow } from 'enzyme'
import '../../setupTests'

import Main from './Main'
import Arena from '../Arena/Arena'

let wrapper

beforeEach(() => {
  wrapper = shallow(<Main/>)
})

it('shows one Arena component', () => {
  expect(wrapper.find(Arena).length).toEqual(1)
})

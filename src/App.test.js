import React from 'react'
import { shallow } from 'enzyme'
import './setupTests'

import App from './App'
import Main from './components/Main/Main'

let wrapper

beforeEach(() => {
  wrapper = shallow(<App/>)
})

it('shows one Main component', () => {
  expect(wrapper.find(Main).length).toEqual(1)
})

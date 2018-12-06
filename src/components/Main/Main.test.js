import React from 'react'
import { shallow, mount } from 'enzyme'
import axios from 'axios'
import '../../setupTests'

import Main from './Main'
import Arena from '../Arena/Arena'

// Mock out all top level functions, such as get, put, delete and post:
jest.mock('axios')
// Setup mock API call
axios.get.mockImplementation(() => Promise.resolve({
  status: 200,
  data: {
    word: 'object', hint: 'In Javascript, almost everything is this'
  }
}))

describe('Main component', () => {
  it('shows one Arena component', () => {
    const wrapper = shallow(<Main/>)
    expect(wrapper.find(Arena).length).toEqual(1)
  })

  it('makes a call to the /api/random route in componentDidMount', () => {
    const didMountSpy = jest.spyOn(Main.prototype, 'componentDidMount')
    expect(didMountSpy).toHaveBeenCalledTimes(0)
    // Mount component and check that API call was performed
    mount(<Main/>)
    expect(didMountSpy).toHaveBeenCalledTimes(1)
    expect(axios.get).toHaveBeenCalledWith('/api/random')
    didMountSpy.mockClear()
  })

  it('shows the same number of blanks as there are letters in the hidden word', (done) => {
    const wrapper = mount(<Main/>)

    // Settimeout so that setState has enough time to update component state
    setTimeout(() => {
      const length = wrapper.state('word').length
      const text = wrapper.find('.wordState').text()
      expect(text).toEqual('_'.repeat(length).split('').join(' '))
      done()
    }, 10)
  })

  it('increments the score when the user wins', (done) => {
    const wrapper = mount(<Main/>)
    const originalScore = wrapper.find('.score').text()
    wrapper.instance().win()

    setTimeout(() => {
      const newScore = wrapper.find('.score').text()
      expect(parseInt(newScore)).toEqual(parseInt(originalScore) + 1)
      done()
    }, 10)
  })
})

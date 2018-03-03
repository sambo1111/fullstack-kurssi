import React from 'react'
import { mount } from 'enzyme'
import App from './App'
import BlogToggle from './components/BlogToggle'
jest.mock('./services/blogs')
import blogService from './services/blogs'

describe('<App />', () => {
  let app
  beforeAll(() => {
    app = mount(<App />)
  })

  it('renders login form if user is not logged in', () => {
    app.update()
    const loginDiv = app.find('.login')
    expect(loginDiv.text()).toContain('Log in')
  })
})
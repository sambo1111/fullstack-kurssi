import React from 'react'
import { shallow } from 'enzyme'
import SimpleBlog from './SimpleBlog'


describe('<SimpleBlog />', () => {
    it('renders blog info', () => {
      const blog = {
        title: "This is a test",
        author: "Mr. Test Author",
        likes: 62
      }

      const onClick = () => {

      }
  
      const simpleBlogComponent = shallow(<SimpleBlog blog={blog} onClick={onClick} />)
      const titleAuthorDiv = simpleBlogComponent.find('.titleAuthor')
  
      expect(titleAuthorDiv.text()).toContain(blog.title)
      expect(titleAuthorDiv.text()).toContain(blog.author)
    })

    it ('calls onClick two times if like button is clicked twice', () => {
        const blog = {
            title: "This is a test",
            author: "Mr. Test Author",
            likes: 62
          }

          const onClick = jest.fn()
          const simpleBlogComponent = shallow(<SimpleBlog blog={blog} onClick={onClick} />)

          const button = simpleBlogComponent.find('.button')
          button.simulate('click')
          button.simulate('click')

          expect(onClick.mock.calls.length).toBe(2)
    })
  })
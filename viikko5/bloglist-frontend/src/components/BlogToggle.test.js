import React from 'react'
import { shallow } from 'enzyme'
import BlogToggle from './BlogToggle'


describe('<BlogToggle />', () => {

    it('before clicking name the details arent displayed', () => {

        const blog = {
            title: "This is a test",
            author: "Mr. Test Author",
            url: "www.abc.com",
            likes: 62
          }
        
        const user = {
            username: "testi"
        }

        const mockFunc = jest.fn()
        const mockFunc2 = jest.fn()

        const blogToggleComponent= shallow(<BlogToggle
                                            user={user}
                                            blog={blog}
                                            handleDeleteBlogButton={mockFunc}
                                            handleLikeButton={mockFunc2}/>)

        const div = blogToggleComponent.find('.contentDiv')
        expect(div.getElement().props.style).toEqual({ display: 'none' })
    }) 

    it('after clicking name the details are displayed', () => {

        const blog = {
            title: "This is a test",
            author: "Mr. Test Author",
            url: "www.abc.com",
            likes: 62
          }
        
        const user = {
            username: "testi"
        }

        const mockFunc = jest.fn()
        const mockFunc2 = jest.fn()

        const blogToggleComponent= shallow(<BlogToggle
                                            user={user}
                                            blog={blog}
                                            handleDeleteBlogButton={mockFunc}
                                            handleLikeButton={mockFunc2}/>)

        const nameDiv = blogToggleComponent.find('.nameDiv')
        nameDiv.simulate('click')

        const contentDiv = blogToggleComponent.find('.contentDiv')
        expect(contentDiv.text()).toContain(blog.likes)
        expect(contentDiv.text()).toContain(blog.url)

      })
})
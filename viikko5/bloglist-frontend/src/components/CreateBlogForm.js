import React from 'react'
import blogService from '../services/blogs'
import Notification from './Notification'

class CreateBlogForm extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            author: '',
            title: '',
            url: '',
            notification: null
        }
    }

    handleFormChange = (event) => {
        this.setState({
            [event.target.name]: event.target.value
        })
    }

    handleCreateBlogButton = async (event) => {
        event.preventDefault()
        try {
            const blog = {
                author: this.state.author,
                title: this.state.title,
                url: this.state.url
            }
            const savedBlog = await blogService.save(blog)
            this.setState({
                author: '', title: '', url: '', notification: `New Blog ${blog.title} created!`
            })
            this.props.addBlogToList(savedBlog)
            setTimeout(() => {
                this.setState({notification: null})
              }, 5000)

        } catch (error) {
            console.log(error)
        }

    }

    render() {
        return (
            <div>
                <Notification notification={this.state.notification}/>
                <form onSubmit={this.handleCreateBlogButton}>
                    <div>
                        Title
                <input
                            type="text"
                            name="title"
                            value={this.state.title}
                            onChange={this.handleFormChange}
                        />
                    </div>
                    <div>
                        Author
                  <input
                            type="text"
                            name="author"
                            value={this.state.author}
                            onChange={this.handleFormChange}
                        />
                    </div>
                    <div>
                        URL
                  <input
                            type="text"
                            name="url"
                            value={this.state.url}
                            onChange={this.handleFormChange}
                        />
                    </div>
                    <button type="submit"> Create blog </button>
                </form>
            </div>
        )

    }
}

export default CreateBlogForm 
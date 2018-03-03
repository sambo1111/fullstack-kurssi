import React from 'react'
import PropTypes from 'prop-types'

class BlogToggle extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            visible: false
        }
    }

    static propTypes = {
        handleDeleteBlogButton: PropTypes.func.isRequired,
        user: PropTypes.object.isRequired,
        blog: PropTypes.object.isRequired,
        handleLikeButton: PropTypes.func.isRequired
    }

    toggleVisibility = () => {
        this.setState({ visible: !this.state.visible })
    }


    render() {
        const hideWhenVisible = { display: this.state.visible ? 'none' : '' }
        const showWhenVisible = { display: this.state.visible ? '' : 'none' }

        const blogStyle = {
            paddingTop: 10,
            paddingLeft: 2,
            border: 'solid',
            borderWidth: 1,
            marginBottom: 5
        }

        const deleteButton = () => {
            if (!this.props.blog.user) {
                return (
                    <div> <button onClick={async () => this.props.handleDeleteBlogButton(this.props.blog._id)}> delete </button> </div>
                )
            } else {
                if (this.props.blog.user.username === this.props.user.username) {
                    return (
                        <div> <button onClick={async () => this.props.handleDeleteBlogButton(this.props.blog._id)}> delete </button> </div>
                    )
                }
            }
            return (
                null
            )
        }

        const showPoster = () => {
            if (this.props.blog.user) {
                return (
                    <div> Added by: {this.props.blog.user.username} </div>
                )
            }
            return (
                null
            )
        }

        return (
            <div>
                <div style={blogStyle} >
                    <div className ="nameDiv" style={hideWhenVisible}>
                        <div onClick={this.toggleVisibility}>{this.props.blog.title} {this.props.blog.author}</div>
                    </div>

                    <div className="contentDiv" style={showWhenVisible}>
                        <div onClick={this.toggleVisibility}>{this.props.blog.title} {this.props.blog.author}</div>
                        <div> {this.props.blog.url} </div>
                        <div>
                            {this.props.blog.likes}
                            <button onClick={async () => this.props.handleLikeButton(this.props.blog._id)}> like </button>
                        </div>
                        {showPoster()}
                        {deleteButton()}
                    </div>
                </div>
            </div>
        )
    }
}

export default BlogToggle
const dummy = (blogs) => {
    return 1
  }

const totalLikes = (blogs) => {
    return blogs.reduce(function(sum, blog) {
        return sum + blog.likes
    }, 0)
}

const favoriteBlog = (blogs) => {
    var mostLiked = blogs[0]
    blogs.forEach(blog => {
        mostLiked = (blog.likes > mostLiked.likes) ? blog : mostLiked
    })
    return mostLiked
}

const mostBlogs = (blogs) => {
    var authors = blogs.map(blog => blog.author)
    var modeMap = new Map

    authors.forEach(author => {
        modeMap.get(author) ? 
        modeMap.set(author, modeMap.get(author) + 1) : 
        modeMap.set(author, 1)
    })

    var authorWithMostBlogs = {
        author: '',
        blogs: 0
    }

    modeMap.forEach(function(val, key, map) {
        authorWithMostBlogs = 
            (authorWithMostBlogs.blogs < val) ?
            {author: key, blogs: val} :
            authorWithMostBlogs
    })
    
    return authorWithMostBlogs
}

const mostLikes = (blogs) => {
    var likeMap = new Map

    blogs.forEach(blog => {
        likeMap.get(blog.author) ?
        likeMap.set(blog.author, likeMap.get(blog.author) + blog.likes) :
        likeMap.set(blog.author, blog.likes)
    })

    var authorWithMostLikes = {
        author: '',
        likes: 0
    }

    likeMap.forEach(function(val, key, map) {
        authorWithMostLikes =
            (authorWithMostLikes.likes < val) ?
            {author: key, likes: val} :
            authorWithMostLikes
    })
    
    return authorWithMostLikes
}
  
  module.exports = {
    dummy,
    totalLikes,
    favoriteBlog,
    mostBlogs,
    mostLikes
  }
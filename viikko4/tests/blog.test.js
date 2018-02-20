const listHelper = require('../utils/list_helper')

test('dummy is called', () => {
  const blogs = []

  const result = listHelper.dummy(blogs)
  expect(result).toBe(1)
})

const blogs = [
  {
    _id: '1',
    title: 'Go To Statement Considered Harmful',
    author: 'Edsger W. Dijkstra',
    url: 'http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html',
    likes: 5,
    __v: 0
  },
  {
    _id: '2',
    title: 'Quick mafs',
    author: 'Albert Einstein',
    url: 'http://www.einsteinboss.com/quickmafs.html',
    likes: 24,
    __v: 0
  },
  {
    _id: '3',
    title: 'How to play guitar',
    author: 'Jimi Hendrix',
    url: 'http://www.hendrix.com',
    likes: 3,
    __v: 0
  },
  {
    _id: '4',
    title: 'Algorithms stuff',
    author: 'Edsger W. Dijkstra',
    url: 'http://www.dijkstra.com/algo.html',
    likes: 2,
    __v: 0
  }
]

describe('total likes', () => {

  test('works when there are multiple blogs', () => {
    expect(listHelper.totalLikes(blogs)).toBe(34)
  })

  test('works with one blog', () => {
    expect(listHelper.totalLikes(blogs.slice(0,1))).toBe(5)
  })

  test('works with an empty list of blogs', () => {
    expect(listHelper.totalLikes([])).toBe(0)
  })

})

describe('favorite blog', () => {
  test('returns the blog with most likes', () => {
    expect(listHelper.favoriteBlog(blogs)).toEqual(blogs[1])
  })
})

describe('most blogs', () => {
  test('returns the author with most blogs', () => {
    expect(listHelper.mostBlogs(blogs)).toEqual({author: 'Edsger W. Dijkstra', blogs: 2})
  })
})

describe('most likes', () => {
  test('returns the author with most likes', () => {
    expect(listHelper.mostLikes(blogs)).toEqual({author: 'Albert Einstein', likes: 24})
  })
})
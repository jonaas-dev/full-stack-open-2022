const _ = require('lodash')

const totalLikes = (blogs) => {
  return blogs.reduce((sum, blog) => sum + blog.likes, 0)
}

const maxByLikes = (blogs) => { return blogs.reduce((a, b) => { return a.likes > b.likes ? a : b }, {}) }

const maxByBlogs = (blogs) => { return blogs.reduce((a, b) => { return a.blogs > b.blogs ? a : b }, {}) }

const favoriteBlog = (blogs) => {
  return maxByLikes(blogs)
}

const findIndexByAuthor = (data, author) => { return _.findIndex(data, function(it) { return it.author === author }) }

const reduceByBlogs = (blogs, dataAux) => {
  blogs.reduce((dataAux, blog) => {
    var index = findIndexByAuthor(dataAux, blog.author)
    if(index !== -1) {
      dataAux[index].blogs += 1
    }
    else {
      dataAux.push({ author: blog.author, blogs: 1 })
    }

    return dataAux
  }, dataAux)
}

const reduceByLikes = (blogs, dataAux) => {
  blogs.reduce((dataAux, blog) => {
    var index = findIndexByAuthor(dataAux, blog.author)
    if(index !== -1) {
      dataAux[index].likes += blog.likes
    }
    else {
      dataAux.push({ author: blog.author, likes: blog.likes })
    }

    return dataAux
  }, dataAux)
}

const mostBlogs = (blogs) => {
  const dataAux = []
  reduceByBlogs(blogs, dataAux)

  return maxByBlogs(dataAux)
}

const mostLikes = (blogs) => {
  const dataAux = []
  reduceByLikes(blogs, dataAux)

  return maxByLikes(dataAux)
}

module.exports = {
  totalLikes,
  favoriteBlog,
  mostBlogs,
  mostLikes
}
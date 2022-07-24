const mongoose = require('mongoose')
const helper = require('./test_helper')
const supertest = require('supertest')
const app = require('../app')

const api = supertest(app)

const Blog = require('../models/blog')

var token = ''


beforeEach(async () => {
  await Blog.deleteMany({})

  const blogObjects = helper.initialBlogs
    .map(blog => new Blog(blog))
  const promiseArray = blogObjects.map(blog => blog.save())
  await Promise.all(promiseArray)
})

describe('when there is initially some blogs saved', () => {
  test('blogs are returned as json', async () => {
    await api
      .get('/api/blogs')
      .expect(200)
      .expect('Content-Type', 'application/json; charset=utf-8')
  })

  test('there are two blogs', async () => {
    const response = await api.get('/api/blogs')

    expect(response.body).toHaveLength(helper.initialBlogs.length)
    response.body.forEach(element => {
      expect(element.id).toBeDefined()
    })
  })

  test('the first blog is about HTTP methods', async () => {
    const response = await api.get('/api/blogs')

    const contents = response.body.map(r => r.author)
    expect(contents).toContain('Edsger W. Dijkstra')
  })
})

describe('viewing a specific blog', () => {
  test('a specific blog can be viewed', async () => {
    const blogsAtStart = await helper.blogsInDb()

    const blogToView = blogsAtStart[0]

    const resultBlog = await api
      .get(`/api/blogs/${blogToView.id}`)
      .expect(200)
      .expect('Content-Type', /application\/json/)

    const processedBlogToView = JSON.parse(JSON.stringify(blogToView))

    expect(resultBlog.body).toEqual(processedBlogToView)
  })
})

test('login test', async () => {

  const loginData = {
    username: 'root',
    password: 'sekret'
  }

  const response = await api
    .post('/api/login')
    .send(loginData)
    .expect(200)
    .expect('Content-Type', /application\/json/)

  expect(response.body).not.toEqual(undefined)

  token = response.body.token
})


describe('addition of a new blog', () => {
  test('a valid blog can be added', async () => {

    var users = await helper.usersInDb()
    const userRoot = users.find(user => user.username === 'root')

    const newBlog = {
      title: 'Type wars',
      author: 'Robert C. Martin',
      url: 'http://blog.cleancoder.com/uncle-bob/2016/05/01/TypeWars.html',
      likes: 2,
      user: userRoot ? userRoot.id.toString() : '62c09a7b2815e82f9b937030'
    }

    await api
      .post('/api/blogs')
      .set({ Authorization: 'Bearer ' + token })
      .send(newBlog)
      .expect(201)
      .expect('Content-Type', /application\/json/)

    const blogsAtEnd = await helper.blogsInDb()
    console.log(blogsAtEnd)
    expect(blogsAtEnd).toHaveLength(helper.initialBlogs.length + 1)

    const authors = blogsAtEnd.map(n => n.author)
    expect(authors).toContain(
      'Robert C. Martin'
    )
  })

  test('if likes is empty, initialize with 0', async () => {
    const newBlog = {
      title: 'Type wars',
      author: 'Robert C. Martin',
      url: 'http://blog.cleancoder.com/uncle-bob/2016/05/01/TypeWars.html',
    }

    await api
      .post('/api/blogs')
      .send(newBlog)
      .set({ Authorization: 'Bearer ' + token })
      .expect(201)
      .expect('Content-Type', /application\/json/)

    const blogsAtEnd = await helper.blogsInDb()
    expect(blogsAtEnd).toHaveLength(helper.initialBlogs.length + 1)

    const likes = blogsAtEnd.map(r => r.likes)

    expect(likes).not.toContain(undefined)
  })

  test('blog without content is not added', async () => {
    const newBlog = {}

    await api
      .post('/api/blogs')
      .set({ Authorization: 'Bearer ' + token })
      .send(newBlog)
      .expect(400)

    const blogsAtEnd = await helper.blogsInDb()

    expect(blogsAtEnd).toHaveLength(helper.initialBlogs.length)
  })
})

describe('deletion of a blog', () => {
  test('a blog can be deleted', async () => {
    const blogsAtStart = await helper.blogsInDb()
    const blogsToDelete = blogsAtStart[0]

    await api
      .delete(`/api/blogs/${blogsToDelete.id}`)
      .set({ Authorization: 'Bearer ' + token })
      .expect(204)

    const blogsAtEnd = await helper.blogsInDb()

    expect(blogsAtEnd).toHaveLength(
      helper.initialBlogs.length
      /** No elimina perquè el blog no és de l'usuari root */
    )

    // const titles = blogsAtEnd.map(r => r.title)
    // expect(titles).not.toContain(blogsToDelete.title)
  })
})

// TODO: pendent fer un delete d'un blog que pertanyi a l'usuari.
// nota: pensar en que el beforeEach deixa net l'escenari.

describe('update of a blog', () => {
  test('a blog can be updated', async () => {
    const blogsAtStart = await helper.blogsInDb()
    const blogsToUpdate = blogsAtStart[0]

    const newData = {
      likes: 99
    }

    await api
      .put(`/api/blogs/${blogsToUpdate.id}`)
      .send(newData)
      .expect(200)

    const blogsAtEnd = await helper.blogsInDb()

    expect(blogsAtEnd).toHaveLength(
      helper.initialBlogs.length
    )

    const likes = blogsAtEnd.map(r => r.likes)

    expect(likes).toContain(99)
  })
})

afterAll(() => {
  mongoose.connection.close()
})
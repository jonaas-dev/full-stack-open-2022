import { useState, useEffect } from 'react'
import blogService from './services/blogs'
import Notification from './components/Notification'
import Blogs from './components/Blogs'
import User from './components/User'
import loginService from './services/login'
import BlogForm from './components/BlogForm'
import LoginForm from './components/LoginForm'

const App = () => {
  const [blogs, setBlogs] = useState([])

  const [username, setUsername] = useState('') 
  const [password, setPassword] = useState('') 
  const [user, setUser] = useState(null)

  const [newTitle, setNewTitle] = useState('')
  const [newAuthor, setNewAuthor] = useState('')
  const [newUrl, setNewUrl] = useState('')

  const [notification, setNotification] = useState(null)

  useEffect(() => {
    blogService.getAll().then(blogs =>
      setBlogs( blogs )
    )  
  }, [])

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedBlogappUser')
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      setUser(user)
      blogService.setToken(user.token)
    }
  }, [])

  const handleLogin = async (event) => {
    event.preventDefault()

    try {
      const user = await loginService.login({
        username, password,
      })

      window.localStorage.setItem(
        'loggedBlogappUser', JSON.stringify(user)
      )

      blogService.setToken(user.token)
      setUser(user)
      setUsername('')
      setPassword('')
    } catch (exception) {
      notify( 'Wrong credentials', 'alert' )
    }
  }

  const handleLogout = () => {
    window.localStorage.removeItem('loggedBlogappUser')
    blogService.setToken(null)
    setUser(null)
    setUsername('')
    setPassword('')
  }

  const notify = (message, type='info') => {
    setNotification({ message, type })
    setTimeout(() => {
      setNotification(null)
    }, 3000)
  }

  const addBlog = (event) => {
    event.preventDefault()
    const existingBlog = blogs.find(b => b.title === newTitle)
    if ( existingBlog ) {
      const ok = window.confirm(`${existingBlog.name} is already added to list, update the ... ?`)
      if ( ok ) {

        blogService.update(existingBlog.id, {...existingBlog, author: newAuthor }).then(savedBlog => {
          setBlogs(blogs.map(p => p.id === existingBlog.id ? savedBlog : p ))
          notify(`Updated info of ${savedBlog.title}`)
        })
        .catch(error => {
          notify(
            `the person '${existingBlog.name}' was had already been from the server`, 'alert'
          )
          setBlogs(blogs.filter(p => p.id !== existingBlog.id))
        })

        return 
      }
    }

    const newBlog = {
      title: newTitle,
      author: newAuthor,
      url: newUrl,
      likes: 0,
      user: user.id
    }

    blogService.create(newBlog).then(savedBlog => {
      setBlogs(blogs.concat(savedBlog))
      notify(`Added ${savedBlog.name}`)
      setNewTitle('')
      setNewAuthor('')
      setNewUrl('')

      notify(`a new blog ${savedBlog.title}! by ${savedBlog.author} added`)
    }) 
    .catch(error => {
      notify(
        error.message, 'alert'
      )
    }) 
  }

  const deleteBlog = (id) => { 
    const toDelete = blogs.find(b => b.id === id)
    const ok = window.confirm(`Delete ${toDelete.title}`)
    if (ok) {
      blogService.remove(id).then(() => {
        setBlogs(blogs.filter(b => b.id !== id))
        notify(`Deleted ${toDelete.title}`)
      })  
    }
  }
  
  return (
    <div>
      <h1>Blogs</h1>

      <Notification notification={notification} />

      {user === null 
       ?
        <LoginForm 
          handleLogin={handleLogin}
          username={username}
          password={password}
          handleUsernameChange={({ target }) => setUsername(target.value)}
          handlePasswordChange={({ target }) => setPassword(target.value)}
        /> 
        :
        <div>
          <User user={user} handleLogout={handleLogout}></User>
          <BlogForm 
            title={newTitle}
            author={newAuthor}
            url={newUrl}
            handleTitleChange={({ target }) => setNewTitle(target.value)}
            handleAuthorChange={({ target }) => setNewAuthor(target.value)}
            handleUrlChange={({ target }) => setNewUrl(target.value)}
            addBlog={addBlog} 
          /> 
          <Blogs blogs={blogs} handleDelete={deleteBlog} ></Blogs>
        </div>
      }

    </div>
  )
}

export default App

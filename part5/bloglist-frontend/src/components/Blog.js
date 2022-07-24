import React, { useState } from 'react'
import PropTypes from 'prop-types'

const Blog = ({ blog, handleDelete, handleLike }) => {

  const [visible, setVisible] = useState(false)

  const hideWhenVisible = { display: visible ? 'none' : '' }
  const showWhenVisible = { display: visible ? '' : 'none' }

  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5
  }

  return (
    <div>
      <div style={blogStyle}>
        <div>
          {blog.title}
          <button style={hideWhenVisible} onClick={() => setVisible(true)}>view</button>
          <button style={showWhenVisible} onClick={() => setVisible(false)}>hide</button>
        </div>

        <div style={showWhenVisible}>
          {blog.url} <br></br>
          Likes {blog.likes}  <button onClick={() => handleLike(blog.id)}>like</button> <br></br>
          {blog.author} <br></br>
          <button onClick={() => handleDelete(blog.id)}>delete</button> <br></br>
        </div>
      </div>
    </div>
  )
}

const UserPropTypes = PropTypes.exact({
  id: PropTypes.string,
  name: PropTypes.string,
  username: PropTypes.string,
  token: PropTypes.string
})

const BlogPropTypes = PropTypes.exact({
  id: PropTypes.string,
  title: PropTypes.string,
  author: PropTypes.string,
  url: PropTypes.string,
  likes: PropTypes.number,
  user: UserPropTypes,
})

Blog.propTypes = {
  blog: BlogPropTypes,
  handleDelete: PropTypes.func.isRequired,
  handleLike: PropTypes.func.isRequired,
}

export default Blog
import React, { useState } from 'react'

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
            Likes {blog.likes}  <button onClick={()=>handleLike(blog.id)}>like</button> <br></br>
            {blog.author} <br></br>
            <button onClick={() => handleDelete(blog.id)}>delete</button> <br></br>
          </div>

        </div>
    </div>
  )
}

export default Blog
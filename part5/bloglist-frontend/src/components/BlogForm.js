import React from 'react'
import PropTypes from 'prop-types'

const BlogForm = ({ addBlog, title, author, url, handleTitleChange, handleAuthorChange, handleUrlChange }) => {
  return (
    <div className='formDiv'>
      <h2>Create new</h2>
      <form onSubmit={addBlog} data-testid="form">
        <div>
          title:
          <input
            id='title'
            value={title}
            onChange={handleTitleChange}
          />
        </div>
        <div>
          author:
          <input
            id='author'
            value={author}
            onChange={handleAuthorChange}
          />
        </div>
        <div>url:
          <input
            id='url'
            value={url}
            onChange={handleUrlChange}
          />
        </div>
        <div>
          <button type="submit">add</button>
        </div>
      </form>
    </div>
  )
}

BlogForm.propTypes = {
  addBlog: PropTypes.func.isRequired,
  title: PropTypes.string,
  author: PropTypes.string,
  url: PropTypes.string,
  handleTitleChange: PropTypes.func.isRequired,
  handleAuthorChange: PropTypes.func.isRequired,
  handleUrlChange: PropTypes.func.isRequired,
}

export default BlogForm
import Blog from './Blog'
import { React } from 'react'
import PropTypes from 'prop-types'

const Blogs = ({ blogs, handleDelete, handleLike }) => {

  return <>
    <h2>Blogs</h2>
    {blogs.map(blog =>
      <div key={blog.id}>
        <Blog blog={blog} handleDelete={handleDelete} handleLike={handleLike}></Blog>
      </div>
    )}
  </>
}

Blogs.propTypes = {
  blogs: PropTypes.array,
  handleDelete: PropTypes.func.isRequired,
  handleLike: PropTypes.func.isRequired,
}

export default Blogs
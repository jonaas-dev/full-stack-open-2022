import Blog from './Blog'
import { React } from 'react'

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

export default Blogs
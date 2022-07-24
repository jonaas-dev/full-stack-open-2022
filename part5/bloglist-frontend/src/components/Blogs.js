import Blog from "./Blog"

const Blogs = ({ blogs, handleDelete }) => {

  return <>
    <h2>Blogs</h2>
    {blogs.map(blog =>
      <div key={blog.id}>
        <Blog blog={blog} handleDelete={handleDelete}></Blog>
      </div>
    )}
  </>
}
  
  export default Blogs
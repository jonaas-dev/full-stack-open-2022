const Blogs = ({ blogs, handleDelete }) => {
    return <>
      <h2>Blogs</h2>
      {blogs.map(blog =>
        <p key={blog.id}>
          {blog.title} {blog.author} {blog.likes}
          <button onClick={()=>handleDelete(blog.id)}>
            delete
          </button>
        </p>
      )}
    </>
  }
  
  export default Blogs
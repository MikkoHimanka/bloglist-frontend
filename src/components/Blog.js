import React, { useState } from 'react'
import blogsService from '../services/blogs'

const Blog = ({ blog }) => {
  const [clicked, setClicked] = useState(true)

  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5
  }

  const like = async () => {
    const updatedBlog = {
      title: blog.title,
      author: blog.author,
      url: blog.url,
      likes: blog.likes + 1,
    }

    try {
      blogsService.like(updatedBlog, blog.id)
    } catch (exception) {
      console.log('RARRAARRARARA')
    }
  }

  if (!clicked) {
    return (
    <div style={blogStyle}>
      <div onClick={() => setClicked(!clicked)}>
        "{blog.title}" by {blog.author}<br />
        <a href={blog.url}>{blog.url}</a><br />
        {blog.likes} likes<button onClick={() => like()}>like</button><br />
        Added by {blog.user.name}
      </div>
    </div>
    )
  }

  return (
    <div style={blogStyle}>
      <div onClick={() => setClicked(!clicked)}>
        "{blog.title}" by {blog.author}
      </div>
    </div>
    )
}

export default Blog
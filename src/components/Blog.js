import React, { useState } from 'react'

const Blog = ({ user, blog, handleRemove, handleLike }) => {
	const [clicked, setClicked] = useState(true)

	const blogStyle = {
		paddingTop: 10,
		paddingLeft: 2,
		border: 'solid',
		borderWidth: 1,
		marginBottom: 5
	}

	if (!clicked) {
		if (user.username === blog.user.username) {
			return (
				<div style={blogStyle}>
					<div onClick={() => setClicked(!clicked)}>
          &quot;{blog.title}&quot; by {blog.author}<br />
						<a href={blog.url}>{blog.url}</a><br />
						{blog.likes} likes<button onClick={() => handleLike(blog)}>Like</button><br />
          Added by {blog.user.name}<br />
						<button onClick={() => handleRemove(blog)}>Delete</button>
					</div>
				</div>
			)
		}
		return (
			<div style={blogStyle}>
				<div onClick={() => setClicked(!clicked)}>
        &quot;{blog.title}&quot; by {blog.author}<br />
					<a href={blog.url}>{blog.url}</a><br />
					{blog.likes} likes<button onClick={() => handleLike(blog)}>Like</button><br />
          Added by {blog.user.name}<br />
				</div>
			</div>
		)
	}

	return (
		<div style={blogStyle}>
			<div onClick={() => setClicked(!clicked)} className="showButton">
      &quot;{blog.title}&quot; by {blog.author}
			</div>
		</div>
	)
}

export default Blog
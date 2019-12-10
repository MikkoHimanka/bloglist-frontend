import React, { useState, useEffect } from 'react'
import { useField } from './hooks'
import loginService from './services/login'
import blogsService from './services/blogs'
import Blog from './components/Blog'
import SubmitBlog from './components/SubmitBlog'
import Notification from './components/Notification'
import Togglable from './components/Togglable'

const App = () => {
	const username = useField('text')
	const password = useField('password')
	const [user, setUser] = useState(null)

	const [blogs, setBlogs] = useState([])

	const [error, setError] = useState(false)
	const [message, setMessage] = useState(null)

	const blogFormRef = React.createRef()

	useEffect(() => {
		const loggedUserJSON = window.localStorage.getItem('loggedUser')
		if (loggedUserJSON) {
			const user = JSON.parse(loggedUserJSON)
			setUser(user)
			blogsService.setToken(user.token)
			getAllBlogs()
		}
	}, [])

	const handleLogin = async (event) => {
		event.preventDefault()
		try {
			const user = await loginService.login({ username: username.value, password: password.value })

			window.localStorage.setItem('loggedUser', JSON.stringify(user))
			blogsService.setToken(user.token)

			setUser(user)
			username.reset()
			password.reset()
		} catch (exception) {
			handleMessage('Wrong username or password', true)
			console.log('Wrong credentials')
		}
	}

	const handleRemove = (blog) => {
		if (window.confirm(`Remove ${blog.title} by ${blog.author}`))
			try{
				blogsService.remove(blog.id)
			} catch (exception) {
				console.log('Error removing a blog post')
			}

		getAllBlogs()
	}

	const handleLike = (blog) => {
		const updatedBlog = {
			title: blog.title,
			author: blog.author,
			url: blog.url,
			likes: blog.likes + 1,
		}

		try {
			blogsService.like(updatedBlog, blog.id)
		} catch (exception) {
			console.log('Error trying to "like" a blog')
		}

		getAllBlogs()
	}

	const loginForm = () => (
		<form onSubmit={handleLogin}>
			<div>
        Username
				<input {...username.attributes()} />
			</div>
			<div>
        Password
				<input {...password.attributes()} />
			</div>
			<button type="submit">Login</button>
		</form>
	)

	const getAllBlogs = async ()  => {
		try {
			const blogs = await blogsService.getAll()

			setBlogs(blogs.sort((a, b) => b.likes - a.likes))
		} catch (exception) { console.log('error in retrieving blog entries') }
	}

	const submitBlogForm = () => (
		<Togglable buttonLabel={'New Blog'} ref={blogFormRef}>
			<h2>Create new</h2>
			<SubmitBlog message={handleMessage} />
		</Togglable>
	)

	const content = () => blogs.map(blog => <div key={blog.id}><Blog user={user} blog={blog} handleRemove={handleRemove} handleLike={handleLike} /></div>)

	const logout = () => {
		window.localStorage.clear()
		setUser(null)
	}

	const handleMessage = (notification, notificationError) => {
		setError(notificationError)
		setMessage(notification)
		setTimeout(() => {
			setMessage(null)
		}, 5000)
	}

	if (user === null) {
		return (
			<div>
				<h1>Log in to application</h1>
				<Notification error={error} message={message}/>
				{loginForm()}
			</div>
		)
	} else return (
		<div>
			<h1>Blogs</h1>
			<Notification error={error} message={message} />
			<p>{user.name} logged in <button onClick={() => logout()}>Logout</button></p>
			{submitBlogForm()}
			{content()}
		</div>
	)
}

export default App

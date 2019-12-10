import React from 'react'
import blogsService from '../services/blogs'
import { useField } from '../hooks'


const SubmitBlog = ({ message }) => {
	const title = useField('text')
	const author = useField('text')
	const url = useField('text')

	const handleSubmit = async (event) => {
		event.preventDefault()
		const blog = {
			title: title.value,
			author: author.value,
			url: url.value
		}

		try {
			blogsService.create(blog)
			message(`A new blog ${title.value} by ${author.value} added`, false)
			title.reset()
			author.reset()
			url.reset()
			setTimeout(() => {
				message(null, false)
			}, 5000)
		} catch (exception) {
			message('Error creating blog', true)
			setTimeout(() => {
				message(null, false)
			}, 5000)
			console.log('Error creating blog entry')
		}
	}
	return (
		<form onSubmit={handleSubmit}>
            title: <input {...title.attributes()} /><br />
            author: <input {...author.attributes()} /><br />
            url: <input {...url.attributes()} /><br />
			<button type="submit">Create</button>
		</form>
	)
}

export default SubmitBlog
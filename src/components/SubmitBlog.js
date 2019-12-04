import React, {useState} from 'react'
import blogsService from '../services/blogs'


const SubmitBlog = ({message}) => {
    const [title, setTitle] = useState('')
    const [author, setAuthor] = useState('')
    const [url, setUrl] = useState('')
    
    const handleSubmit = async (event) => {
        event.preventDefault()
        const blog = {
            title: title,
            author: author,
            url: url
        }

        try {
            blogsService.create(blog)
            message(`A new blog ${title} by ${author} added`, false)
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
            title: <input type="text" value={title} name="title" onChange={({target}) => setTitle(target.value)} />
            author: <input type="text" value={author} name="author" onChange={({target}) => setAuthor(target.value)} />
            url: <input type="text" value={url} name="url" onChange={({target}) => setUrl(target.value)} />
            <button type="submit">Create</button>
        </form>
    )
}

export default SubmitBlog
import React, {useState} from 'react';
import loginService from './services/login'
import blogsService from './services/blogs'
import Blog from './components/Blog'

const App = () => {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [user, setUser] = useState(null)
  
  const [blogs, setBlogs] = useState([])

  const handleLogin = async (event) => {
    event.preventDefault()
    try {
      const user = await loginService.login({username, password})

      setUser(user)
      setUsername('')
      setPassword('')
    } catch (exception) {
      console.log('Wrong credentials')
    }
  }

  const loginForm = () => (
    <form onSubmit={handleLogin}>
      <div>
        Username 
          <input type="text" value={username}
            name="Username" onChange={({target}) => setUsername(target.value)} />
      </div>
      <div>
        Password  
          <input type="password" value={password}
            name="Password" onChange={({target}) => setPassword(target.value)} />
      </div>
      <button type="submit">Login</button>
    </form>
  )

  const getAllBlogs = async ()  => {
    try {
      const blogs = await blogsService.getAll()

      setBlogs(blogs)
    } catch (exception) { console.log('error in retrieving blog entries') }
  }

  const content = () => {
    getAllBlogs()
    return blogs.map(blog => <li key={blog.id}><Blog blog={blog} /></li>)
  }

  return (
    <div>
      {user === null ?
        <h1>log in to application</h1> :
        <h1>blogs</h1>
      }

      {user === null ?
        loginForm() :
        <div>
          <p>{user.name} logged in</p>
        </div>
      }

      <ul>
        {user !== null ? content() : null}
      </ul>
    </div>
  )
}

export default App

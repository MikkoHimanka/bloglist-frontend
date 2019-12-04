import React, {useState, useEffect} from 'react';
import loginService from './services/login'
import blogsService from './services/blogs'
import Blog from './components/Blog'
import SubmitBlog from './components/SubmitBlog'
import Notification from './components/Notification'

const App = () => {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [user, setUser] = useState(null)
  
  const [blogs, setBlogs] = useState([])

  const [error, setError] = useState(false)
  const [message, setMessage] = useState(null)

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
      const user = await loginService.login({username, password})

      window.localStorage.setItem('loggedUser', JSON.stringify(user))
      blogsService.setToken(user.token)

      setUser(user)
      setUsername('')
      setPassword('')
      getAllBlogs()
    } catch (exception) {
      handleMessage('Wrong username or password', true)
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

      <SubmitBlog message={handleMessage} />
      {content()}
    </div>
  )
}

export default App

import React,{useEffect, useState} from 'react'
import loginService from './services/login'
import blogService from './services/blogs'
import Togglable from './components/togglable/Togglable'
import BlogForm from './components/blogForm/BlogForm'
import LoginForm from './components/loginForm/LoginForm'
import Blogs from './components/blogs/Blogs'
import Notification from './components/notification/Notification'


function App() {
 

  const [notification, setNotification] = useState({
    message:null,
    successful:null
  })
 
  const [user,setUser] = useState(null)
  const [blogs,setBlogs]=useState([])
 
  const showNotification =(messageContent,successfulMode)=>{
    setNotification({
        message: messageContent,
        successful: successfulMode
      })
      setTimeout(() => {
        setNotification({
          message:null,
          successful:null
        })
      },5000)
  }

  const handleLogin =async({username,password})=>{       
    try {
      
      const user = await loginService.login({
        username, password
      })   
      
      //? save user info to local storage
      window.localStorage.setItem(
        'loggedBlogappUser', JSON.stringify(user)
      )   
      blogService.setToken(user.token) //to use in create a new blog post
      setUser(user)    
      
    } catch (error) {
      /**
       * ! Access error message from server
       * ! error.response.data.error
       */
      showNotification(error.response.data.error,false)
      
    }
  }

  const handleLogout =(e)=>{
    e.preventDefault()
    window.localStorage.clear()
    setUser(null)
  }

  const handleAddBlog =async(newBlogObj)=>{  
    try {     
      const res = await blogService.create(newBlogObj)
      setBlogs([res,...blogs])
      showNotification(`A new blog ${res.title} by ${res.author} was added`,true)
     
    } catch (error) {
      console.log(error)
      showNotification('Error adding blog',false)
      
    }
  }

  const handleUpdateBlog = async(id,updatedBlog)=>{
    try {      
      const res =await blogService.update(id,updatedBlog)
      const updatedBlogs = blogs.map(blog=>blog.id!==id ? blog : {...blog,likes: res.likes} )
      setBlogs(updatedBlogs)
      showNotification(`Post has successfully updated`,true)
    } catch (error) {
      console.log(error)
    }
  }
  

  useEffect(()=>{
    (async()=>{
      const blogs = await blogService.getAll()
      setBlogs(blogs)
    })()
  },[])//?get all blog posts
  
  useEffect(()=>{
    const loggedUserJSON = window.localStorage.getItem('loggedBlogappUser')
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      setUser(user)
      blogService.setToken(user.token)
    }    
  },[])//?get user info and token from locals storage if available.

  return (
    <div>
      <h1>Blog</h1>
      
      {notification.message!==null && notification.successful!==null && 
        <Notification message={notification.message} successful={notification.successful}/>}
      
      {!user && <LoginForm handleLogin={handleLogin}/>}
      
      {user && user.token &&
        <>
          <div>{user.username} logged in <button onClick={handleLogout}>Logout</button></div>
          <br/>
          <Togglable buttonLabel='New Blog'>
             <BlogForm handleAddBlog={handleAddBlog} />
          </Togglable>
         
          <br/>

          <Blogs blogs={blogs} handleUpdateBlog={handleUpdateBlog}/>
          
        </>
      }
    </div>
  );
}

export default App;

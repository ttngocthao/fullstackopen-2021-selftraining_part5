import React,{useEffect, useState} from 'react'
import loginService from './services/login'
import blogService from './services/blogs'
import Togglable from './components/togglable/Togglable'
import BlogForm from './components/blogForm/BlogForm'
import LoginForm from './components/loginForm/LoginForm'



function App() {
  const notiStyles = {backgroundColor:'silver',borderRadius:'5px',padding:'15px',margin:'20px 0'}
  const successfulNotiStyles ={color:'green',border:'2px solid green'}
  const errorNotiStyles ={color:'red',border:'2px solid red'}

  const [notification, setNotification] = useState({
    message:null,
    successful:null
  })
 
  const [user,setUser] = useState(null)
  const [blogs,setBlogs]=useState([])
 

  const handleLogin =async({username,password})=>{       
    try {
      const user = await loginService.login({
        username, password,
      })   
      //? save user info to local storage
      window.localStorage.setItem(
        'loggedBlogappUser', JSON.stringify(user)
      )   
      blogService.setToken(user.token) //to use in create a new blog post
      setUser(user)
    

    } catch (exception) {
      setNotification({
        message:'Wrong username or password',
        successful:false
      })
      setTimeout(() => {
        setNotification({
          message:null,
          successful:null
        })
      }, 5000)
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
      setBlogs([...blogs,res])
     
      setNotification({
        message: `A new blog ${res.title} by ${res.author} was added`,
        successful: true
      })
      setTimeout(() => {
        setNotification({
          message:null,
          successful:null
        })
      },5000)
    } catch (error) {
      console.log(error)
      setNotification({
        message:'Error adding blog',
        successful: false
      })

      setTimeout(() => {
        setNotification({
          message:null,
          successful:null
        })
      }, 5000)
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
      {notification.message && notification.successful && 
        <div style={notification.successful ? {...successfulNotiStyles,...notiStyles}:{...errorNotiStyles,...notiStyles}}>
          {notification.message}
         </div>
      }
      {!user && <LoginForm handleLogin={handleLogin}/>}
      {user && user.token &&
        <>
          <div>{user.username} logged in <button onClick={handleLogout}>Logout</button></div>
          <br/>
          <Togglable buttonLabel='New Blog'>
             <BlogForm handleAddBlog={handleAddBlog}/>
          </Togglable>
         
          <br/>
          <div>
            {blogs.length===0 ? 'No blog posted' : blogs.map(b=><div key={b.id}>{b.title} - {b.author}</div>)}
          </div>
        </>
      }
    </div>
  );
}

export default App;

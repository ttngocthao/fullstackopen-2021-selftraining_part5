import React,{ useEffect, useState } from 'react'
import loginService from './services/login'
import blogService from './services/blogs'

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

  const sortList =(listArr,sortCriteria='id',order='asc') => {
    listArr.sort((a, b) => {
      const itemA = a[sortCriteria]
      const itemB = b[sortCriteria]
      let comparison = 0
      if (itemA > itemB) {
        comparison = 1
      }
      if (itemA < itemB) {
        comparison = -1
      }
      if(order==='des'){
        return comparison * -1
      }else{
        return comparison
      }

    })
    return listArr
  }


  const showNotification =(messageContent,successfulMode) => {
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

  const handleLogin =async({ username,password }) => {
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

  const handleLogout =(e) => {
    e.preventDefault()
    window.localStorage.clear()
    setUser(null)
  }

  const handleAddBlog =async(newBlogObj) => {
    try {
      const res = await blogService.create(newBlogObj)
      const allBlogs = await blogService.getAll()
      setBlogs(sortList(allBlogs,'likes','des'))
      showNotification(`A new blog ${res.title} by ${res.author} was added`,true)

    } catch (error) {
      console.log(error)
      showNotification(error.response.data.error,false)

    }
  }

  const handleUpdateBlog = async(id,updatedBlog) => {
    try {
      const res =await blogService.update(id,updatedBlog)
      const updatedBlogs = blogs.map(blog => blog.id!==id ? blog : { ...blog,likes: res.likes } )
      setBlogs(sortList(updatedBlogs,'likes','des'))
      showNotification('Post has successfully updated',true)
    } catch (error) {
      console.log(error)
    }
  }

  const handleDeleteBlog = async(id,title,author) => {
    try {
      await blogService.remove(id)
      const blogs = await blogService.getAll()
      setBlogs(sortList(blogs,'likes','des'))
      showNotification(`Blog ${title} by ${author} was successfully deleted`,true)

    } catch (error) {
      console.log(error)
      showNotification(error.response.data.error,false)
    }

  }


  useEffect(() => {
    // if(user){
    (async() => {
      const blogs = await blogService.getAll()

      setBlogs(sortList(blogs,'likes','des'))
    })()
    // }

  },[])//?get all blog posts

  useEffect(() => {
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

          <BlogForm handleAddBlog={handleAddBlog} />


          <br/>

          <Blogs
            blogs={blogs}
            handleUpdateBlog={handleUpdateBlog}
            user={user}
            handleDeleteBlog={handleDeleteBlog}
          />

        </>
      }
    </div>
  )
}

export default App

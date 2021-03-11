import React,{useState, useRef} from 'react'
import Togglable from '../togglable/Togglable'
import PropTypes from 'prop-types'


const BlogForm = ({handleAddBlog}) => {
    const blogFormRef = useRef()
    const [title,setTitle]= useState('')
    const [author,setAuthor]= useState('')
    const [url,setUrl] = useState('')

    const addBlog =(e)=>{
        e.preventDefault()
        handleAddBlog({title,author,url})
        setTitle('')
        setAuthor('')
        setUrl('')
        blogFormRef.current.toggleVisibility()
    }

    return (
        <Togglable buttonLabel='New Blog' ref={blogFormRef}>  
            <form onSubmit={addBlog}>
                <h2>Creat new</h2>
                <div>
                Title:
                <input 
                    type='text'
                    value={title}
                    name='title'
                    onChange={(e)=>setTitle(e.target.value)}
                />
                </div>
                <div>
                Author:
                <input 
                    type='text'
                    value={author}
                    name='author'
                    onChange={(e)=>setAuthor(e.target.value)}
                />
                </div>
                <div>
                Url:
                <input
                    type='text'
                    value={url}
                    name='url'
                    onChange={(e)=>setUrl(e.target.value)}
                />
                </div>
                <button type='submit'>Create</button>
            </form>
        </Togglable>
      
    )
}

BlogForm.propTypes = {
    handleAddBlog: PropTypes.func.isRequired
}

export default BlogForm

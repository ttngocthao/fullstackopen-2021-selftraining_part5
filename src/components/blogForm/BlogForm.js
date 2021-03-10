import React,{useState} from 'react'

const BlogForm = ({handleAddBlog}) => {
    const [title,setTitle]= useState('')
    const [author,setAuthor]= useState('')
    const [url,setUrl] = useState('')

    const addBlog =(e)=>{
        e.preventDefault()
        handleAddBlog({title,author,url})
        setTitle('')
        setAuthor('')
        setUrl('')
    }

    return (
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
    
    )
}

export default BlogForm

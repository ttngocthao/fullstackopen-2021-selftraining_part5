import React,{useState} from 'react'

const BlogPost = ({blog,handleUpdateBlog,postOwner,handleDeleteBlog}) => {

    const [viewDetail,setViewDetail] = useState(false)

    const handleViewDetailClick = ()=>{
        setViewDetail(!viewDetail)
    }

    const handleLikeClick =()=>{
        handleUpdateBlog(blog.id,{likes: blog.likes+1})
    }
  
    const handleRemoveClick =()=>{
       const result = window.confirm(`Remove blog ${blog.title} by ${blog.author}`)
       if(result){
           handleDeleteBlog(blog.id,blog.title,blog.author)
       }
    }

    return (
        <div style={{border:'1px solid black',borderRadius:'2px',padding:'5px',margin:'20px 0'}}>
            <p>{blog.title} <button onClick={handleViewDetailClick}>{viewDetail ? 'Hide':'View'}</button></p>
            <div style={{display: viewDetail ? 'block' : 'none'}}>
                <p>{blog.url}</p>
                <p>likes {blog.likes} <button onClick={handleLikeClick}>like</button></p>
                <p>{blog.author}</p>
                {postOwner && <button onClick={handleRemoveClick}>Remove</button>}
            </div>
        </div>
    )
}

export default BlogPost

import React,{ useState } from 'react'
import PropTypes from 'prop-types'


const BlogPost = ({ blog,handleUpdateBlog,postOwner,handleDeleteBlog }) => {

  const [viewDetail,setViewDetail] = useState(false)

  const handleViewDetailClick = () => {
    setViewDetail(!viewDetail)
  }

  const handleLikeClick =() => {
    handleUpdateBlog(blog.id,{ likes: blog.likes+1 })
  }

  const handleRemoveClick =() => {
    const result = window.confirm(`Remove blog ${blog.title} by ${blog.author}`)
    if(result){
      handleDeleteBlog(blog.id,blog.title,blog.author)
    }
  }

  return (
    <div className='blogPost' style={{ border:'1px solid black',borderRadius:'2px',padding:'5px',margin:'20px 0' }}>
      <p>{blog.title} - {blog.author}<button className='toggleBtn' onClick={handleViewDetailClick}>{viewDetail ? 'Hide':'View'}</button></p>
      {viewDetail && <div style={{ display: viewDetail ? 'block' : 'none' }} id='toggleContent'>
        <p>{blog.url}</p>
        <p className='likes'>likes {blog.likes} <button className='likeBtn' onClick={handleLikeClick}>like</button></p>
        <p>{blog.author}</p>
        {postOwner && <button className='removeBtn' onClick={handleRemoveClick}>Remove</button>}
      </div>}

    </div>
  )
}

BlogPost.propTypes = {
  blog: PropTypes.object.isRequired,
  handleUpdateBlog: PropTypes.func.isRequired,
  postOwner: PropTypes.bool.isRequired,
  handleDeleteBlog: PropTypes.func.isRequired
}

export default BlogPost

import React from 'react'
import Togglable from '../togglable/Togglable'
import BlogPost from './BlogPost'

const Blogs = ({blogs,handleUpdateBlog}) => {
    return (
        <div>
            {blogs.length===0 ? 'No blog posted' : blogs.map(blog=>{
                return( 
                    <BlogPost key={blog.id} blog={blog} handleUpdateBlog={handleUpdateBlog}/>
                    
                )
           
            })}
        </div>
    )
}

export default Blogs

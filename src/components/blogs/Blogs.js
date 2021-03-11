import React from 'react'

import BlogPost from './BlogPost'

const Blogs = ({blogs,handleUpdateBlog,user,handleDeleteBlog}) => {
    return (
        <div>
            {blogs.length===0 ? 'No blog posted' : blogs.map(blog=>{
                // // postOwner={user.username===blog.user.username ? true : false}
                // console.log('user',user)
                // console.log('blog',blog)
                return( 
                    <BlogPost 
                        key={blog.id} 
                        blog={blog} 
                        handleUpdateBlog={handleUpdateBlog} 
                        postOwner={user.username===blog.user.username ? true : false}
                        handleDeleteBlog={handleDeleteBlog}
                    />
                    
                )
           
            })}
        </div>
    )
}

export default Blogs

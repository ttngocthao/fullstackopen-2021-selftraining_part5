import React from 'react'
import PropTypes from 'prop-types'

import BlogPost from './BlogPost'

const Blogs = ({ blogs,handleUpdateBlog,user,handleDeleteBlog }) => {
  return (
    <div id='blogList'>
      {blogs.length===0 ? 'No blog posted' : blogs.map(blog => {
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

Blogs.propTypes ={
  blogs: PropTypes.array.isRequired,
  handleUpdateBlog: PropTypes.func.isRequired,
  user: PropTypes.object.isRequired,
  handleDeleteBlog: PropTypes.func.isRequired
}

export default Blogs

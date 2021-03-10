import React from 'react'

const Blogs = ({blogs}) => {
    return (
        <div>
            {blogs.length===0 ? 'No blog posted' : blogs.map(b=><div key={b.id}>{b.title} - {b.author}</div>)}
        </div>
    )
}

export default Blogs

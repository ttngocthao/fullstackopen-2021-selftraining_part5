import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { render } from '@testing-library/react'
import { prettyDOM } from '@testing-library/dom'
import BlogPost from './BlogPost'

const blog = {
  title: 'Testing blog post',
  url:'https://thisisurl.com',
  likes:5,
  author:'Someone'
}
const handleUpdateBlog =() => {
  console.log('handle update blog')
}
const handleDeleteBlog =() => {
  console.log('handle delete blog')
}
const postOwner = false
let component
describe('renders blog post by default',() => {
  beforeEach(() => {
    component = render(
      <BlogPost
        blog={blog}
        handleDeleteBlog={handleDeleteBlog}
        handleUpdateBlog={handleUpdateBlog}
        postOwner={postOwner}
      />)
  })

  test('renders blog post title and author',() => {

    expect(component.container).toHaveTextContent(blog.title)
    expect(component.container).toHaveTextContent(blog.author)

  })

  test('does NOT render url or number of likes',() => {

    expect(component.container).not.toHaveTextContent(blog.url)
    expect(component.container).not.toHaveTextContent(blog.likes)

  })
})

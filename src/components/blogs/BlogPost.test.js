import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { render, fireEvent } from '@testing-library/react'
import { prettyDOM } from '@testing-library/dom'
import BlogPost from './BlogPost'

const blog = {
  title: 'Testing blog post',
  url:'https://thisisurl.com',
  likes:5,
  author:'Someone'
}

const handleDeleteBlog =() => {
  console.log('handle delete blog')
}
const postOwner = false
let component
const mockHandler = jest.fn()
describe('renders blog post by default',() => {
  beforeEach(() => {
    component = render(
      <BlogPost
        blog={blog}
        handleDeleteBlog={handleDeleteBlog}
        handleUpdateBlog={mockHandler}
        postOwner={postOwner}
      />)
  })

  test('renders blog post title and author',() => {

    expect(component.container).toHaveTextContent(blog.title)
    expect(component.container).toHaveTextContent(blog.author)

  })

  test('do NOT render url or number of likes',() => {
    /**
     * !IF WANT TO ACCESS THE STYLE
     * ? const toggleContent = component.container.querySelector('.toggleContent')
     * ? expect(toggleContent).toHaveStyle('display:none')
     */

    expect(component.container).not.toHaveTextContent(blog.url)
    expect(component.container).not.toHaveTextContent(blog.likes)

  })

  test('initially renders btn which label is VIEW ',() => {
    const button = component.container.querySelector('#toggleBtn')
    expect(button).toHaveTextContent(/view/ig)
  })

  test('shows url, likes, btn label changes to HIDE when btn controlling the shown details has been clicked',() => {
    const toggleBtn = component.container.querySelector('#toggleBtn')
    fireEvent.click(toggleBtn)
    expect(component.container).toHaveTextContent(blog.url)
    expect(component.container).toHaveTextContent(blog.likes)
    expect(toggleBtn).toHaveTextContent(/hide/ig)
  })

  test('handle like click function is called twice if the like button is clicked twice',() => {

    const toggleBtn = component.container.querySelector('#toggleBtn')
    fireEvent.click(toggleBtn)
    const likeBtn = component.container.querySelector('#likeBtn')

    fireEvent.click(likeBtn)
    fireEvent.click(likeBtn)

    expect(mockHandler.mock.calls).toHaveLength(2)

  })
})

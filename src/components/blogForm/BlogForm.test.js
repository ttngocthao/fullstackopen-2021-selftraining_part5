import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { render, fireEvent } from '@testing-library/react'
import { prettyDOM } from '@testing-library/dom'

import BlogForm from './BlogForm'

test('<BlogForm/> the form calls the event handler it received as props with the right details when a new blog is created',() => {
  const handleAddBlog = jest.fn()
  const component = render(<BlogForm handleAddBlog={handleAddBlog}/>)
  const form = component.container.querySelector('form')
  const authorInput = component.container.querySelector('#author')
  fireEvent.change(authorInput,{
    target:{
      value:'I am the author of the blog'
    }
  })
  fireEvent.submit(form)
  //console.log(handleAddBlog.mock.calls) --> [ [ { title: '', author: 'I am the author of the blog', url: '' } ] ]
  expect(handleAddBlog.mock.calls).toHaveLength(1)
  expect(handleAddBlog.mock.calls[0][0].author).toBe('I am the author of the blog')

})




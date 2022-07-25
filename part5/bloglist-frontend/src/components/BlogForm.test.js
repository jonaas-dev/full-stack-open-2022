import React from 'react'
import { render, fireEvent } from '@testing-library/react'
import '@testing-library/jest-dom/extend-expect'
import BlogForm from './BlogForm'

test('<BlogForm /> updates parent state and calls onSubmit', () => {
  const handleTitleChange = jest.fn()
  const handleAuthorChange = jest.fn()
  const handleUrlChange = jest.fn()
  const addBlog = jest.fn()

  const initialBlog = {
    title : '',
    author: '',
    url: ''
  }

  const component = render(
    <BlogForm
      title={initialBlog.title}
      author={initialBlog.author}
      url={initialBlog.url}
      handleTitleChange={handleTitleChange}
      handleAuthorChange={handleAuthorChange}
      handleUrlChange={handleUrlChange}
      addBlog={addBlog}
    />
  )

  // component.debug()

  var title = component.container.querySelector('#title')
  var author = component.container.querySelector('#author')
  var url = component.container.querySelector('#url')

  const form = component.getByTestId('form')


  fireEvent.change(title, {
    target: { value: 'My Title' }
  })
  fireEvent.change(author, {
    target: { value: 'My Author' }
  })
  fireEvent.change(url, {
    target: { value: 'www.url.com' }
  })

  fireEvent.submit(form)

  expect(addBlog).toHaveBeenCalled()

  // Check content
  // TODO
})
import React from 'react'
import { render, fireEvent } from '@testing-library/react'
import '@testing-library/jest-dom/extend-expect'
import Blog from './Blog'

test('renders content', () => {
  const blog = {
    title: 'TDD harms architecture',
    author: 'Robert C. Martin',
    url: 'http://blog.cleancoder.com/uncle-bob/2017/03/03/TDD-Harms-Architecture.html',
    likes: 0,
  }

  const mockHandleLike = jest.fn()
  const mockHandleDelete = jest.fn()

  const component = render(
    <Blog blog={blog} handleDelete={mockHandleDelete} handleLike={mockHandleLike} />
  )

  expect(component.container).toHaveTextContent(
    'TDD harms architecture'
  )
})

test('renders content', () => {
  const blog = {
    title: 'TDD harms architecture',
    author: 'Robert C. Martin',
    url: 'http://blog.cleancoder.com/uncle-bob/2017/03/03/TDD-Harms-Architecture.html',
    likes: 0,
  }

  const mockHandleLike = jest.fn()
  const mockHandleDelete = jest.fn()

  const component = render(
    <Blog blog={blog} handleDelete={mockHandleDelete} handleLike={mockHandleLike} />
  )

  // print HTML generated
  // component.debug()

  // method 1
  expect(component.container).toHaveTextContent(
    'TDD harms architecture'
  )

  // method 2
  const element = component.getByText(
    'TDD harms architecture'
  )
  expect(element).toBeDefined()

  // method 3
  const div = component.container.querySelector('.blog')
  expect(div).toHaveTextContent(
    'TDD harms architecture'
  )
})

test('clicking the button calls event handler once', () => {
  const blog = {
    title: 'TDD harms architecture',
    author: 'Robert C. Martin',
    url: 'http://blog.cleancoder.com/uncle-bob/2017/03/03/TDD-Harms-Architecture.html',
    likes: 0,
  }

  const mockHandleLike = jest.fn()
  const mockHandleDelete = jest.fn()

  const component = render(
    <Blog blog={blog} handleDelete={mockHandleDelete} handleLike={mockHandleLike} />
  )

  // component.debug()

  const button = component.getByText('like')
  fireEvent.click(button)
  fireEvent.click(button)

  expect(mockHandleLike.mock.calls).toHaveLength(2)
})

/**
 * Realice una prueba que verifique que el componente que muestra un blog muestre el título y el autor del blog,
 * pero no muestre su URL o el número de likes por defecto
 */
test('clicking the view button and checking visibility of elements', () => {
  const blog = {
    title: 'TDD harms architecture',
    author: 'Robert C. Martin',
    url: 'http://blog.cleancoder.com/uncle-bob/2017/03/03/TDD-Harms-Architecture.html',
    likes: 0,
  }

  const mockHandleLike = jest.fn()
  const mockHandleDelete = jest.fn()

  const component = render(
    <Blog blog={blog} handleDelete={mockHandleDelete} handleLike={mockHandleLike} />
  )

  const view = component.getByText('view')
  fireEvent.click(view)

  var title = component.getByText(blog.title)
  expect(title).not.toHaveStyle('display: none')

  var div = component.container.querySelector('.BlogFields')
  expect(div).toHaveTextContent(
    blog.author, blog.url, 'likes ' + blog.likes
  )


  const hide = component.getByText('hide')
  fireEvent.click(hide)

  title = component.getByText(blog.title)
  expect(title).not.toHaveStyle('display: none')

  div = component.container.querySelector('.BlogFields')
  expect(div).toHaveStyle('display: none')

})
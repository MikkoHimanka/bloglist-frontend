import React from 'react'
import { render, fireEvent } from '@testing-library/react'
import SimpleBlog from './SimpleBlog'

describe('<SimpleBlog />', () => {
	const exampleBlog = {
		title: 'Title',
		author: 'Author',
		likes: 7
	}

	test('title, author and likes are rendered', () => {
		const component = render(
			<SimpleBlog blog={exampleBlog} onCLick={null} />
		)

		const titleDiv = component.container.querySelector('.title')
		expect(titleDiv).toHaveTextContent(
			'Title Author'
		)

		const contentDiv = component.container.querySelector('.content')
		expect(contentDiv).toHaveTextContent('blog has 7 likes')
	})

	test('if like is pressed twice, handler is called twice', () => {
		const mockHandler = jest.fn()

		const { getByText } = render(
			<SimpleBlog blog={exampleBlog} onClick={mockHandler} />
		)

		const button = getByText('like')

		fireEvent.click(button)
		fireEvent.click(button)

		expect(mockHandler.mock.calls.length).toBe(2)
	})
})


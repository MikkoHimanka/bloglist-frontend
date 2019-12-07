import React from 'react'
import { render } from '@testing-library/react'
import SimpleBlog from './SimpleBlog'

describe('<SimpleBlog />', () => {
	let component

	const exampleBlog = {
		title: 'Title',
		author: 'Author',
		likes: 7
	}

	beforeEach(() => {
		component = render(
			<SimpleBlog blog={exampleBlog} onCLick={null} />
		)
	})

	test('title, author and likes are rendered', () => {
		const titleDiv = component.container.querySelector('.title')
		expect(titleDiv).toHaveTextContent(
			'Title Author'
		)

		const contentDiv = component.container.querySelector('.content')
		expect(contentDiv).toHaveTextContent('blog has 7 likes')
	})
})

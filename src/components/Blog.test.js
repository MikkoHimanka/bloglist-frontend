import React from 'react'
import { render, fireEvent } from '@testing-library/react'
import Blog from './Blog'

describe('<Blog />', () => {
	let rendered

	const exampleUser = {
		username: 'testiukko',
		name: 'Testi Ukko'
	}

	const exampleBlog = {
		title: 'Title',
		author: 'Author',
		likes: 7,
		url: 'urli',
		user: exampleUser
	}


	beforeEach(() => {
		rendered = render(
			<Blog user={exampleUser} blog={exampleBlog} handleRemove={null} handleLike={null} />
		)
	})

	test('only the name and author are shown by default', () => {
		expect(rendered.container).toHaveTextContent('"' + exampleBlog.title + '"' + ' by ' + exampleBlog.author)
	})

	test('when clicked, all info is shown', () => {
		const blah = rendered.container.querySelector('.showButton')

		fireEvent.click(blah)

		expect(rendered.container).toHaveTextContent('"' + exampleBlog.title + '"' + ' by ' + exampleBlog.author)
		expect(rendered.container).toHaveTextContent(exampleBlog.url)
		expect(rendered.container).toHaveTextContent(exampleBlog.likes + ' likes')
		expect(rendered.container).toHaveTextContent('Added by ' + exampleBlog.user.name)

	})
})
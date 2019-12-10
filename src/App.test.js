import React from 'react'
import { render, waitForElement } from '@testing-library/react'
jest.mock('./services/blogs')
import App from './App'

describe('<App />', () => {
	test('only login form is rendered if not logged in', async () => {
		const component = render(<App />)
		component.rerender(<App />)

		await waitForElement(() => component.getByText('Login'))

		expect(component.container).toHaveTextContent('Password')
		expect(component.container).not.toHaveTextContent('Togglable')
	})

	test('blog posts are rendered when logged in', async () => {
		const user = {
			username: 'tester',
			token: '1231231214',
			name: 'Donald Tester'
		}

		localStorage.setItem('loggedUser', JSON.stringify(user))

		const component = render(<App />)
		component.rerender(<App />)

		await waitForElement(() => component.getByText('Logout'))
		//await waitForElement(() => component.container.querySelector('.togglable'))

		expect(component.container).toHaveTextContent('tititit')
		expect(component.container).toHaveTextContent('adfsfdsa')
		expect(component.container).toHaveTextContent('1231231')
	})
})
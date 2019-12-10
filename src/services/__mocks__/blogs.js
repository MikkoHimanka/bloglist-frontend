const blogs = [
	{
		title: 'tititit',
		author: 'ataataat',
		url: 'dsfdssdf',
		likes: 3,
		id: '1'
	},
	{
		title: 'adfsfdsa',
		author: 'hhhhh',
		url: '321312',
		likes: 1,
		id: '2'
	},
	{
		title: '1231231',
		author: 'ggggggg',
		url: 'aaaaa',
		likes: 0,
		id: '3'
	}
]


const setToken = () => {
	return
}

const getAll = () => {
	return Promise.resolve(blogs)
}

export default { getAll, setToken }
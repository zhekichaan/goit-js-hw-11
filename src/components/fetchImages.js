import axios from 'axios';

export default async function fetchImages(page, query) {
	const params = new URLSearchParams({
		key: "28497518-43a8700447690b37c28e4ef7c",
		q: query,
		image_type: "photo",
		orientation: "horizontal",
		safesearch: "true",
		page: page,
		per_page: 40
	})
	return await axios.get(`https://pixabay.com/api/?${params}`)
}
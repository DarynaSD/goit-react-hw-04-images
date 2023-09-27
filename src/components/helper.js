import axios from "axios";

const BASE_URL = 'https://pixabay.com/api/';
const API_KEY = '38678153-9f2a8d4533b12670e8b2dc2f4';

const params = new URLSearchParams({
        key: API_KEY,
        image_type: 'photo',
        safesearch: true,
        orientation: 'horizontal',
        per_page: 12,
})

export const findImagesByQuery = async (query, page) => {
	const { data } = await axios(`${BASE_URL}?${params}&q=${query}&page=${page}`)
    return data;
}
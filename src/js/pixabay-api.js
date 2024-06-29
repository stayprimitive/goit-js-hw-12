

import axios from 'axios';
export async function getImages(request, currentPage) {
    const response = await axios.get("https://pixabay.com/api/", {
        params: {
            key: '44631017-28d3930dbc3d7d0d9679d8f71',
            q: request,
            image_type: 'photo',
            orientation: 'horizontal',
            safesearch: true,
            page: currentPage,
            per_page: 15,
        }
    });
    return response.data;
}
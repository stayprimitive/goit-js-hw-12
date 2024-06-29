export function findImage(inputValue) {
  const BASE_URL = 'https://pixabay.com';
  const END_POINT = '/api/';
  const params = new URLSearchParams({
    key: '44631017-28d3930dbc3d7d0d9679d8f71',
    q: inputValue,
    image_type: 'photo',
    orientation: 'horizontal',
    safesearch: true,
    per_page: 18,
  });

  const url = `${BASE_URL}${END_POINT}?${params}`;
  const headers = {};
  return fetch(url, { headers }).then(res => {
    if (!res.ok) {
      throw new Error(res.statusText);
    }
    return res.json();
  });
}
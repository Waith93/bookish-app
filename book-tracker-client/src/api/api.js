const BASE_URL = 'http://localhost:5555';
async function request(path, options = {}) {
  const token = localStorage.getItem('token');
  const headers = {'Content-Type': 'application/json', ...(token && {Authorization: `Bearer ${token}`})};
  const response = await fetch(`${BASE_URL}${path}`, {...options, headers});
  if (!response.ok) throw new Error('API request failed');
  return response.json();
}
export const get = (path) => request(path, {method: 'GET'});
export const post = (path, body) => request(path, {method: 'POST', body: JSON.stringify(body)});
export const patch = (path, body) => request(path, {method: 'PATCH', body: JSON.stringify(body)});
export const del = (path) => request(path, {method: 'DELETE'});
export default {get, post, patch, delete: del};

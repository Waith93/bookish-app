import { data } from "react-router-dom";

const BASE_URL = 'http://127.0.0.1:5000';
async function request(path, options = {}) {
  const token = localStorage.getItem('token');
  const headers = {'Content-Type': 'application/json', ...(token && {Authorization: `Bearer ${token}`})};
  const response = await fetch(`${BASE_URL}${path}`, {...options, headers});
  const data = await response.json();
  if (!response.ok) throw new Error(data.error || 'API request failed');
  return data;
}
export const get = (path) => request(path, {method: 'GET'});
export const post = (path, body) => request(path, {method: 'POST', body: JSON.stringify(body)});
export const patch = (path, body) => request(path, {method: 'PATCH', body: JSON.stringify(body)});
export const del = (path) => request(path, {method: 'DELETE'});
export default {get, post, patch, delete: del};

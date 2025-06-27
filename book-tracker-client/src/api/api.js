const BASE_URL = 'http://localhost:5555/api';

async function request(path, options = {}) {
  const token = localStorage.getItem('token');
  const headers = {
    'Content-Type': 'application/json',
    ...(token && { Authorization: `Bearer ${token}` }),
  };

  const response = await fetch(`${BASE_URL}${path}`, {
    ...options,
    headers,
  });

  const data = await response.json().catch(() => ({})); // handle empty response

  if (!response.ok) {
    return {
      success: false,
      message: data.error || 'Request failed',
      status: response.status,
    };
  }

  return {
    success: true,
    data,
  };
}

export const get = (path) => request(path, { method: 'GET' });
export const post = (path, body) => request(path, { method: 'POST', body: JSON.stringify(body) });
export const patch = (path, body) => request(path, { method: 'PATCH', body: JSON.stringify(body) });
export const del = (path) => request(path, { method: 'DELETE' });

export default { get, post, patch, delete: del };

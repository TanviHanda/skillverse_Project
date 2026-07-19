const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:4000/api';

export class ApiError extends Error { }

export async function api<T>(path: string, options: RequestInit = {}): Promise<T> {
  const token = localStorage.getItem('skillhub_token');

  const res = await fetch(`${API_URL}${path}`, {
    ...options,
    headers: {
      'Content-Type': 'application/json',
      ...(token ? { Authorization: `Bearer ${token}` } : {}),
      ...options.headers
    }
  });

  if (!res.ok) {
    const body = await res.json().catch(() => ({}));
    throw new ApiError(body.error || body.message || 'Request failed');
  }
  return res.status === 204 ? (undefined as T) : (res.json() as Promise<T>);
}

export const apiActions = {
  get: <T>(path: string) => api<T>(path, { method: 'GET' }),
  post: <T>(path: string, body: any) =>
    api<T>(path, { method: 'POST', body: JSON.stringify(body) }),
};

export const authApi = {
  signup: (name: string, email: string, password: string) =>
    apiActions.post<{ token: string; user: { id: string, name: string, email: string } }>('/auth/register', { name, email, password })
};

export const session = {
  logout: () => {
    localStorage.removeItem('skillhub_token');
    localStorage.removeItem('user');
  },
  loggedIn: () => Boolean(localStorage.getItem('skillhub_token'))
};
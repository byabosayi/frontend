import axios from 'axios'

const api = axios.create({
  baseURL:
    process.env.NEXT_PUBLIC_BACKEND_URL || 'http://localhost:8000/api/v1/',
  headers: {'Content-Type': 'application/json'},
})

/* attach token from Redux before every request */
api.interceptors.request.use((config) => {
  if (typeof window !== 'undefined') {
    const raw = localStorage.getItem('auth') // or 'auth_token'
    const parsed = raw ? JSON.parse(raw) : null
    const token = parsed?.token ?? parsed // handle `{authToken}` or plain string

    // const token = localStorage.getItem('auth_token')
    if (token) config.headers.Authorization = `Bearer ${token}`
  }

  return config
})

export default api

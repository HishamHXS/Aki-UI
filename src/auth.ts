import { jwtDecode } from 'jwt-decode'

export function getIdFromToken(): string | null {
  const token = sessionStorage.getItem('token')?.split(' ')[1]

  if (!token || token.split('.').length !== 3) {
    console.error('Invalid or missing token')
    return null
  }

  try {
    const decoded: { sub?: string } = jwtDecode(token)
    return decoded.sub || null
  } catch (error) {
    console.error('Failed to decode JWT', error)
    return null
  }
}

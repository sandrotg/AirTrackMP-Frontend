import { getApiToken } from './auth-token'

const API_URL =
    process.env.NEXT_PUBLIC_API_URL ||
    'https://airtrackmp-backend.onrender.com'

interface CreateNodeInput {
    name: string
    location: string
    latitude: number
    longitude: number
}

interface UpdateNodeInput {
    name?: string
    location?: string
    latitude?: number
    longitude?: number
    status?: string
}

async function getHeaders() {
    const token = getApiToken()
    return {
        'Content-Type': 'application/json',
        ...(token ? { Authorization: `Bearer ${token}` } : {})
    }
}

export async function createNode(data: CreateNodeInput) {
    const res = await fetch(`${API_URL}/api/nodes`, {
        method: 'POST',
        headers: await getHeaders(),
        body: JSON.stringify({ ...data, status: 'ACTIVE' })
    })
    if (!res.ok) {
        const text = await res.text()
        throw new Error(text || `Error ${res.status} creating node`)
    }
    return res.json()
}

export async function updateNode(id: number, data: UpdateNodeInput) {
    const res = await fetch(`${API_URL}/api/nodes/${id}`, {
        method: 'PUT',
        headers: await getHeaders(),
        body: JSON.stringify(data)
    })
    if (!res.ok) {
        const text = await res.text()
        throw new Error(text || `Error ${res.status} updating node`)
    }
    return res.json()
}

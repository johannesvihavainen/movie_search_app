const url = 'https://api.themoviedb.org/3/configuration';
const API_BASE = "https://api.themoviedb.org/3";
const options = {
    method: 'GET',
    headers: {
        accept: 'application/json',
        Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJlNjBmZjg4ZDA5ZDI5MzU2ZTAxOWI4ZWE1NTQ2NjgzMSIsIm5iZiI6MTc1NDUwMjU2Ny42NDksInN1YiI6IjY4OTM5NWE3OWU2MDhmZDlmN2FiOWE0MCIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.Tuv1rnnbbUIJii9gojFlhY-K-nF4Igv_JjxIY5sahIQ'
    }
};

// fetch(url, options)
//   .then(res => res.json())
//   .then(json => console.log(json))
//   .catch(err => console.error(err));

export async function fetchConfig() {
    try {
        const res = await fetch(url, options)
        if (!res.ok) throw new Error('Failed to fetch configuration')
        return await res.json()
    } catch (error) {
        console.error(error)
        return null
    }
}

export async function searchMovies(query) {
    const res = await fetch(`${API_BASE}/search/movie?query=${encodeURIComponent(query)}`, options)
    if (!res.ok) throw new Error('Failed to fetch movies')
    return res.json()
}

export async function fetchAllMovies(page = 1) {
    const res = await fetch(`${API_BASE}/discover/movie?page=${page}`, options)
    if (!res.ok) throw new Error('Failed to fetch movies')
    return res.json()
}
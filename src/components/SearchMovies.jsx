import React, { useState, useEffect } from 'react'
import { fetchConfig, fetchAllMovies, searchMovies } from '../api/api'

export default function SearchMovies() {
    const [value, setValue] = useState("")
    const [config, setConfig] = useState(null)
    const [movies, setMovies] = useState([])

    useEffect(() => {
        async function loadData() {
            const cfg = await fetchConfig()
            setConfig(cfg)

            const movieData = await fetchAllMovies()
            console.log(movieData.results);

            setMovies(movieData.results)
        }
        loadData()
    }, [])

    async function handleSearch(e) {
        e.preventDefault()
        if (!value.trim()) return

        const searchResults = await searchMovies(value)
        setMovies(searchResults.results)
    }

    if (!config) return <p>Loading...</p>

    const baseUrl = config.images.secure_base_url
    const posterSize = config.images.poster_sizes[3]

    return (
        <div>
            <form className='movie-search-container' onSubmit={handleSearch}>
                <h1>Discover your next <span>favorite movie</span> <span>effortlessly.</span></h1>
                <div className="search-wrapper">
                    <input type="text" placeholder="Find a movie worth watching..." value={value} onChange={(e) => setValue(e.target.value)} />
                    <button type='submit'>Search</button>
                </div>
            </form>
            <div className='movie-container'>
                {movies
                .filter(movie => movie.poster_path)
                .map(movie => (
                    <div key={movie.id}>
                        <div className='movie-card'>
                            <img className='movie-image' src={`${baseUrl}${posterSize}${movie.poster_path}`} alt={movie.title} />
                            <div className="movie-info">
                                <p className='movie-title'>{movie.title}</p>
                                <p><span className='movie-release-date'>Release Date:</span> {new Date(movie.release_date).toLocaleDateString()}</p>
                            </div>
                        </div>

                    </div>
                ))}
            </div>
        </div>
    )
}
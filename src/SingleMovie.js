import React, { useState, useEffect } from 'react'
import { useParams, Link } from 'react-router-dom'
import { API_ENDPOINT } from './context'

const SingleMovie = () => {
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState({show: false, msg: ''})
  const [movie, setMovie] = useState({})
  const { id } = useParams()
  const fetchData = async(url)=> {
    setIsLoading(true)
    try {
      const response = await fetch(url);
      const data = await response.json();
      if(data.Response === 'False') {
        setError({show: true, msg: data.Error})
      } else {
        setMovie(data)
      }
    } catch (error) {
      
    }
    setIsLoading(false)
  }
  useEffect(()=> {
    fetchData(`${API_ENDPOINT}&i=${id}`)
  }, [id])
  if(isLoading) {
    return <div className='loading'></div>
  }
  if(error.show) {
    return <div className='error'>{error.msg}</div>
  }
  return <section className='single-movie'>
    <img src={movie.Poster} alt={movie.Title} />
    <div className='single-movie-info'>
      <h2>{movie.Title}</h2>
      <p>{movie.Plot}</p>
      <h4>{movie.Year}</h4>
      <Link className='btn' to='/'>Back to Movies</Link>
    </div>
  </section>
}

export default SingleMovie

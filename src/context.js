import React, { useState, useContext, useEffect } from 'react'
// make sure to use https
export const API_ENDPOINT = `https://www.omdbapi.com/?apikey=cf2ece6f`;
const AppContext = React.createContext()

const AppProvider = ({ children }) => {
  const [isLoading, setIsloading] = useState(true)
  const [query, setQuery] = useState('batman')
  const [movies, setMovies] = useState([])
  const [error, setError] = useState({show: false, msg: ''})
  const fetchData = async(url)=> {
    setIsloading(true)
    try {
      const response = await fetch(url)
      const data = await response.json()
      if(data.Response === 'True') {
        setMovies(data.Search)
        setError({ show: false, msg: "" });
      } else {
        setError({show: true, msg: data.Error})
      }
    } catch (error) {
      console.log(error);
    }
    setIsloading(false)
  }
  useEffect(() => {
    fetchData(`${API_ENDPOINT}&s=${query}`)
  }, [query]);
  return <AppContext.Provider value={{
    isLoading,
    query,
    setQuery,
    error,
    movies
  }}>{children}</AppContext.Provider>
}
// make sure use
export const useGlobalContext = () => {
  return useContext(AppContext)
}

export { AppContext, AppProvider }

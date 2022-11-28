import React from 'react'
import { useGlobalContext } from './context'
const SearchForm = () => {
  const { error, setQuery, query } = useGlobalContext()
  return (
    <form onSubmit={(e) => e.preventDefault()} className="search-form">
      <h2>Search Movies</h2>
      <input
        type="text"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        className='form-input'
      />
      {
        error.show&&<div className='error'>{error.msg}</div>
      }
    </form>
  );
}

export default SearchForm

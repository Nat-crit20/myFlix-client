import { useEffect, useState } from "react"
import { MovieCard } from "../movie-card/movie-card"
import { MovieView } from "../movie-view/movie-view"

export const MainView = () =>{
    const [movies, setMovies] = useState([])

    const [selectedMovie, setSelectedMovie] = useState(null)
    useEffect(()=>{
      fetch("https://blooming-shore-67354.herokuapp.com/movies").then(res=>res.json()).then(data=>{
        setMovies(data)
      })
    })
    if(selectedMovie){
      let similarMovies = movies.filter(movie=> movie.Title !== selectedMovie.Title && movie.Genre.Name === selectedMovie.Genre.Name);
      return (<div>
                <MovieView movie={selectedMovie} onBackClick={()=>setSelectedMovie(null)} />
                <br />
                <h2>Similar Movies</h2>
                {similarMovies.map((movie)=>{
                  return <MovieCard movie={movie} key={movie._id} handleClick={(newSelectedMovie)=> {setSelectedMovie(newSelectedMovie)}} />
                })}
              </div>
              )
    }
    if(movies.length === 0){
        return <h1>There are no movies in the list</h1>
    }

    return (
        <div>
            {movies.map(movie=>{
                return <MovieCard movie={movie} key={movie._id} handleClick={(newSelectedMovie)=> {setSelectedMovie(newSelectedMovie)}} />
            })}
        </div>
    )
}
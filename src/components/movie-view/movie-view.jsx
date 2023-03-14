
export const MovieView = ({movie, onBackClick}) =>{
  return(
    <div>
        <div>
            <img src={movie.ImagePath} alt="" />
        </div>
        <div>
         <h1>Title: {movie.Title}</h1>   
        </div>
        <div>
          <h2>Director:{movie.Director.Name}</h2>   
        </div>
        <div>
          <p>Genre: {movie.Genre.Name}</p>
        </div>
        <div>
          <p>{movie.Description}</p>
        </div>
        <div>
            <button onClick={onBackClick}>Back</button>
        </div>
    </div>
  )
}
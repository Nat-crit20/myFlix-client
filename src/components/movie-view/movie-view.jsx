
export const MovieView = ({movie}) =>{
  return(
    <div>
        <div>
            <img src={movie.ImagePath} alt="" />
        </div>
        <div>
            <h1>{movie.Title}</h1>
        </div>
        <div>
            <h2>{movie.Director}</h2>
        </div>
        <div>
            <p>{movie.Description}</p>
        </div>
    </div>
  )
}
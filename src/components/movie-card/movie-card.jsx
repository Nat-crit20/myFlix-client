
export const MovieCard = ({movie})=>{
    return(
        <div onClick={handleClick(movie)}>
            <h1>{movie.Title}</h1>
        </div>
       )
}
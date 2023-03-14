
export const MovieCard = ({movie, handleClick})=>{
    return(
        <div onClick={()=>handleClick(movie)}>
            <h1>{movie.Title}</h1>
        </div>
       )
}
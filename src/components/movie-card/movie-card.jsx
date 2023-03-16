import PropTypes from "prop-types"


export const MovieCard = ({movie, handleClick})=>{
    return(
        <div onClick={()=>handleClick(movie)}>
            <h1>{movie.Title}</h1>
        </div>
       )
}

MovieCard.propTypes ={
    movie: PropTypes.shape({
        Title: PropTypes.string
    }).isRequired,
    handleClick: PropTypes.func.isRequired
}
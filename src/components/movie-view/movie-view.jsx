import { useState } from "react"

export const MovieView = () =>{
    const [movies, setMovies] = useState([
        {
            Title: "Silence of the Lambs",
            Description: "A young FBI cadet must receive the help of an incarcerated and manipulative cannibal killer to help catch another serial killer.",
            Genre: {
              Name: "Thriller",
              Description: "Thriller film, also known as suspense film or suspense thriller, is a broad film genre that involves excitement and suspense in the audience."
            },
            Director: {
              Name: "Jonathan Demme",
              Bio: "Robert Jonathan Demme was an American director, producer, and screenwriter.",
              Birth: "1944",
              Death: "2017"
            },
            ImagePath: "https://m.media-amazon.com/images/M/MV5BNjNhZTk0ZmEtNjJhMi00YzFlLWE1MmEtYzM1M2ZmMGMwMTU4XkEyXkFqcGdeQXVyNjU0OTQ0OTY@._V1_.jpg",
            Featured: true,
            id: 1
          },
          
          {
              Title:"Interstellar",
              Description: "A team of explorers travel through a wormhole in space in an attempt to ensure humanity's survival.",
              Genre:  {
              Name: "Science Fiction",
              Description: "Science fiction is a genre of speculative fiction, which typically deals with imaginative and futuristic concepts such as advanced science and technology, space exploration, time travel, parallel universes, and extraterrestrial life."
            },
              Director: {
              Name: "Christopher Nolan",
              Bio: "Over the course of 15 years of filmmaking, Nolan has gone from low-budget independent films to working on some of the biggest blockbusters ever made",
              Birth: "1970",
              Death: null
            },
              ImagePath: "https://m.media-amazon.com/images/M/MV5BZjdkOTU3MDktN2IxOS00OGEyLWFmMjktY2FiMmZkNWIyODZiXkEyXkFqcGdeQXVyMTMxODk2OTU@._V1_.jpg",
              Featured: false,
              id: 2
          }
    ])
    return (
        <div>
            {movies.map(movie=>{
                return <h1>{movie.Title}</h1>
            })}
        </div>
    )
}
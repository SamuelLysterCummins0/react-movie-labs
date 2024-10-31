import React, { useState } from "react";
import Header from "../headerMovieList";
import FilterCard from "../filterMoviesCard";
import MovieList from "../movieList";
import Grid from "@mui/material/Grid2";
import SortingComponent from "../sorting/sortingComponent";
import Box from "@mui/material/Box"; 
import Typography from "@mui/material/Typography"; 

function MovieListPageTemplate({ movies, title, action }) {
  const [nameFilter, setNameFilter] = useState("");
  const [genreFilter, setGenreFilter] = useState("0");
  const [releaseDate, setReleaseDate] = useState(null);
  const [sortBy, setSortBy] = useState("title");
  const genreId = Number(genreFilter);
  

  let displayedMovies = movies
    .filter((m) => {
      return m.title.toLowerCase().search(nameFilter.toLowerCase()) !== -1;
    })
    .filter((m) => {
      return genreId > 0 ? m.genre_ids.includes(genreId) : true;
    })
    .filter((m) => {
      if (releaseDate) {
        const releaseYear = new Date(m.release_date).getFullYear();
        return releaseYear === Number(releaseDate); 
      }
      return true;
    });

    displayedMovies.sort((a, b) => {
      if (sortBy === "title") {
        return a.title.localeCompare(b.title);
      } else if (sortBy === "release_date") {
        return new Date(b.release_date) - new Date(a.release_date);
      } else if (sortBy === "vote_average") { 
        return Number(b.vote_average) - Number(a.vote_average);
      }
      return 0; 
    });
    
    
    

  const handleChange = (type, value) => {
    if (type === "name") setNameFilter(value);
    else if (type === "genre") setGenreFilter(value);
    else if (type === "releaseDate") setReleaseDate(value);
  };

  const handleSortChange = (value) => {
    setSortBy(value); 
  };

  return (
    <Grid container>
      <Grid size={18}>
        <Header title={title} />
      </Grid>
      <Grid container sx={{flex: "1 1 500px"}}>
        <Grid 
          key="find" 
          size={{xs: 12, sm: 6, md: 4, lg: 3, xl: 2}} 
          sx={{padding: "20px"}}
        >
          <FilterCard
            onUserInput={handleChange}
            titleFilter={nameFilter}
            genreFilter={genreFilter}
            releaseDate={releaseDate}
          />
          <SortingComponent sortBy={sortBy} setSortBy={handleSortChange} />
        </Grid>
        <MovieList action={action} movies={displayedMovies}></MovieList>
      </Grid>
    </Grid>
  );
}
export default MovieListPageTemplate;
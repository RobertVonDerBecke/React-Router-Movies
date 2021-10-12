import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link, Route, Switch } from 'react-router-dom';

import SavedList from './Movies/SavedList';
import MovieList from './Movies/MovieList';
import Movie from './Movies/Movie';

export default function App (props) {
  const [saved, setSaved] = useState([]); // Stretch: the ids of "saved" movies
  const [movieList, setMovieList] = useState([]);
  
  useEffect(() => {
    const getMovies = () => {
      axios
        .get('http://localhost:5000/api/movies') // Study this endpoint with Postman
        .then(res => {
          setMovieList(res.data)
          // Study this response with a breakpoint or log statements
          // and set the response data as the 'movieList' slice of state
        })
        .catch(error => {
          console.error('Server Error', error);
        });
    }
    getMovies();
  }, []);

  const addToSavedList = id => {
    setSaved([...saved, id])
    
  };

  return (
    <div>
      <SavedList list={saved}  />

      <div>
        <Switch>
          <Route path='/movies/:id'>
            <Movie movies={movieList} addToSavedList={addToSavedList}/>
          </Route>
          <Route path='/'>
            <MovieList movies={movieList} />
          </Route>
        </Switch>
      </div>
    </div>
  );
}

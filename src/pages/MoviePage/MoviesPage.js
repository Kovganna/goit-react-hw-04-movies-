import { useEffect, useState } from 'react';
import { Switch, Route, useRouteMatch } from 'react-router';
import { lazy, Suspense } from 'react';
// import 'react-toastify/dist/ReactToastify.css';
import Loader from 'react-loader-spinner';

import movieAPI from '../../services/serviceAPI';
import Searchbar from '../../components/Searchbar/Searchbar';
import MovieGallery from '../../components/MovieGallery/MovieGallery';

const MovieDetailsPage = lazy(() =>
  import(
    '../MovieDetailsPage/MovieDetailsPage.js' /* webpackChunkName: "movieDetails-page" */
  ),
);

export default function MoviePages() {
  const [searchQuery, setSearchQuery] = useState('');
  const [movies, setMovies] = useState([]);

  const { path } = useRouteMatch();

  useEffect(() => {
    if (searchQuery === '') {
      return;
    }
    movieAPI
      .getSearchMovie(searchQuery)
      .then(movies => {
        setMovies(prev => [...prev, ...movies]);
      })
      .catch(error => {
        console.log(error.message);
      });
  }, [searchQuery]);

  const handleSubmit = searchQuery => {
    setSearchQuery(searchQuery);
    setMovies([]);
  };

  return (
    <>
      <Suspense fallback={<Loader />}>
        <Switch>
          <Route path={`${path}/:movieId`}>
            <MovieDetailsPage />
          </Route>
          <Route exact path="/movies">
            <Searchbar onSubmit={handleSubmit} />
            {movies.length !== 0 && <MovieGallery movies={movies} />}
          </Route>
        </Switch>
      </Suspense>
    </>
  );
}

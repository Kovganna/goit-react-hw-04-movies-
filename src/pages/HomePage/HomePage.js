import { useState, useEffect } from 'react';
import { Route, Switch } from 'react-router';
import { lazy, Suspense } from 'react';
import MovieGallery from '../../components/MovieGallery/MovieGallery';
import movieAPI from '../../services/serviceAPI';

import PageHeading from '../../components/PageHeading/PageHeading';
import Loader from 'react-loader-spinner';

const MovieDetailsPage = lazy(() =>
  import(
    '../MovieDetailsPage/MovieDetailsPage' /* webpackChunkName: "movie details-page" */
  ),
);

export default function HomePage() {
  const [movies, setMovies] = useState([]);

  useEffect(() => {
    movieAPI.getTrendingMovies().then(movies => {
      setMovies(movies);
    });
  }, []);

  return (
    <>
      <PageHeading text="Trending movies today" />
      <Suspense fallback={<Loader />}>
        <Switch>
          <Route path="/movies/:movieId" component={MovieDetailsPage} />
          <Route
            exact
            path="/"
            render={() => <MovieGallery movies={movies} />}
          />
        </Switch>
      </Suspense>
    </>
  );
}

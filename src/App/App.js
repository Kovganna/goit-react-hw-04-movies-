import './App.css';
import { Route, Switch } from 'react-router-dom';
import { lazy, Suspense } from 'react';
import AppBar from '../components/AppBar/AppBar';
import Container from '../components/Container/Container';
import Loader from 'react-loader-spinner';

const HomePage = lazy(() =>
  import('../pages/HomePage/HomePage.js' /* webpackChunkName: "home-page" */),
);
const MoviePages = lazy(() =>
  import(
    '../pages/MoviePage/MoviesPage.js' /* webpackChunkName: "movie-pages" */
  ),
);
const MovieDetailsPage = lazy(() =>
  import(
    '../pages/MovieDetailsPage/MovieDetailsPage.js' /* webpackChunkName: "movie details-page" */
  ),
);
const NoFoundPage = lazy(() =>
  import(
    '../pages/NoFoundPage/NoFoundPage.js' /* webpackChunkName: "noFound-page" */
  ),
);

export default function App() {
  return (
    <Suspense fallback={<Loader />}>
      <Container>
        <AppBar />
        <Switch>
          <Route path="/" exact>
            <HomePage />
          </Route>

          <Route path="/movies">
            <MoviePages />
          </Route>
          <Route path="/movies/:movieId" component={MovieDetailsPage} />
          <Route>
            <NoFoundPage />
          </Route>
        </Switch>
      </Container>
    </Suspense>
  );
}
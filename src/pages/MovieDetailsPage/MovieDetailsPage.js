import { useState, useEffect } from 'react';
import MovieAPI from '../../services/serviceAPI';
import {
  NavLink,
  Route,
  useHistory,
  useParams,
  useRouteMatch,
  useLocation,
} from 'react-router-dom';
import AboutMovie from '../../components/AboutMovie/AboutMovie';
import NotFound from '../../components/NotFound/NotFound';
import Cast from '../../components/Cast/Cast';
import Reviews from '../../components/Reviews/Reviews';
import s from './MovieDetailsPage.module.css';

const MovieDetailsPage = () => {
  const { movieId } = useParams();
  const { url, path } = useRouteMatch();
  const history = useHistory();
  const location = useLocation();

  const [searchQuery, setSearchQuery] = useState('');
  const [showCast, setShowCast] = useState(false);
  const [showReviews, setShowReviews] = useState(false);

  useEffect(() => {
    MovieAPI.getIdMovies(movieId)
      .then(setSearchQuery)
      .catch(error => {
        console.log(error.message);
      });
  }, [movieId]);

  const visibleCast = () => {
    if (showCast === true) {
      setShowCast(false);
    }
    setShowCast(true);
  };

  const visibleReviews = () => {
    if (showReviews === true) {
      setShowReviews(false);
    }
    setShowReviews(true);
  };

  const btnBack = () => {
    history.push(location?.state?.from ?? '/');
  };

  return (
    <>
      <button type="submit" onClick={btnBack} className={s.goBackBtn}>
        <span>Go back</span>
      </button>
      {searchQuery ? (
        <>
          <AboutMovie movie={searchQuery} />

          <ul>
            <li>
              <NavLink
                className="link"
                activeClassName="activeLink"
                to={{
                  pathname: `${url}/cast`,
                  state: { from: location?.state?.from ?? '/movie' },
                }}
                onClick={visibleCast}
              >
                Cast
              </NavLink>
            </li>
            <li>
              <NavLink
                className="link"
                activeClassName="activeLink"
                to={{
                  pathname: `${url}/reviews`,
                  state: { from: location?.state?.from ?? '/movie' },
                }}
                onClick={visibleReviews}
              >
                Reviews
              </NavLink>
            </li>
          </ul>
          <Route path={`${path}/cast`}>
            {searchQuery && showCast && <Cast />}
          </Route>
          <Route path={`${path}/reviews`}>
            {searchQuery && showReviews && <Reviews />}
          </Route>
        </>
      ) : (
        <NotFound />
      )}
    </>
  );
};

export default MovieDetailsPage;

import { Link, useLocation } from 'react-router-dom';
import PropTypes from 'prop-types';

const MovieGallery = ({ movies = [] }) => {
  const location = useLocation();

  return (
    <ul>
      {movies.map(movie => (
        <li className="listItem" key={movie.id}>
          <Link
            key={movie.id}
            to={{
              pathname: `/movies/${movie.id}`,
              state: {
                from: location,
              },
            }}
          >
            {movie.title || movie.name}
          </Link>
        </li>
      ))}
    </ul>
  );
};

MovieGallery.propTypes = {
  movies: PropTypes.arrayOf(PropTypes.shape),
};
export default MovieGallery;

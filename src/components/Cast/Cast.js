import PropTypes from 'prop-types';
import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import MovieAPI from '../../services/serviceAPI';
import onScroll from '../../helpers/Scroll';
import { castBaseUrl } from '../../services/serviceAPI';

const Cast = () => {
  const { movieId } = useParams();
  const [cast, setCast] = useState([]);

  useEffect(() => {
    MovieAPI.getCastsMovies(movieId)
      .then(res => {
        setCast(res);
        onScroll();
      })
      .catch(error => {
        console.log(error.message);
      });
  }, [movieId]);

  return (
    <div>
      {cast && cast.length > 0 ? (
        <ul>
          {cast.map(({ id, original_name, profile_path }) => (
            <li key={id}>
              <img
                src={
                  profile_path
                    ? `${castBaseUrl}${profile_path}`
                    : `No information :(`
                }
                alt={original_name}
              />

              <p>{original_name}</p>
              {/* <p>Character: {character}</p> */}
            </li>
          ))}
        </ul>
      ) : (
        <p>We have no information about the cast.</p>
      )}
    </div>
  );
};

Cast.propTypes = {
  movieId: PropTypes.string,
};

export default Cast;

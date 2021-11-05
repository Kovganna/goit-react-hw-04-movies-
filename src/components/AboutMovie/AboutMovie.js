import PropTypes from 'prop-types';
import { profileBaseUrl } from '../../services/serviceAPI';
import s from './AboutMovie.module.css';
export default function AboutMovie({ movie }) {
  return (
    <>
      <img
        src={
          movie.poster_path
            ? `${profileBaseUrl}${movie.poster_path}`
            : `NO POSTER`
        }
        alt={movie.title}
        className={s.poster}
      />
      <h3 className="title">{movie.original_title || movie.name}</h3>

      <span>User Score: {movie.vote_average * 10}%</span>
      <h2>Overview</h2>
      <span>{movie.overview}</span>
      <h3>Genres</h3>
      {<span>{movie.genres.map(genre => genre.name).join(' ')}</span>}
      <hr />
      <p>Additional information</p>
    </>
  );
}

AboutMovie.propTypes = {
  movie: PropTypes.object,
};

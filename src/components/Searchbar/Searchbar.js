import { useState } from 'react';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import PropTypes from 'prop-types';
import { useHistory, useLocation } from 'react-router-dom';

export default function Searchbar({ onSubmit }) {
  const [searchQuery, setSearchQuery] = useState('');

  const history = useHistory();
  const location = useLocation();

  const handleChange = e => {
    setSearchQuery(e.target.value.toLowerCase());
  };

  const handleSubmit = e => {
    e.preventDefault();

    if (searchQuery.trim() === '') {
      toast.error('Search movies', {
        position: 'top-center',
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
      return;
    }
    history.push({ ...location, search: `query=${searchQuery}` });

    onSubmit(searchQuery);
    setSearchQuery('');
  };
  return (
    <>
      <form className="SearchForm" onSubmit={handleSubmit}>
        <button type="submit" className="SearchForm__button">
          <span className="SearchForm__buttonLabel">Search</span>
        </button>
        <label>
          <input
            className="SearchForm__input"
            name="searchQuery"
            type="text"
            autoComplete="off"
            value={searchQuery}
            onChange={handleChange}
            autoFocus
            placeholder="Search movie"
          />
        </label>
      </form>
      <ToastContainer
        autoClose={3000}
        position="top-center"
        hideProgressBar
        newestOnTop={true}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
      />
    </>
  );
}
Searchbar.propTypes = {
  onSubmit: PropTypes.func.isRequired,
};

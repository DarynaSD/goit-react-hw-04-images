import css from './Searchbar.module.css';

import React, { useState } from 'react';

const Searchbar = ({ submit }) => {
  const [value, setValue] = useState('');

  const handleChange = ({ target: { value } }) => {
    setValue(value);
  };

  const handleSubmit = e => {
    e.preventDefault();
    submit(value);
  };

  return (
    <div className={css.Searchbar}>
      <form onSubmit={handleSubmit} className={css.SearchForm}>
        <div className={css.inputWrapper}>
          <label
            htmlFor="findImages"
            className={css.SearchFormButtonLabel}
          ></label>
          <input
            className={css.SearchFormInput}
            name="title"
            type="text"
            onChange={handleChange}
            id="findImages"
            value={value}
            placeholder="Search images..."
          />

          <button type="submit" className={css.SearchFormButton}>
            <span className={css.SearchFormButtonLabel}></span>
          </button>
        </div>
      </form>
    </div>
  );
};

export default Searchbar;
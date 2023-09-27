import { Component } from 'react';

import css from './Searchbar.module.css';

class Searchbar extends Component {
  state = { value: '' };

  handleChange = ({ target: { value } }) => {
    this.setState({ value });
  };

  handleSubmit = e => {
    e.preventDefault();
    this.props.submit(this.state.value);
  };

  render() {
    return (
      <div className={css.Searchbar}>
        <form onSubmit={this.handleSubmit} className={css.SearchForm}>
          <div className={css.inputWrapper}>
            <label
              htmlFor="findImages"
              //className={css.SearchFormButtonLabel}
            ></label>
            <input
              className={css.SearchFormInput}
              name="title"
              type="text"
              onChange={this.handleChange}
              id="findImages"
              value={this.state.value}
              placeholder="Search images..."
            />

            <button type="submit" className={css.SearchFormButton}>
              {/* <img
                className={css.SearchFormButtonLabel}
                src="/goit-react-hw-03-image-finder/icon/search-icon.svg"
                alt="icon"
              /> */}
              <span className={css.SearchFormButtonLabel}></span>
            </button>
          </div>
        </form>
      </div>
    );
  }
}

export default Searchbar;

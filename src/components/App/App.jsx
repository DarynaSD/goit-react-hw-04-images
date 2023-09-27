import { Component } from 'react';

import css from './App.module.css'

import { findImagesByQuery } from '../helper';
import Searchbar from '../Searchbar/Searchbar';
import {ImageGallery} from '../ImageGallery/ImageGallery';
import { LoadMoreButton } from '../Button/Button';
import Modal from '../Modal/Modal';
import Loader from 'components/Loader/Loader';

class App extends Component {
  state = {
    page: 1,
    images: null,
    searchQuery: '',
    isLoading: false,
    error: '',
    isModalOpen: false,
    largeImageURL: '',
  };

  componentDidUpdate(prevProps, prevState) {
    if (
      this.state.page !== prevState.page ||
      this.state.searchQuery !== prevState.searchQuery
    ) {
      this.fetchPhotos(prevState);
    }
  }

  fetchPhotos = async prevState => {
    try {
      this.setState({ isLoading: true });

      const data = await findImagesByQuery(
        this.state.searchQuery,
        this.state.page
      );

      this.state.page === 1
        ? this.setState({ images: data.hits })
        : this.setState({ images: [...prevState.images, ...data.hits] });

      //console.log(data);
      // console.log(prevState.images)
      // console.log(this.state.images)
    } catch (error) {
      this.setState({ isLoading: true });
      this.setState({ error: error.response.data });
    } finally {
      this.setState({ isLoading: false });
    }
  };

  handleSearchQuery = value => {
    this.setState({ searchQuery: value, page: 1 });
  };

  HandleLoadMoreClick = () => {
    let newPage = this.state.page + 1;
    this.setState({ page: newPage });
  };

  toggleModal = () => {
    this.setState((prev) => ({ isModalOpen: !prev.isModalOpen }))
  }

  handleImgClick = (id) => {
    const targetEl = this.state.images.find((one) => one.id === id)
    
    this.setState({ largeImageURL: targetEl.largeImageURL })
    //console.log(targetEl)
    this.toggleModal()
    //console.log(this.state)
  }

  render() {
    const { error, isLoading, images, largeImageURL, isModalOpen } = this.state;
    return (
      <div className={css.App}>
        {error && <h1>{error}</h1>}

        <Searchbar submit={this.handleSearchQuery} />

        {images &&
          (!images.length ? (
            <h1>No data found</h1>
          ) : (
            <ImageGallery
              images={images}
              handleImgClick={this.handleImgClick}
              toggleModal={this.toggleModal}
            />
          ))}

        {images &&
          (!images.length ? null : images.length % 12 ? (
            <h1>End of results</h1>
          ) : (
            <LoadMoreButton HandleLoadMoreClick={this.HandleLoadMoreClick} />
          ))}

        {isLoading && <Loader />}

        {isModalOpen && (
          <Modal toggleModal={this.toggleModal} largeImageURL={largeImageURL} />
        )}
      </div>
    );
  }
}

export default App;

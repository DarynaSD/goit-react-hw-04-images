import React, { useCallback, useEffect, useState } from 'react';

import css from './App.module.css';

import { findImagesByQuery } from '../../services/fetch';
import Searchbar from '../Searchbar/Searchbar';
import { ImageGallery } from '../ImageGallery/ImageGallery';
import { LoadMoreButton } from '../Button/Button';
import Modal from '../Modal/Modal';
import Loader from 'components/Loader/Loader';

const App = () => {
  const [page, setPage] = useState(1);
  const [images, setImages] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [largeImageURL, setLargeImageURL] = useState('');

  //fetch
  const fetchPhotos = useCallback(async () => {
    try {
      setIsLoading(true);
      const data = await findImagesByQuery(searchQuery, page);
      page === 1 ?
        setImages(data.hits)
        : setImages((prev) => [...prev, ...data.hits]);
    } catch (error) {
      setError(error.message);
      console.log(error.message, error.responce);
    } finally {
      setIsLoading(false);
    }
  }, [searchQuery, page]);


  useEffect(() => {
    searchQuery && fetchPhotos();
  }, [fetchPhotos, searchQuery]);


  //////
  const handleSearchQuery = value => {
    setSearchQuery(value);
    setPage(1);
  };

  const HandleLoadMoreClick = () => {
    setPage(page + 1);
  };

  const toggleModal = () => {
    setIsModalOpen(!isModalOpen);
  };

  const handleImgClick = id => {
    const targetEl = images.find(one => one.id === id);
    setLargeImageURL(targetEl.largeImageURL);
    toggleModal();
  };

  //render
  return (
    <div className={css.App}>
      {error && <h1>{error}</h1>}

      <Searchbar submit={handleSearchQuery} />

      {images &&
        (!images.length ? (
          <h1>No data found</h1>
        ) : (
          <ImageGallery
            images={images}
            handleImgClick={handleImgClick}
            toggleModal={toggleModal}
          />
        ))}

      {images &&
        (!images.length ? null : images.length % 12 ? (
          <h1>End of results</h1>
        ) : (
          <LoadMoreButton HandleLoadMoreClick={HandleLoadMoreClick} />
        ))}

      {isLoading && <Loader />}

      {isModalOpen && (
        <Modal toggleModal={toggleModal} largeImageURL={largeImageURL} />
      )}
    </div>
  );
};

export default App;
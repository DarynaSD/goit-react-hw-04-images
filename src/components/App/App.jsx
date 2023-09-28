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
      page === 1 ? setImages(data.hits) : setImages([...images, ...data.hits]);
    } catch (error) {
      setIsLoading(true);
      setError(error.response.data);
    } finally {
      setIsLoading(false);
    }
  }, [images, page, searchQuery]);

    useEffect(() => {
      searchQuery && fetchPhotos();
    }, [searchQuery, fetchPhotos]);

  //////
  const  handleSearchQuery = value => {
    setSearchQuery(value);
    setPage(1);
    };

   const HandleLoadMoreClick = () => {
     setPage(page + 1);
    };

   const toggleModal = () => {
     setIsModalOpen(!isModalOpen);
    }

   const handleImgClick = (id) => {
      const targetEl = images.find((one) => one.id === id)
      setLargeImageURL(targetEl.largeImageURL);
      toggleModal()
    }

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

// class App extends Component {
//   state = {
//     page: 1,
//     images: null,
//     searchQuery: '',
//     isLoading: false,
//     error: '',
//     isModalOpen: false,
//     largeImageURL: '',
//   };

//   componentDidUpdate(prevProps, prevState) {
//     if (
//       this.state.page !== prevState.page ||
//       this.state.searchQuery !== prevState.searchQuery
//     ) {
//       this.fetchPhotos(prevState);
//     }
//   }

//   fetchPhotos = async prevState => {
//     try {
//       this.setState({ isLoading: true });

//       const data = await findImagesByQuery(
//         this.state.searchQuery,
//         this.state.page
//       );

//       this.state.page === 1
//         ? this.setState({ images: data.hits })
//         : this.setState({ images: [...prevState.images, ...data.hits] });

//       //console.log(data);
//       // console.log(prevState.images)
//       // console.log(this.state.images)
//     } catch (error) {
//       this.setState({ isLoading: true });
//       this.setState({ error: error.response.data });
//     } finally {
//       this.setState({ isLoading: false });
//     }
//   };

//   handleSearchQuery = value => {
//     this.setState({ searchQuery: value, page: 1 });
//   };

//   HandleLoadMoreClick = () => {
//     //let newPage = this.state.page + 1;
//     this.setState(prev => ({ page: prev.page + 1 }));
//   };

//   toggleModal = () => {
//     this.setState((prev) => ({ isModalOpen: !prev.isModalOpen }))
//   }

//   handleImgClick = (id) => {
//     const targetEl = this.state.images.find((one) => one.id === id)

//     this.setState({ largeImageURL: targetEl.largeImageURL })
//     //console.log(targetEl)
//     this.toggleModal()
//     //console.log(this.state)
//   }

//   render() {
//     const { error, isLoading, images, largeImageURL, isModalOpen } = this.state;
//     return (
//       <div className={css.App}>
//         {error && <h1>{error}</h1>}

//         <Searchbar submit={this.handleSearchQuery} />

//         {images &&
//           (!images.length ? (
//             <h1>No data found</h1>
//           ) : (
//             <ImageGallery
//               images={images}
//               handleImgClick={this.handleImgClick}
//               toggleModal={this.toggleModal}
//             />
//           ))}

//         {images &&
//           (!images.length ? null : images.length % 12 ? (
//             <h1>End of results</h1>
//           ) : (
//             <LoadMoreButton HandleLoadMoreClick={this.HandleLoadMoreClick} />
//           ))}

//         {isLoading && <Loader />}

//         {isModalOpen && (
//           <Modal toggleModal={this.toggleModal} largeImageURL={largeImageURL} />
//         )}
//       </div>
//     );
//   }
// }

// export default App;

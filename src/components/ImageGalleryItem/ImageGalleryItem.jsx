import css from './ImageGalleryItem.module.css';

export const ImageGalleryItem = ({ webformatURL, tags, id, handleImgClick }) => {
  //console.log(id)
  return (
    <li className={css.ImageGalleryItem}>
      <img
        src={webformatURL}
        alt={tags}
        id={id}
        className={css.ImageGalleryItemImage}
        onClick={() => handleImgClick(id)}
      />
    </li>
  );
};

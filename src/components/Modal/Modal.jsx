import css from './Modal.module.css';

import React, { useEffect } from 'react';

const Modal = ({ toggleModal, largeImageURL }) => {

  useEffect(() => {
    const handleKeyEsc = e => {
      if (e.code === 'Escape') toggleModal();
      //console.log('Esc');
    };

    document.addEventListener('keydown', handleKeyEsc);

    return function cleanup() {
      document.removeEventListener('keydown', handleKeyEsc);
      //console.log('cleanup');
    };
  }, [toggleModal]);

  return (
    <div className={css.Overlay} onClick={toggleModal}>
      <div className={css.Modal}>
        <img src={largeImageURL} alt={largeImageURL} />
      </div>
    </div>
  );
};

export default Modal;

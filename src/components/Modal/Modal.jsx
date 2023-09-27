import { Component } from 'react';

import css from './Modal.module.css';

class Modal extends Component {
  componentDidMount() {
    document.addEventListener('keydown', this.handleKeyEsc);
  }

  componentWillUnmount() {
    document.removeEventListener('keydown', this.handleKeyEsc);
  }

  handleKeyEsc = e => {
    if (e.code === 'Escape') this.props.toggleModal();
    //console.log('Esc');
  };

  render() {
    const { toggleModal, largeImageURL } = this.props;
    return (
      <div className={css.Overlay} onClick={toggleModal}>
        <div className={css.Modal}>
          <img src={largeImageURL} alt={largeImageURL} />
        </div>
      </div>
    );
  }
}

export default Modal;

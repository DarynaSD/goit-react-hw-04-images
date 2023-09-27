import React from 'react'
import { BarLoader } from 'react-spinners';
import css from './Loader.module.css'

const Loader = () => {
  return (
    <div className={css.LoaderWrapper}>
      <BarLoader color="#ffa354" className={css.Loader} />
    </div>
  );
}

export default Loader

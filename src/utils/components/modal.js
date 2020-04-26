import React from 'react';
import cx from 'classnames';

const Modal = ({title, children, isActive, onClose}) => {
  return <div className={cx('modal', {'is-active': isActive})}>
    <div className='modal-background'></div>
    <div className='modal-card'>
      <header className='modal-card-head'>
        <p className='modal-card-title'>{title}</p>
        <button className='delete' aria-label='close' onClick={onClose}></button>
      </header>
      {children}
    </div>
  </div>
};
export default Modal;

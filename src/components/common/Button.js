import React from 'react';
import Spinner from './Spinner';

import './button.css';

export default function Button({
  variant = 'primary',
  className = '',
  onClick,
  loading = false,
  disabled = false,
  type,
  children
}) {
  return (
    <button
      className={'button btn btn-' + variant + ' ' + className}
      onClick={onClick}
      disabled={disabled || loading}
      type={type}
    >
      {children}

      {
        loading ?
          <Spinner className='button-spinner' variant='light' />
          :
          <></>
      }
    </button>
  )
}
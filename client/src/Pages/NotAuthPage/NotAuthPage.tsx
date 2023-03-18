import React from 'react';
import './style.css';

export default function NotAuth(): JSX.Element {
  return (
    <div
      className='notAuthorized'
    >
      <div>Пожалуйста, авторизуйтесь</div>
    </div>
  );
}

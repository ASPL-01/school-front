import React from 'react';
import './Box.css';

export default (props) => {
  return (
    <div className="box">
      <div onClick={props.click} data-id={props.id} className={props.css}>{props.text}</div>
    </div>
  );
};

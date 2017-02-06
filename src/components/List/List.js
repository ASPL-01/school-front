import React from 'react';
import Box from '../Box/Box';

export default (props) => {
  const items = props.items || [];
  return (
    <div className="list">
      <h1>{props.header}</h1>
      {
        items.map((item, index) => <Box key={index} id={item.id} css={item.css} text={item.text} click={props.click}  />)
      }
    </div>
  );
}

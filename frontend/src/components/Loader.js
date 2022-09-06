import { useState, CSSProperties } from 'react';
import ClipLoader from 'react-spinners/ClipLoader';

const override: CSSProperties = {
  display: 'block',
  margin: 'auto',
  border: '3px solid transparent',
};

const Loader = () => {
  return (
    <ClipLoader
      color={'#070707'}
      loading={true}
      cssOverride={override}
      size={40}
    />
  );
};

export default Loader;

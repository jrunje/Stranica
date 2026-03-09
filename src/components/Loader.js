import React from 'react';
import { Spinner } from 'react-bootstrap';

const Loader = () => {
  return (
    <div className="d-flex justify-content-center align-items-center" style={{ minHeight: '400px' }}>
      <div className="text-center">
        <Spinner animation="border" variant="warning" role="status">
          <span className="visually-hidden">Učitavanje...</span>
        </Spinner>
        <p className="mt-2 text-white letter-spacing-1">Učitavanje ponude...</p>
      </div>
    </div>
  );
};

export default Loader;
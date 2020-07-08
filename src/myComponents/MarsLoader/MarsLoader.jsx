import React, { useState } from 'react';
import './MarsLoaderStyles.css';

const MarsLoader = () => {
  const [speed, setSpeed] = useState(3);

  return (
    <img
      className="rotate"
      src="https://www.marswiese.at/wordpress/wp-content/uploads/Alien-Auge.png"
      alt="MarsLoader"
      height="120px"
    />
  );
};

export default MarsLoader;

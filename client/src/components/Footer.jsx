import React from 'react';

function Footer() {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <img
      src="https://static.thenounproject.com/png/1815936-200.png"
      style={{ cursor: 'pointer' }}
      onClick={scrollToTop}
    />
  );
}

export default Footer;
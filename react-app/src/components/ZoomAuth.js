// frontend/src/components/ZoomAuth.js
import React from 'react';

function ZoomAuth() {
  const handleOAuth = () => {
    window.location.href = 'http://localhost:8000/api/zoom/redirect/';
  };

  return (
    <button onClick={handleOAuth}>Connect to Zoom</button>
  );
}

export default ZoomAuth;

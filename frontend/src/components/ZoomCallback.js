import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

const ZoomCallback = () => {
  const location = useLocation();

  useEffect(() => {
    const searchParams = new URLSearchParams(location.search);
    const code = searchParams.get('code');
    console.log('--- code: ', code, ' ---');

    if (code) {
      // fetchTokens(code);
    }
  }, [location]);

  const fetchTokens = (code) => {
    fetch(`http://localhost:8000/api/zoom/callback/?code=${code}`)
      .then(response => response.json())
      .then(data => {
        console.log('OAuth Tokens:', data);
      })
      .catch(error => console.error('Failed to fetch tokens:', error));
  };

  return <div>Zoom Authentication in progress...</div>;
};

export default ZoomCallback;

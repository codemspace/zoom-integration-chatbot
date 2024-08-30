import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

const ZoomCallback = () => {
  const location = useLocation();

  useEffect(() => {
    const searchParams = new URLSearchParams(location.search);
    const code = searchParams.get('code');
    const error = searchParams.get('error');

    if (code) {
      fetchTokens(code);
    } else {
      console.error('Error during Zoom OAuth:', error);
    }
  }, [location]);

  const fetchTokens = (code) => {
    // Call your backend to exchange the code for tokens
    fetch(`http://localhost:8000/zoom/callback?code=${code}`)
      .then(response => response.json())
      .then(data => {
        console.log('OAuth Tokens:', data);
        // Handle storing the tokens or managing the session here
      })
      .catch(error => console.error('Failed to fetch tokens:', error));
  };

  return <div>Zoom Authentication in progress...</div>;
};

export default ZoomCallback;

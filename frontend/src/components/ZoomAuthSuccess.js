import React from 'react';
import { Link } from "react-router-dom";
import { useLocation } from 'react-router-dom';

function ZoomAuthSuccess() {
    const location = useLocation();

    React.useEffect(() => {
        const queryParams = new URLSearchParams(location.search);
        const accessToken = queryParams.get('access_token');
        if (accessToken) {
            console.log('Access Token:', accessToken);
            localStorage.setItem('accessToken', accessToken);
            // Optionally save the token in state, context, or perform further actions
        }
    }, [location]);

    return (
        <div className="py-5">
            <h2 className="text-center text-2xl font-bold py-5">
                Zoom authentication successful. Check console for the access token.
            </h2>
            <div className="flex justify-center">
                <Link
                    className="inline-flex items-center px-4 py-2 bg-blue-600 text-white text-lg leading-6 font-semibold rounded-full hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50"
                    to="/zoom-meetings"
                >
                    Zoom Meetings
                </Link>
            </div>
        </div>
    );
}

export default ZoomAuthSuccess;

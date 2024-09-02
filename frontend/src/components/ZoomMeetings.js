import React, {useState, useEffect} from 'react';
import { ZoomMtg } from '@zoom/meetingsdk';
import { Link } from "react-router-dom";

function ZoomMeetings({ meeting }) {
    const [meetings, setMeetings] = useState([])

    const getMeetings = async () => {
        try {
            console.log('--- token: ', localStorage.getItem('accessToken'), ' ---');
            const response = await fetch('http://localhost:8000/api/zoom/meetings/', {
                method: 'get',
                headers: {
                    'Authorization': `Bearer ${localStorage.getItem('accessToken')}`
                },
            });
            const data = await response.json();
            console.log(data);
            if (data.code === 124) getToken();
            else setMeetings(data.meetings)
        } catch (e) {
          console.log(e);
          getToken();
        }
    }

    const getToken = () => {
        window.location.href = 'http://localhost:8000/api/zoom/redirect/';
    }

    useEffect(() => {
        getMeetings();
    }, [])

    const formatDate = (dateString) => {
        const date = new Date(dateString);
        return date.toLocaleString('en-US', {
            month: 'short',
            day: 'numeric',
            year: 'numeric',
            hour: '2-digit',
            minute: '2-digit',
            hour12: true,
        });
    };

    const handleJoinMeeting = async (meeting) => {
        try {
          ZoomMtg.preLoadWasm();
          ZoomMtg.prepareWebSDK();
          
          // Replace with your Zoom user information
          const userName = 'Your Name';
          const userEmail = 'example@gmail.com';
          
          const signature = generateSignature(meeting.id, process.env.REACT_APP_ZOOM_ROLE);
          const password = extractPwdFromZoomLink(meeting.join_url)
          ZoomMtg.init({
            leaveUrl: 'http://localhost:3000/zoom-meetings', // Replace with your leave URL
            success: () => {
              ZoomMtg.join({
                signature: signature,
                sdkKey: process.env.REACT_APP_ZOOM_CLIENT_ID,
                meetingNumber: meeting.id,
                passWord: password,
                userName: userName,
                userEmail: userEmail,
                success: (result) => {
                  console.log('Join meeting success:', result);
                },
                error: (error) => {
                  console.log('Join meeting error:', error);
                },
              });
            },
            error: (error) => {
              console.log('ZoomMtg.init error:', error);
            },
          });
        } catch (error) {
          console.log('handleJoinMeeting error:', error);
        }
      };

      

    const extractPwdFromZoomLink = (link) => {
        const url = new URL(link);
        const params = new URLSearchParams(url.search);
        return params.get('pwd');
    }
    
      const generateSignature = (meetingId, role) => {
        const client_id = process.env.REACT_APP_ZOOM_CLIENT_ID;
        const client_secret = process.env.REACT_APP_ZOOM_CLIENT_SECRET;
        const ts = Math.round(new Date().getTime() / 1000) - 300;
        const expire = ts + 3600;
        const signature = ZoomMtg.generateSDKSignature({
          meetingNumber: meetingId,
          role: role, // 1 for host, 0 for attendee
          sdkKey: client_id,
          sdkSecret: client_secret,
          success: (result) => result.signature,
          error: (error) => {
            console.log('generateSDKSignature error:', error);
          },
        });
    
        return signature;
      };

    return (
        <div className="p-4 space-y-4">
            <div className='py-3'>
            <Link
                className="middle none center mr-4 rounded-full bg-blue-600 py-2 px-6 font-sans text-xl font-bold uppercase text-white shadow-md shadow-blue-500/20 transition-all hover:shadow-lg hover:shadow-blue-500/40 focus:opacity-[0.85] focus:shadow-none active:opacity-[0.85] active:shadow-none disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none"
                to="/create-meeting"
            >New Meeting</Link> 
            </div>
            {meetings.map(meeting => (
                <div key={meeting.id} className="bg-white p-4 rounded-lg shadow-md flex items-center justify-between hover:bg-gray-50 transition duration-300">
                    <div className="flex-1">
                        <h2 className="text-xl font-semibold text-gray-800 mb-2">{meeting.topic}</h2>
                        <p className="text-gray-600 mb-1">ID: <span className="font-medium text-gray-900">{meeting.id}</span></p>
                        <p className="text-gray-600">Start time: <span className="font-medium text-gray-900">{formatDate(meeting.start_time)}</span></p>
                    </div>
                    <button
                        onClick={() => handleJoinMeeting(meeting)}
                        className="ml-4 px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50"
                    >
                        JOIN
                    </button>
                </div>
            ))}
        </div>
    );
}

export default ZoomMeetings;

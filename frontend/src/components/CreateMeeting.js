import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from "react-router-dom";

function CreateMeeting() {
    const navigate = useNavigate();
    const [meetingData, setMeetingData] = useState({
        topic: "",
        start_time: "",
        duration: 30,
        agenda: ""
    });

    const handleChange = (e) => {
        setMeetingData({ ...meetingData, [e.target.name]: e.target.value });
    };

    const handleCreate = async () => {
        console.log('--- token: ', localStorage.getItem('accessToken'), ' ---');
        const response = await fetch('http://localhost:8000/api/zoom/meetings/create/', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${localStorage.getItem('accessToken')}`
            },
            body: JSON.stringify(meetingData)
        });
        const data = await response.json();
        console.log(data);
        if (data.status === "waiting") navigate("/zoom-meetings")
    };

    const handleReturn = () => {
        navigate("/zoom-meetings")
    }

    return (
        <div className='flex flex-col items-center justify-center'>
            <div className="w-96 p-4 space-y-4">
                <h2 className='text-center text-xl'>Create Zoom Meeting</h2>
                <input 
                    name="topic" 
                    value={meetingData.topic} 
                    onChange={handleChange} 
                    placeholder="Meeting Topic" 
                    className="w-full p-2 border border-gray-300 rounded-md shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50" 
                />
                <input 
                    name="start_time" 
                    value={meetingData.start_time} 
                    onChange={handleChange} 
                    type="datetime-local" 
                    className="w-full p-2 border border-gray-300 rounded-md shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50" 
                />
                <input 
                    name="duration" 
                    value={meetingData.duration} 
                    onChange={handleChange} 
                    placeholder="Duration (in minutes)" 
                    className="w-full p-2 border border-gray-300 rounded-md shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50" 
                />
                <input 
                    name="agenda" 
                    value={meetingData.agenda} 
                    onChange={handleChange} 
                    placeholder="Meeting Agenda" 
                    className="w-full p-2 border border-gray-300 rounded-md shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50" 
                />
                <div className="flex justify-between">
                    <button 
                        onClick={handleReturn} // Ensure you define a function to handle the return or navigation
                        className="px-4 py-2 bg-gray-300 text-black rounded-md shadow hover:bg-gray-400 focus:outline-none focus:ring-2 focus:ring-gray-300 focus:ring-opacity-50"
                    >
                        Return
                    </button>
                    <button 
                        onClick={handleCreate} 
                        className="px-4 py-2 bg-blue-500 text-white rounded-md shadow hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50"
                    >
                        Create Meeting
                    </button>
                </div>
            </div>
        </div>
    );
}

export default CreateMeeting;

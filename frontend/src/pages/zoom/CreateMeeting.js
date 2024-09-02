import React, { useState, useContext } from 'react';

function CreateMeeting() {
  const [meetingTopic, setMeetingTopic] = useState('');
  
  const access_token = "";

  const handleCreateMeeting = async () => {
    const response = await fetch('http://localhost:8000/api/meetings/create/', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${access_token}`
      },
      body: JSON.stringify({
        meeting_details: {
          topic: meetingTopic,
          type: 2,
          start_time: new Date().toISOString(),
          duration: 60
        }
      })
    });
    const data = await response.json();
    console.log(data);
  };

  return (
    <div>
      <input
        type="text"
        placeholder="Enter meeting topic"
        value={meetingTopic}
        onChange={(e) => setMeetingTopic(e.target.value)}
      />
      <button onClick={handleCreateMeeting}>Create Meeting</button>
    </div>
  );
}

export default CreateMeeting;

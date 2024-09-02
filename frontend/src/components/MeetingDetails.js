import React from 'react';

function MeetingDetails({ meeting }) {
  return (
    <div>
      <h3>{meeting.topic}</h3>
      <p>Start Time: {new Date(meeting.start_time).toLocaleString()}</p>
      <p>Duration: {meeting.duration} minutes</p>
      <p>Agenda: {meeting.agenda}</p>
      <a href={meeting.start_url} target="_blank" rel="noopener noreferrer">Start Meeting (Host)</a>
      <br />
      <a href={meeting.join_url} target="_blank" rel="noopener noreferrer">Join Meeting</a>
      <p>Password: {meeting.password}</p>
    </div>
  );
}

export default MeetingDetails;

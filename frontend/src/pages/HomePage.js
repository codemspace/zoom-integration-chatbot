import React from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";

const HomePage = () => {
  const handleOAuth = () => {
    window.location.href = 'http://localhost:8000/api/zoom/redirect/';
    // dispatch(startAuth());
  };

  return (
    <div className="container my-5">
      <div className="p-5 text-center bg-body-tertiary rounded-3">
        <h1 className="text-body-emphasis text-2xl py-5">Welcome to Zoom System!</h1>
        <p className="col-lg-8 mx-auto fs-5 text-muted">
          This is an incredible zoom meeting system with ai features!
        </p>
        <div className="py-3">
          <button className="middle none center mr-4 rounded-full bg-blue-600 py-2 px-6 font-sans text-xl font-bold uppercase text-white shadow-md shadow-blue-500/20 transition-all hover:shadow-lg hover:shadow-blue-500/40 focus:opacity-[0.85] focus:shadow-none active:opacity-[0.85] active:shadow-none disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none" onClick={() => handleOAuth()}>Connect to Zoom</button>
          <Link
              className="middle none center mr-4 rounded-full bg-blue-600 py-2 px-6 font-sans text-xl font-bold uppercase text-white shadow-md shadow-blue-500/20 transition-all hover:shadow-lg hover:shadow-blue-500/40 focus:opacity-[0.85] focus:shadow-none active:opacity-[0.85] active:shadow-none disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none"
              to="/zoom-meetings"
          >Zoom Meetings</Link>        
        </div>
      </div>
    </div>
  );
};

export default HomePage;

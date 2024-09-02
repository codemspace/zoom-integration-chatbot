import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Provider } from "react-redux";

import configureStore from "./store/configureStore";

import Layout from "./hoc/Layout";

import HomePage from "./pages/HomePage";
import LoginPage from "./pages/auth/LoginPage";
import SignUpPage from "./pages/auth/SignUpPage";
import ActivateAccountPage from "./pages/auth/ActivateAccountPage";
import ResetPasswordPage from "./pages/auth/ResetPasswordPage";
import ResetPasswordConfirmPage from "./pages/auth/ResetPasswordConfirmPage";
import Facebook from "./pages/auth/Facebook";
import Google from "./pages/auth/Google";

import ZoomCallback from './components/ZoomCallback';
import ZoomAuthSuccess from "./components/ZoomAuthSuccess";
import ZoomMeetings from "./components/ZoomMeetings";
import CreateMeeting from "./components/CreateMeeting";

const store = configureStore();

const App = () => {
  return (
    <Provider store={store}>
      <Router>
        <Layout>
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/facebook" element={<Facebook />} />
            <Route path="/google" element={<Google />} />
            <Route path="/login" element={<LoginPage />} />
            <Route path="/signup" element={<SignUpPage />} />
            <Route
              path="/activate/:uid/:token"
              element={<ActivateAccountPage />}
            />
            <Route path="/reset-password" element={<ResetPasswordPage />} />
            <Route
              path="/password/reset/confirm/:uid/:token"
              element={<ResetPasswordConfirmPage />}
            />

            <Route path="/zoom-callback" element={<ZoomCallback/>} />
            <Route path="/zoom-auth-success" element={<ZoomAuthSuccess/>} />
            <Route path="/zoom-meetings" element={<ZoomMeetings />} />
            <Route path="/create-meeting" element={<CreateMeeting />} />
          </Routes>
        </Layout>
      </Router>
    </Provider>
  );
};

export default App;

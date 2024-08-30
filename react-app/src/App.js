import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import ZoomCallback from './components/ZoomCallback';  // Assuming this is the component from above
import ZoomAuth from './components/ZoomAuth';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<ZoomAuth/>} />
        <Route path="/zoom-callback" element={<ZoomCallback/>} />
        {/* Other routes */}
      </Routes>
    </Router>
  );
}

export default App;
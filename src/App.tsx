// import { useSelector } from 'react-redux';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import ActiveCoinStrategy from './screens/postlogin/AdminV2/ActiveCoinStrategy';

function App() {
  return (
    <div className="flex flex-col bg-theme-v2-white2 min-h-screen sticky top-0 z-50 text-[16px]">
      <Router>
        <Routes>
          <Route path="/" element={<ActiveCoinStrategy />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;

import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter as Router } from 'react-router-dom'; // Import Router
import App from './App.jsx';
import './index.css';
import 'swiper/swiper-bundle.css';

const Root = () => (
  <Router>
    <App />
  </Router>
);

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <Root /> {/* Use Root component instead of App */}
  </StrictMode>,
);

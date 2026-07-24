import { Routes, Route } from 'react-router-dom';
import DynamicPage from './pages/DynamicPage';

function App() {
  return (
    <Routes>
      <Route path="/" element={<DynamicPage />} />
      <Route path="/:slug" element={<DynamicPage />} />
    </Routes>
  );
}

export default App;

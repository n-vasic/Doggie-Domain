import './App.scss';
import { Routes, Route } from 'react-router-dom';
import HomePage from './pages/HomePage';
import AboutPage from './pages/AboutPage';
import ContactPage from './pages/ContactPage';
import PolicyPage from './pages/PolicyPage';
import PageNotFound from './pages/PageNotFound';
import ShopPage from './pages/ShopPage';

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<HomePage />}></Route>
        <Route path="/about" element={<AboutPage />}></Route>
        <Route path="/contact" element={<ContactPage />}></Route>
        <Route path="/policy" element={<PolicyPage />}></Route>
        <Route path="/shop" element={<ShopPage />}></Route>
        <Route path="*" element={<PageNotFound />}></Route>
      </Routes>
    </>
  );
}

export default App;

import { Outlet, useLocation } from 'react-router-dom';
import { Container } from 'react-bootstrap';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Header from './components/Header';
import Footer from './components/Footer';
import './App.css';

const App = () => {
  const location = useLocation();
  // On n'affiche le Header et le Footer que si on n'est pas sur la page d'accueil
  const isLandingPage = location.pathname === '/';

  return (
    <div className={!isLandingPage ? 'main-container' : ''}>
      <ToastContainer />
      {!isLandingPage && <Header />}
      <main>
          <Outlet />
      </main>
      {!isLandingPage && <Footer />}
    </div>
  );
};

export default App;
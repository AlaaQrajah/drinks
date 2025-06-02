import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import Navbar from '../components/pages/Navbar';
import Footer from '../components/pages/Footer';
import PageLayout from '../components/Layout/PageLayout';
import '../styles/Layout.css';

const Layout = ({ children }) => {
  const location = useLocation();

  // Scroll to top when route changes
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [location.pathname]);

  return (
    <div className="app-layout">
      <Navbar />
      <PageLayout>
        <main className="main-content">{children}</main>
      </PageLayout>
      <Footer />
    </div>
  );
};

export default Layout;

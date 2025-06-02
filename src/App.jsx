import LayoutRoute from './Layout/LayoutRoute';
import Layout from './Layout/Layout';
import './styles/index.css';
import Router from './Router/Router';
import { AuthProvider } from './components/Context/AuthContext';

function App() {
  return (
    <AuthProvider>
      <LayoutRoute>
        <Layout>
          <Router />
        </Layout>
      </LayoutRoute>
    </AuthProvider>
  );
}

export default App;

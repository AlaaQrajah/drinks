import LayoutRoute from "./Layout/LayoutRoute";
import Layout from "./Layout/Layout";
import "./styles/index.css";
import Router from "./Router/Router";
import LoginHero from "./components/pages/LoginHero";
import { AuthProvider } from "./components/context/AuthContext";

function App() {
  return (
    <AuthProvider>
      <LayoutRoute>
        <Layout>
          <Router />
        </Layout>
      </LayoutRoute>
    </AuthProvider>
    /* <LoginHero />*/
  );
}

export default App;

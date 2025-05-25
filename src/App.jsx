import LayoutRoute from "./Layout/LayoutRoute";
import Layout from "./Layout/Layout";
import "./styles/index.css";
import Router from "./Router/Router";
import LoginHero from "./components/pages/LoginHero";

function App() {
  return (
    <LayoutRoute>
      <Layout>
        <Router />
      </Layout>
    </LayoutRoute>
    /* <LoginHero />*/
  );
}

export default App;

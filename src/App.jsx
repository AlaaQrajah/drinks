import LayoutRoute from "./Layout/LayoutRoute";
import Layout from "./Layout/Layout";
import "./styles/index.css";
import Router from "./Router/Router";

function App() {
  return (
    <LayoutRoute>
      <Layout>
        <Router />
      </Layout>
    </LayoutRoute>
  );
}

export default App;

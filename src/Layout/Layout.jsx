import Navbar from "../components/pages/Navbar";
import Footer from "../components/pages/Footer";
import PageLayout from "../components/Layout/PageLayout";

const Layout = ({ children }) => {
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

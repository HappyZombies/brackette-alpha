import React from "react";
import Nav from "./components/Nav";
import Footer from "./pages/Home/Footer";
import { DRAWER_WIDTH } from "./utils/Constants";

const style = () => {
  return {
    marginLeft: window.location.pathname.includes("dashboard")
      ? DRAWER_WIDTH
      : "inherit"
  };
};

const App = ({ children }: { children: JSX.Element[] }) => {
  return (
    <div id="page-container" style={style()}>
      <div id="content-wrap">
        <Nav />
        {children}
        <Footer />
      </div>
    </div>
  );
};
export default App;

import React from "react";
import Nav from "./components/Nav";
import Footer from './pages/Home/Footer';



const App = ({ children }: { children: JSX.Element[] }) => {
  return (
    <div id="page-container">
      <div id="content-wrap">
        <Nav />
        {children}
        <Footer />
      </div>
    </div>

  );
}
export default App;

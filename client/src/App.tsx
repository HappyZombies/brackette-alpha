import React from "react";
import Nav from "./components/Nav";



const App = ({ children }: { children: JSX.Element[] }) => {
  return (
    <main>
      <Nav />
      {children}
    </main>
  );
}
export default App;

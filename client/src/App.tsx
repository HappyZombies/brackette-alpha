import React, { Component, Props, Children, ReactChildren, ReactNode, ReactElement, ValidationMap } from "react";
import Nav from "./components/Nav";



const App = ({ children }: { children: JSX.Element[] }) => {
  return (
    <div>
      <Nav />
      {children}
    </div>
  );
}
export default App;

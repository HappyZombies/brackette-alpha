import React, { Component, Props, Children, ReactChildren, ReactNode, ReactElement, ValidationMap } from "react";
import Nav from "./components/Nav";
import CssBaseline from "@material-ui/core/CssBaseline";



const App = ({ children }: { children: JSX.Element[] }) => {
  return (
    <main>
      <Nav />
      {children}
    </main>
  );
}
export default App;

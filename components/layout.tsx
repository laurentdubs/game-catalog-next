import React from "react";
import { Header } from "./headers";

export const Layout = ({ children }) => {
  return (
    <div>
      <Header />
      {children}
    </div>
  );
}

export default Layout;
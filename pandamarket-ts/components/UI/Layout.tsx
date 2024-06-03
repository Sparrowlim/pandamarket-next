import Header from "./Header";
import React, { FC } from "react";

interface LayoutProps {
  children: React.ReactNode;
}

const Layout: FC<LayoutProps> = ({ children }) => {
  return (
    <>
      <Header />
      <h1>레이아웃</h1>
      {children}
    </>
  );
};

export default Layout;

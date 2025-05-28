import Header from "./header";
import Footer from "./Footer";
import React from "react";

interface LayoutProps {
    children: React.ReactNode;
}

export default function Layout ({children }: LayoutProps) {
  return (
    <div className="layout">
      <Header />
      <div className="content">
        <div className="main">
          {children}
        </div>
      </div>
      <Footer />
    </div>
  )
}

import Footer from "@/components/navigation/Footer";
import Navbar from "@/components/navigation/Navbar";
import React from "react";

export default function layout({ children }) {
  return (
    <>
      <Navbar />
      {children}
      <Footer />
    </>
  );
}

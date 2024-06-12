import React from "react";
import Navbar from "@/components/navigation/Navbar";
import Footer from "@/components/navigation/Footer";

export default function Layout({children}) {
    return (
        <>
            <Navbar/>
            {children}
            <Footer/>
        </>
    )
}
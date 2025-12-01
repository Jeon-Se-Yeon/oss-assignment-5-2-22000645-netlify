import { Outlet } from 'react-router-dom';
import React from 'react'
import Layout from "../pages/Layout";

export default function HomeOutlet() {
    return (
        <>
            <div style={{ backgroundColor: "yellow" }}>Header</div>
            <div style={{ backgroundColor: "margenta" }}>SideBar</div>
            <div path="/" element={<Layout />} />
            <div id="contents" style={{ backgroundColor: "PapayaWhip" }}>

                <Outlet />

            </div>
        </>
    )
}

import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter, Routes, Route, Link } from "react-router-dom";
import "./index.css";
import ShowList from "./Pages/ShowList.js";
import AddProductPage from "./Pages/AddProductPage.js";
import EditProductPage from "./Pages/EditProductPage.js";


function App() {
    return (
        <BrowserRouter> 
            <nav className="navbar">
                <Link to="/" className="nav-link">Home (Product List)</Link>
            </nav>
            <div className="container">
                <Routes>
                    <Route path="/" element={<ShowList />} />
                    <Route path="/add" element={<AddProductPage />} /> 
                    <Route path="/edit/:productId" element={<EditProductPage />} /> 
                </Routes>
            </div>
        </BrowserRouter>
    );
}


const root = ReactDOM.createRoot(document.getElementById("root"));

root.render(<App />);

export default App;
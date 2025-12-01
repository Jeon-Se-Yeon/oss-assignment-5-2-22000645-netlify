// src/components/Pages/AddProductPage.js
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom'; // 라우트 이동을 위해 사용
import "./AddProductPage.css";

const API_URL = "https://6909a7ab2d902d0651b49af9.mockapi.io/SampleProduct";

/**
 * 새 제품을 추가하는 페이지입니다. (기존 AddModal 역할)
 */
function AddProductPage() {
    const navigate = useNavigate(); // 라우트 이동 함수

    // 폼 입력 상태 관리
    const [product, setProduct] = useState('');
    const [price, setPrice] = useState('');
    const [material, setMaterial] = useState('');
    const [count, setCount] = useState('');

    const handleAddProduct = async (newProductData) => {
        try {
            const response = await fetch(API_URL, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json; charset=UTF-8' },
                body: JSON.stringify(newProductData),
            });

            if (response.status === 201) {
                // 성공 후 목록 페이지로 이동
                navigate('/'); 
            } else {
                throw new Error(`Failed to add product: ${response.statusText}`);
            }
        } catch (error) {
            console.error(error);
            alert(error.message);
        }
    };

    const handleSubmit = (event) => {
        event.preventDefault();

        // 간단한 유효성 검사
        if (!String(product).trim() ||
            !String(price).trim() ||
            !String(material).trim() ||
            !String(count).trim()) {

            alert("Please fill in all fields.");
            return;
        }

        const priceValue = Number(price);
        const countValue = Number(count);
        if (isNaN(priceValue) || isNaN(countValue)) {
            alert("Price and Count must be valid numbers.");
            return;
        }

        const newProduct = { product, price: priceValue, material, count: countValue };
        handleAddProduct(newProduct);
    };

    return (
        <div className="page-content">
            <h2>Add New Product</h2>
            <form onSubmit={handleSubmit} className="form-container">
                {/* Controlled Input Fields */}
                <input type="text" className="modal-input" id="product" placeholder="Product Name"
                    value={product} onChange={(e) => setProduct(e.target.value)} />
                <input type="text" className="modal-input" id="price" placeholder="Price (e.g., 19.99)"
                    value={price} onChange={(e) => setPrice(e.target.value)} />
                <input type="text" className="modal-input" id="material" placeholder="Material"
                    value={material} onChange={(e) => setMaterial(e.target.value)} />
                <input type="text" className="modal-input" id="count" placeholder="Count (Quantity)"
                    value={count} onChange={(e) => setCount(e.target.value)} />

                <div className="form-actions">
                    <button type="button" className="btn" onClick={() => navigate('/')}>Cancel</button>
                    <button type="submit" id="btn-Add" className="btn">Add data</button>
                </div>
            </form>
        </div>
    );
}

export default AddProductPage;
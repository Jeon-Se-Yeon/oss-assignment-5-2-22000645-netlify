// src/components/Pages/EditProductPage.js
import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom'; // URL 파라미터 및 라우트 이동을 위해 사용
import './EditProductPage.css';

const API_URL = "https://6909a7ab2d902d0651b49af9.mockapi.io/SampleProduct";

/**
 * 기존 제품을 수정하는 페이지입니다. (기존 EditModal 역할)
 */
function EditProductPage() {
    const { productId } = useParams(); // URL에서 제품 ID를 가져옴
    const navigate = useNavigate();

    // 폼 입력 상태 관리
    const [product, setProduct] = useState('');
    const [price, setPrice] = useState('');
    const [material, setMaterial] = useState('');
    const [count, setCount] = useState('');
    const [isLoading, setIsLoading] = useState(true);

    // 제품 데이터 불러오기
    useEffect(() => {
        const fetchProduct = async () => {
            if (!productId) {
                navigate('/');
                return;
            }
            try {
                const response = await fetch(`${API_URL}/${productId}`);
                if (!response.ok) {
                    throw new Error(`HTTP error! status: ${response.status}`);
                }
                const data = await response.json();
                
                // 상태 초기화
                setProduct(String(data.product || ''));
                setPrice(String(data.price || ''));
                setMaterial(String(data.material || ''));
                setCount(String(data.count || ''));
                setIsLoading(false);
            } catch (error) {
                console.error("Error fetching product data for edit:", error);
                alert("Failed to fetch product data for editing.");
                navigate('/');
            }
        };

        fetchProduct();
    }, [productId, navigate]);
    
    // UPDATE (save)
    const handleSaveEdit = async (updatedData) => {
        try {
            const response = await fetch(`${API_URL}/${productId}`, {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json; charset=UTF-8' },
                body: JSON.stringify(updatedData),
            });

            if (response.status === 200) {
                // 성공 후 목록 페이지로 이동
                navigate('/'); 
            } else {
                 throw new Error(`Fail to update data: ${response.statusText}`);
            }
        } catch (error) {
            console.error(error);
            alert(error.message);
        }
    };


    const handleSubmit = (event) => {
        event.preventDefault();

        // 유효성 검사
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

        const updatedData = {
            product,
            price: priceValue,
            material,
            count: countValue
        };

        handleSaveEdit(updatedData);
    };

    if (isLoading) {
        return <div className="page-content">Loading product data...</div>;
    }

    return (
        <div className="page-content">
            <h2>Modify Product (ID: {productId})</h2>
            <form onSubmit={handleSubmit} className="form-container">
                {/* Controlled Input Fields */}
                <input type="text" className="modal-input" id="edit-product" placeholder="Product Name"
                    value={product} onChange={(e) => setProduct(e.target.value)} />
                <input type="text" className="modal-input" id="edit-price" placeholder="Price (e.g., 19.99)"
                    value={price} onChange={(e) => setPrice(e.target.value)} />
                <input type="text" className="modal-input" id="edit-material" placeholder="Material"
                    value={material} onChange={(e) => setMaterial(e.target.value)} />
                <input type="text" className="modal-input" id="edit-count" placeholder="Count (Quantity)"
                    value={count} onChange={(e) => setCount(e.target.value)} />

                <div className="form-actions">
                    <button type="button" className="btn" onClick={() => navigate('/')}>Cancel</button>
                    <button type="submit" id="btn-Save" className="btn">Save changes</button>
                </div>
            </form>
        </div>
    );
}

export default EditProductPage;
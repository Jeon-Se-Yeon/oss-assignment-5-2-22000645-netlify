// src/components/Pages/ShowList.js
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom'; // 라우트 이동을 위해 Link 사용
import ProductList from './ProductList.js';

const API_URL = "https://6909a7ab2d902d0651b49af9.mockapi.io/SampleProduct";

/**
 * 메인 컴포넌트: 제품 목록, 상태 관리, CRUD API 호출을 담당합니다.
 */
function ShowList() {
    const [products, setProducts] = useState([]);
    // const [isAddModalOpen, setIsAddModalOpen] = useState(false); // <--- 제거
    // const [isEditModalOpen, setIsEditModalOpen] = useState(false); // <--- 제거
    // const [editingProduct, setEditingProduct] = useState(null); // <--- 제거

    // READ: 제품 데이터를 불러오는 함수 (index.html의 getStudents와 동일)
    const fetchProducts = async () => {
        try {
            const response = await fetch(API_URL);
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            const data = await response.json();
            setProducts(data);
        } catch (error) {
            console.error("Error fetching data:", error);
            alert("Failed to fetch product data.");
        }
    };
    
    // 컴포넌트 마운트 시 제품 목록을 가져오려면 주석을 해제하세요.
    useEffect(() => {
        fetchProducts(); // <--- 주석 해제하여 목록 자동 로딩
    }, []);

    // CREATE (handleAddProduct 함수는 AddProductPage.js로 이동)
    
    // DELETE
    const handleDeleteProduct = async (id) => {
        if (!window.confirm("Do you really want to delete?")) {
            return;
        }

        try {
            const response = await fetch(`${API_URL}/${id}`, {
                method: 'DELETE',
            });

            if (response.status === 200) {
                fetchProducts(); // 목록 새로고침
            } else {
                 throw new Error(`Failed to delete data: ${response.statusText}`);
            }
        } catch (error) {
            console.error(error);
            alert(error.message);
        }
    };
    
    // UPDATE (prepare): 라우팅 방식으로 변경되면서 이 함수는 ProductItem으로 로직이 이동합니다.
    const handleEditClick = (product) => {
        // 이 함수는 더 이상 사용되지 않습니다. ProductItem에서 Link 컴포넌트를 직접 사용합니다.
        console.log("Edit will navigate to /edit/:productId");
    };

    // UPDATE (save): handleSaveEdit 함수는 EditProductPage.js로 이동
    
    return (
        <div>
            <h1 class="title-text">Product Inventory Management</h1>
            <button className="btn btn-main" onClick={fetchProducts} id="btnStu">Bring product data</button>
            
            {/* Link 컴포넌트로 변경하여 /add 라우트로 이동 */}
            <Link to="/add" id="btn-modal" className="btn btn-main" role="button">
                Add New Product
            </Link>
            
            <div id="contents">
                 {/* Product List 컴포넌트에 데이터와 이벤트 핸들러 전달 */}
                 <ProductList 
                    products={products} 
                    // handleEditClick은 사용되지 않지만, ProductList에 props를 유지하여 onEdit prop을 계속 전달합니다.
                    onEdit={handleEditClick} 
                    onDelete={handleDeleteProduct} 
                 />
            </div>
        </div>
    );
}

export default ShowList;
// src/components/ProductItem.js
import React from 'react';
import { Link } from 'react-router-dom'; // 라우트 이동을 위해 Link 사용

/**
 * 개별 제품 항목을 렌더링합니다.
 */
function ProductItem({ product, onEdit, onDelete }) { // onEdit은 더 이상 사용하지 않지만 prop으로 유지
    // productData가 유효하지 않을 경우를 대비한 안전 장치
    if (!product) return null;

    return (
        <div id={product.id} className="product-item">
            <div className="content">
                {product.product} x {product.count} ({product.material}) [${product.price}] 
            </div>
            <div className="product-actions">
                {/* 수정 버튼을 /edit/:productId로 이동하는 Link로 변경 */}
                <Link to={`/edit/${product.id}`} className="modify-btn">Modify</Link>
                {/* 기존 삭제 버튼은 유지 */}
                <button className="delete-btn" onClick={() => onDelete(product.id)}>Delete</button>
            </div>
        </div>
    );
}

export default ProductItem;
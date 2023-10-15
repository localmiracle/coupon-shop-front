import React, { useState } from 'react'
import ProductList from '../../ProductList/ProductList'
import CouponForm from './CouponForm/CouponForm';

const Coupons = () => {
    const [productList, setProductList] = useState([
      {
        id: 1,
        image: '/TestImage.png',
        name: 'Test1',
        desc: 'Test Desc For Tests',
        price: 100,
      },
      // другие товары
    ]);
  
    const [selectedProduct, setSelectedProduct] = useState<any | null>(null);
  
    const handleEditProduct = (productId: any) => {
        const selectedCoupon = productList.find(product => product.id === productId);
        setSelectedProduct(selectedCoupon);
    };
  
    const handleDeleteProduct = (productId: any) => {
        setProductList((prevProductList) =>
          prevProductList.filter((product) => product.id !== productId)
        );
    };
  
    return (
      <div>
        <h2>Coupons</h2>
        <CouponForm
           coupon={selectedProduct}
           onEdit={setSelectedProduct}
           onDelete={handleDeleteProduct}
        />
        <ProductList
          productList={productList}
          handleEditProduct={handleEditProduct}
          handleDeleteProduct={handleDeleteProduct}
        />
      </div>
    );
  };
  
export default Coupons

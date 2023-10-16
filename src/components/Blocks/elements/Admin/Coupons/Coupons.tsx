import React, { FC, useState } from 'react'
import ProductList from '../../ProductList/ProductList'
import CouponForm from './CouponForm/CouponForm';
import AddCoupons from './AddCoupons/AddCoupons';
import styles from './Coupons.module.css'
import { get } from 'http';

interface CouponProps{
    token: string | null;
}

const Coupons:FC<CouponProps> = ({token}) => {
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
    const [newProductList, setNewProductList] = useState<[] | undefined>([])
    
    const getCoupons = async() => {
      const response = await fetch('http://parcus.shop/admin/coupon', 
      {
        
          method: "GET",
          headers: {
          "Content-Type": "application/json",
           Authorization: `Bearer ${token}`,
          },        
      })
      const data = await response.json()
      console.log(data)
      // В Data мы получаем массив объектов, у которых в первом поле идет ссылка, на которую 
      //необходимо отправить запрос для получения картинки 
      
      const updatedData = await Promise.all(data.map(async (coupon:any) => {
        const getImages = await fetch (coupon.content_url,{
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },        
        })
        const image = await getImages.json();
        if (image){
          console.log(image)
        }
        return { ...coupon, image }
      }));
      console.log(updatedData)
    }

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
      <div className={styles.coupons}>
        <h2 style={{textAlign: 'center'}}>Coupons</h2>
        {/* <CouponForm
           coupon={selectedProduct}
           onEdit={setSelectedProduct}
           onDelete={handleDeleteProduct}
        /> */}
        <AddCoupons token={token}/>
        <ProductList
          productList={productList}
          handleEditProduct={handleEditProduct}
          handleDeleteProduct={handleDeleteProduct}
        />
        <h2>Новые товары:</h2>
        <button onClick={getCoupons}>Получить товары</button>
        <ProductList productList={newProductList}/>
      </div>
    );
  };
  
export default Coupons

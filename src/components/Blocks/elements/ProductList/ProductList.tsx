import React, { FC, useState } from 'react'
import styles from './productList.module.css'
import KeyboardArrowLeftIcon from '@mui/icons-material/KeyboardArrowLeft';
import KeyboardArrowRightIcon from '@mui/icons-material/KeyboardArrowRight';
import Product from '../Product/Product';
import { useQuery } from '@apollo/client';
import { GET_COUPONS } from '@/utils/graphql/query/queries';

interface ProductListProps{
    productList:any, 
    handleEditProduct?:any, 
    handleDeleteProduct?:any
}

const ProductList:FC<ProductListProps> = ({productList, handleEditProduct, handleDeleteProduct}) => {
     
  return (
    <div className={styles.items}>
        <KeyboardArrowLeftIcon className={styles.arrowLeft}/>
        {productList ? productList.map((item:any) => 
        <Product key={item.id}
        id={item.id} 
        image={item.image} 
        name={item.name} 
        desc={item.desc} 
        price={item.price}
        handleEditProduct={handleEditProduct}
        handleDeleteProduct={handleDeleteProduct} />
        ) : <div>Товары не найдены</div>}
        <KeyboardArrowRightIcon className={styles.arrowRight}/>
    </div>
  )
}

export default ProductList
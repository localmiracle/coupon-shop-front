import React, { FC } from 'react'
import styles from './productList.module.css'
import KeyboardArrowLeftIcon from '@mui/icons-material/KeyboardArrowLeft';
import KeyboardArrowRightIcon from '@mui/icons-material/KeyboardArrowRight';
import Product from '../Product/Product';
import { useQuery } from '@apollo/client';
import { GET_COUPONS } from '@/utils/graphql/query/queries';

interface ProductListProps{
    productList?:any, 
    handleEditProduct?:any, 
    handleDeleteProduct?:any
}

const ProductList:FC<ProductListProps> = ({productList, handleEditProduct, handleDeleteProduct}) => {
    const testList = [
        {
            id: 1,
            image: '/TestImage.png',
            name: "Test1",
            desc: 'Test Desc For Tests',
            price: 100,

        },
        {
            id: 2,
            image: '/TestImage.png',
            name: "Test2",
            desc: 'Test Desc For Tests',
            price: 130,

        },
        {
            id: 3,
            image: '/TestImage.png',
            name: "Test3",
            desc: 'Test Desc For Tests',
            price: 120,

        }
    ]
  return (
    <div className={styles.items}>
        <KeyboardArrowLeftIcon className={styles.arrowLeft}/>
        {testList.map((item) => 
        <Product key={item.id}
        id={item.id} 
        image={item.image} 
        name={item.name} 
        desc={item.desc} 
        price={item.price}
        handleEditProduct={handleEditProduct}
        handleDeleteProduct={handleDeleteProduct} />
        )}
        <KeyboardArrowRightIcon className={styles.arrowRight}/>
    </div>
  )
}

export default ProductList
import React, { FC, useEffect, useState } from 'react'
import styles from './Product.module.css'
import Image from 'next/image';
import ClearIcon from '@mui/icons-material/Clear';
import EditNoteIcon from '@mui/icons-material/EditNote';

interface ProductProps{
    id: string | number;
    image: string;
    name: string;
    description: string;
    level: number;
    price: number;
    style: any;
    handleEditProduct?:any, 
    handleDeleteProduct?:any,
}

const Product:FC<ProductProps> = ({id, image, name, description, level, price, style, handleEditProduct, handleDeleteProduct}) => {
  const [isAdmin, setIsAdmin] = useState<boolean>(false)
  useEffect(()=>{
    if(localStorage.getItem('adminToken')){
      setIsAdmin(true)
    } else {
      setIsAdmin(false)
    }
  },[])
  return (
    <div className={styles.list__item} style={style}>
        {isAdmin ?<div className={styles.edits}>
          <ClearIcon style={{color: 'red',cursor:'pointer'}} onClick={handleDeleteProduct}/>
          <EditNoteIcon style={{cursor:'pointer'}} onClick={handleEditProduct}/>
        </div> : null}
        <Image src={image} alt={''} width={209} height={233}/>
        <div className={styles.info}>
            <div>
                <h3>{name}</h3>
                <p className={styles.description}>{description}</p>
            </div>
            <p className={styles.level}>Уровень: {level}</p>
            <p className={styles.price}>{price} ₽</p>
            
            <button className={styles.btn}>Купить</button>
        </div>
    </div>
  )
}

export default Product
import React, { FC } from 'react'
import styles from './HomeMain.module.css'
import Image from 'next/image';
import Man from './../../../../../public/ManIcon.png'
import ProductList from '../../elements/ProductList/ProductList';

interface HomeMainProps{
    productList?: any
}

const HomeMain:FC<HomeMainProps> = ({productList}) => {
  return (
    <main>
        <div className={styles.ads}></div>
        <section className={styles.top}>
            
            <div className={styles.left}>
                
                <h1>ПРЕВРАТИТЕ СВОИ ПОКУПКИ В СБЕРЕЖЕНИЯ </h1>
                <h3>Выгодные предложения</h3>
                <ProductList productList={productList}/>
                
            </div>

            <div className={styles.right}>

            </div>
        </section>
        <section className={styles.bottom}>
            <div className={styles.bottom__left}>
                <h3>Популярно в последнее время</h3>
                <ProductList productList={productList}/>
            </div>
            <div className={styles.bottom__right}>
                <Image 
                src={Man} 
                alt={'ManIcon'}
                style={{marginTop: '-40px'}}></Image>
            </div>
        </section>
       
    </main>
  )
}

export default HomeMain
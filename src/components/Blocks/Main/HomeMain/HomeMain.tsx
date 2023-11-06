import React, { FC } from "react";
import styles from "./HomeMain.module.css";
import Image from "next/image";
import Man from "./../../../../../public/ManIcon.png";
import ProductList from "../../elements/ProductList/ProductList";
import Product from "../../elements/Product/Product";

interface HomeMainProps {
  productList?: any;
  loadProductPageCallback: (page: number) => void;
}

const HomeMain: FC<HomeMainProps> = ({
  productList,
  loadProductPageCallback,
}) => {
  console.log(productList);

  return (
    <main className={styles.main}>
      <div className={styles.ads}></div>
      <section className={styles.top}>
        <div className={styles.left}>
          <h1>ПРЕВРАТИТЕ СВОИ ПОКУПКИ В СБЕРЕЖЕНИЯ </h1>
          <h3>Выгодные предложения</h3>
          {productList?.length > 0 && (
            <ProductList
              productList={productList}
              preloadProducts={loadProductPageCallback}
            />
          )}
        </div>

        <div className={styles.right}></div>
      </section>
      <section className={styles.bottom}>
        <div className={styles.bottom__left}>
          <h3>Популярно в последнее время</h3>
          {productList?.length > 0 && (
            <ProductList
              productList={productList}
              preloadProducts={loadProductPageCallback}
            />
          )}
        </div>
        <div className={styles.bottom__right}>
          <Image src={Man} alt={"ManIcon"}></Image>
        </div>
      </section>
    </main>
  );
};

export default HomeMain;

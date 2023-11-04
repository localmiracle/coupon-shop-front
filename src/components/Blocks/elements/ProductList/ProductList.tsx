import React, { FC, useState } from "react";
import styles from "./productList.module.css";
import KeyboardArrowLeftIcon from "@mui/icons-material/KeyboardArrowLeft";
import KeyboardArrowRightIcon from "@mui/icons-material/KeyboardArrowRight";
import Product from "../Product/Product";

interface ProductListProps {
  productList: any;
  handleEditProduct?: any;
  handleDeleteProduct?: any;
}

const ProductList: FC<ProductListProps> = ({
  productList,
  handleEditProduct,
  handleDeleteProduct,
}) => {
  return (
    <div className={styles.items}>
      {Array.isArray(productList) && productList.length > 0 ? (
        <>
          <KeyboardArrowLeftIcon className={styles.arrowLeft} />
          {productList.map((item: any) => (
            <Product
              key={item.id}
              id={item.id}
              image={item.content_url}
              name={item.name}
              description={item.description}
              level={item.level}
              price={item.price}
              handleEditProduct={() => handleEditProduct(item.id)}
              handleDeleteProduct={() => handleDeleteProduct(item.id)}
            />
          ))}
          <KeyboardArrowRightIcon className={styles.arrowRight} />
        </>
      ) : (
        <div>Товары не найдены</div>
      )}
    </div>
  );
};

export default ProductList;

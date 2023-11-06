import React, { FC, useEffect, useState } from "react";
import styles from "./Product.module.css";
import Image from "next/image";
import ClearIcon from "@mui/icons-material/Clear";
import EditNoteIcon from "@mui/icons-material/EditNote";

interface ProductProps {
  product: {
    id: string;
    image: File;
    content_url: string;
    name: string;
    description: string;
    level: number;
    price: number;
    discount: number;
    region: string;
    category: string;
    subcategory: string | null;
  };
  style?: React.CSSProperties;
  fullSize?: boolean;
}

const Product: FC<ProductProps> = ({ product, style, fullSize = true }) => {
  let levelString = "";

  switch (product.level) {
    case 1:
      levelString = "Минимум";
      break;
    case 2:
      levelString = "Стандарт";
      break;
    case 3:
      levelString = "Премиум";
      break;
    default:
      levelString = "Минимум";
      break;
  }

  return (
    <div className={`${styles.card} ${fullSize ? "" : styles.mini}`} style={style}>
      <div className={styles.card_image}>
        <p>IMAGE</p>
      </div>
      <div className={styles.card_info}>
        <div>
          <h2>{product.name}</h2>
          <p className={styles.description}>{product.description}</p>
        </div>
        <p className={styles.level}>Уровень: {levelString}</p>
        <div className={styles.price}>
          <span>{product.price} ₽</span>
        </div>
        <button>КУПИТЬ</button>
      </div>
    </div>
  );
};

export default Product;

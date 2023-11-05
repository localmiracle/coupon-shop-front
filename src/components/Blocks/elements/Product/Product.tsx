import React, { FC, useEffect, useState } from "react";
import styles from "./Product.module.css";
import Image from "next/image";
import ClearIcon from "@mui/icons-material/Clear";
import EditNoteIcon from "@mui/icons-material/EditNote";

interface ProductProps {
  id: string | number;
  image: string;
  name: string;
  description: string;
  level: number;
  price: number;
  style?: any;
}

const Product: FC<ProductProps> = ({
  image,
  name,
  description,
  level,
  price,
  style,
}) => {
  let levelString = "";

  switch (level) {
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
    <div className={styles.card} style={style}>
      <div className={styles.card_image}>
        <p>IMAGE</p>
      </div>
      <div className={styles.card_info}>
        <div>
          <h2>{name}</h2>
          <p className={styles.description}>{description}</p>
        </div>
        <p className={styles.level}>Уровень: {levelString}</p>
        <div className={styles.price}>
          <span>{price} ₽</span>
        </div>
        <button>КУПИТЬ</button>
      </div>
    </div>
  );
};

export default Product;

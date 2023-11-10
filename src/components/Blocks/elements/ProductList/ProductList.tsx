import React, { FC, MutableRefObject, useEffect, useRef, useState } from "react";
import styles from "./ProductList.module.css";
import KeyboardArrowLeftIcon from "@mui/icons-material/KeyboardArrowLeft";
import KeyboardArrowRightIcon from "@mui/icons-material/KeyboardArrowRight";
import Product from "../Product/Product";

interface ProductListProps {
  productList: any;
  preloadProducts: (page: number) => void;
}

const ProductList: FC<ProductListProps> = ({
  productList,
  preloadProducts,
}) => {
  let scrl = useRef() as MutableRefObject<HTMLDivElement>;
  const scrollStep = 334;
  const [scrollX, setScrollX] = useState<number>(0);
  const [scrollEnd, setScrollEnd] = useState<boolean>(false);

  useEffect(() => {
    // if scrolled past 5th element
    if (scrollX >= (scrollStep * 2)) {  
      // preload next page of products
      preloadProducts(2 + ~~((~~(scrollX / scrollStep) - 2) / 6));
    }
  }, [scrollX]);

  const slide = (shift: number) => {
    scrl.current.scrollBy({
      left: shift,
      behavior: "smooth",
    });

    scrl.current.scrollLeft += shift;
    setScrollX(scrollX + shift);
    if (
      Math.floor(scrl.current.scrollWidth - scrl.current.scrollLeft) <=
      scrl.current.offsetWidth
    ) {
      setScrollEnd(true);
    } else {
      setScrollEnd(false);
    }
  };

  const scrollCheck = () => {
    setScrollX(scrl.current.scrollLeft);
    if (
      Math.floor(scrl.current.scrollWidth - scrl.current.scrollLeft) <=
      scrl.current.offsetWidth
    ) {
      setScrollEnd(true);
    } else {
      setScrollEnd(false);
    }
  };

  return (
    <div className={styles.item_slider}>
      {productList?.length > 0 ? (
        <>
          <svg
            onClick={() => slide(-scrollStep)}
            className={`${styles.left_arrow_left} ${
              scrollX < 1 ? styles.is_disabled_hide : null
            }`}
            xmlns="http://www.w3.org/2000/svg"
            width="40"
            height="40"
            viewBox="0 0 40 40"
            fill="none"
          >
            <path
              opacity="0.4"
              d="M20 40C8.9544 40 0 31.0456 0 20C0 8.9543 8.9544 0 20 0C31.0457 0 40 8.9543 40 20C40 31.0456 31.0457 40 20 40Z"
              fill="#E9E4DB"
            />
            <path
              d="M22.5206 28.5604C22.9006 28.5604 23.2806 28.4204 23.5806 28.1204C24.1606 27.5404 24.1606 26.5804 23.5806 26.0004L17.5806 20.0004L23.5806 14.0003C24.1606 13.4203 24.1606 12.4603 23.5806 11.8803C23.0006 11.3003 22.0406 11.3003 21.4606 11.8803L14.4006 18.9404C13.8206 19.5204 13.8206 20.4804 14.4006 21.0604L21.4606 28.1204C21.7606 28.4204 22.1406 28.5604 22.5206 28.5604Z"
              fill="#403D39"
            />
          </svg>
          <div
            ref={scrl}
            onScroll={scrollCheck}
            className={styles.item_container}
          >
            {productList.map((product: any, index: number) => (
              <Product key={index} product={product} fullSize={false} />
            ))}
          </div>
          <svg
            onClick={() => slide(+scrollStep)}
            className={`${styles.right_arrow_right} ${
              !scrollEnd && productList.length > 3
                ? null
                : styles.is_disabled_hide
            }`}
            xmlns="http://www.w3.org/2000/svg"
            width="40"
            height="40"
            viewBox="0 0 40 40"
            fill="none"
          >
            <path
              opacity="0.4"
              d="M20 40C31.0456 40 40 31.0456 40 20C40 8.9543 31.0456 0 20 0C8.9543 0 0 8.9543 0 20C0 31.0456 8.9543 40 20 40Z"
              fill="#E9E4DB"
            />
            <path
              d="M17.4794 28.5604C17.0994 28.5604 16.7194 28.4204 16.4194 28.1204C15.8394 27.5404 15.8394 26.5804 16.4194 26.0004L22.4194 20.0004L16.4194 14.0003C15.8394 13.4203 15.8394 12.4603 16.4194 11.8803C16.9994 11.3003 17.9594 11.3003 18.5394 11.8803L25.5994 18.9404C26.1794 19.5204 26.1794 20.4804 25.5994 21.0604L18.5394 28.1204C18.2394 28.4204 17.8594 28.5604 17.4794 28.5604Z"
              fill="#403D39"
            />
          </svg>
        </>
      ) : (
        <div>Товары не найдены</div>
      )}
    </div>
  );
};

export default ProductList;

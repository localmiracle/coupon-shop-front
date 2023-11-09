import React, { FC, useContext, useEffect, useState } from "react";
import styles from "./HomeHeader.module.css";
import MenuIcon from "@mui/icons-material/Menu";
import { useDispatch, useSelector } from "react-redux";
import { setModalOpen } from "@/redux/modalReducer";
import { RootState } from "@/redux/store";
import Logo from "./Logo/Logo";
import Location from "./Logo/Location/Location";
import Search from "./Search/Search";
import Authorization from "./Authorization/Authorization";
import Image from "next/image";
import Attractions from "./../../../../../../public/icons/Attractions.png";
import Beauty from "./../../../../../../public/icons/Beauty.png";
import Educations from "./../../../../../../public/icons/educations.png";
import Fitness from "./../../../../../../public/icons/fitness.png";
import ForHome from "./../../../../../../public/icons/ForHome.png";
import Health from "./../../../../../../public/icons/Health.png";
import Kids from "./../../../../../../public/icons/kids.png";
import Restaurants from "./../../../../../../public/icons/Restaurants.png";
import Weekends from "./../../../../../../public/icons/weekends.png";
import Cancel from "./../../../../../../public/icons/Cancel.png";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import { Dictionary } from "@reduxjs/toolkit";
import Product from "@/components/Blocks/elements/Product/Product";
import apiClient from "@/http/client";

interface CategoryProps {
  category: string;
  products: any[];
}

const Category: FC<CategoryProps> = ({ category, products }) => {
  return (
    <div
      className={styles.catalog_category}
      style={category === "" ? { display: "none" } : { display: "flex" }}
    >
      <h1>{category}</h1>
      <div className={styles.card_list}>
        {products.length > 0 ? (
          products.map((product: any, index: number) => (
            <Product key={index} product={product} />
          ))
        ) : (
          <p>Товаров нет</p>
        )}
      </div>
    </div>
  );
};

const HomeHeader: FC = () => {
  const [show, setShow] = useState<boolean>(false);
  const dispatch = useDispatch();
  const region = useSelector((state: RootState) => state.region.name);
  const modalOpen = useSelector((state: RootState) => state.modal.modalOpen);
  const [categories, setCategories] = useState<any[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<string>("");
  const [products, setProducts] = useState<any[]>([]);

  useEffect(() => {
    const getCategories = async () => {
      try {
        const { data } = await apiClient.get("/categories");
        setCategories(data);
      } catch (e) {
        console.log(e);
      }
    };
    getCategories();
  }, []);

  useEffect(() => {
    const getCoupons = async () => {
      try {
        const { data } = await apiClient.get(
          `/coupons/standard?region=${region}&category=${selectedCategory}`,
          {
            headers: {
              "Content-Type": "application/json",
              Subcategory: "false",
            },
          }
        );
        setProducts(data);
      } catch (e) {
        console.log(e);
      }
    };
    if (region !== "" && selectedCategory !== "") getCoupons();
  }, [region, selectedCategory]);

  const handleToggleModal = () => {
    dispatch(setModalOpen(!modalOpen));
  };

  const handleToggleCatalog = () => {
    setShow(!show);
    if (show) {
      document.body.style.overflow = "auto";
    } else {
      document.body.style.overflow = "hidden";
    }
  };

  return (
    <>
      <header
        className={styles.header}
        style={show ? { position: "fixed", zIndex: "99999" } : {}}
      >
        <div className={`${styles.container} ${styles.header_container}`}>
          <div className={styles.header__logo}>
            <Logo />
            <Location />
          </div>

          <div
            className={`${styles.catalog} ${show ? styles.show : ""}`}
            onMouseLeave={() => setSelectedCategory("")}
          >
            <div
              className={`${styles.catalog__container} ${
                selectedCategory !== "" ? styles.mobile_hidden : ""
              }`}
            >
              {categories.length > 0 ? (
                categories.map((category) => (
                  <div
                    key={category.id}
                    className={styles.catalog_items}
                    onMouseOver={() => setSelectedCategory(category.name)}
                  >
                    <div>
                      {/* <Image src={Health} alt={""} /> */}
                      <p>{category.name}</p>
                    </div>

                    <ArrowForwardIosIcon />
                  </div>
                ))
              ) : (
                <p>Нет доступных категорий</p>
              )}
            </div>
            <Category category={selectedCategory} products={products} />
          </div>

          <div className={styles.header__search}>
            {show ? (
              <Image
                src={Cancel}
                alt=""
                onClick={handleToggleCatalog}
                style={{ cursor: "pointer" }}
              />
            ) : (
              <MenuIcon
                onClick={handleToggleCatalog}
                style={{
                  display: "block",
                  fontSize: "30px",
                  cursor: "pointer",
                  background: "#CCC5B9",
                  borderRadius: "5px",
                  position: "relative",
                }}
              />
            )}

            <Search />
          </div>

          <Authorization handleToggleModal={handleToggleModal} />
        </div>
        <div className={styles.header__search__mobile}>
          {show ? (
            <Image
              src={Cancel}
              alt=""
              onClick={handleToggleCatalog}
              style={{ cursor: "pointer" }}
            />
          ) : (
            <MenuIcon
              onClick={handleToggleCatalog}
              style={{
                display: "block",
                fontSize: "30px",
                cursor: "pointer",
                background: "#CCC5B9",
                borderRadius: "5px",
                position: "relative",
              }}
            />
          )}

          <Search />
        </div>
      </header>
      <div
        className={styles.header_replacer}
        style={show ? { display: "block" } : { display: "none" }}
      ></div>
    </>
  );
};

export default HomeHeader;

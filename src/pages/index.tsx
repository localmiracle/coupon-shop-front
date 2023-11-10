import Footer from "@/components/Blocks/Footer/Footer";
import HomeHeader from "@/components/Blocks/Header/HomeHeader/HomeHeaderElements/HomeHeader";
import HomeMain from "@/components/Blocks/Main/HomeMain/HomeMain";
import HomeContainer from "@/components/Containers/HomeContainer/HomeContainer";
import apiClient from "@/http/client";
import { NextPage } from "next";
import { useSelector } from "react-redux";
import { RootState } from "@/redux/store";

import Head from "next/head";
import React, { useEffect, useState } from "react";

const HomePage: NextPage = () => {
  const region = useSelector((state: RootState) => state.region.name);
  const [token, setToken] = useState<string | null>("");
  const [productList, setProductList] = useState<any>(null);
  const [maxPage, setMaxPage] = useState<number>(0);

  const getCoupons = async (page: number) => {
    try {
      const { data } = await apiClient.get(
        `/coupons/standard?region=${region}&limit=6&offset=${(page - 1) * 6}`,
        {
          headers: {
            "Content-Type": "application/json",
            Subcategory: "false",
          },
        }
      );
      return data;
    } catch (e) {
      console.log(e);
    }
  };

  const loadProductPage = async (page: number) => {
    if (page > maxPage) {
      const data = await getCoupons(page);
      if (data?.length > 0) {
        setProductList([...productList, ...data]);
        setMaxPage(page);
      }
    }
  };

  useEffect(() => {
    const systemToken = localStorage.getItem("token");
    setToken(systemToken);
    const loadCouponsFirstPage = async () => {
      const data = await getCoupons(1);
      setProductList(data);
      setMaxPage(1);
    };

    if (region) loadCouponsFirstPage();
  }, [region]);

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
        backgroundColor: "#FFFCF2",
      }}
    >
      <Head>
        <title>Parcus | Главная</title>
        <meta
          name="description"
          content="ShopSmart - твоё интернет хранилище подписок"
        />
        <link rel="icon" href="/Frame 22.png" />
      </Head>

      <HomeHeader />
      <HomeContainer>
        <HomeMain
          productList={productList}
          loadProductPageCallback={loadProductPage}
        />
      </HomeContainer>
      <Footer />
    </div>
  );
};

export default HomePage;

import Footer from "@/components/Blocks/Footer/Footer";
import UserHeader from "@/components/Blocks/Header/UserHeader/UserHeader";
import UserMain from "@/components/Blocks/Main/UserMain/UserMain";
import UserContainer from "@/components/Containers/UserContainer/UserContainer";
import React, { useEffect, useState } from "react";
import styles from "./../../styles/titles.module.css";
import { NextPage } from "next";
import SubList from "@/components/Blocks/elements/Subs/SubList";
import { useDispatch, useSelector } from "react-redux";
import { useQuery } from "@apollo/client";
import { GET_SUBSCRIPTIONS } from "@/utils/graphql/query/queries";
import { setToken } from "@/redux/tokenSlice";
import { useRouter } from "next/router";
import Head from "next/head";
import { tokenIsValid } from "@/http/utils";
import apiClient from "@/http/client";

const subscription: NextPage = () => {
  const router = useRouter();
  const dispatch = useDispatch();
  const [isAuth, setIsAuth] = useState<boolean>(false);
  const [subscriptions, setSubscriptions] = useState<any[]>([]);

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token && tokenIsValid(token)) {
      dispatch(setToken(token));
      setIsAuth(true);

      const getSubscriptions = async () => {
        try {
          const { data } = await apiClient.get("/subscriptions");
          setSubscriptions(data);
        } catch (e) {
          console.log(e);
        }
      };
      getSubscriptions();
    } else {
      localStorage.removeItem("token");
      dispatch(setToken(""));
      setIsAuth(false);
      router.push("/login");
    }
  }, []);

  return isAuth ? (
    <>
      <Head>
        <link rel="icon" href="/Frame 22.png" />
      </Head>
      <UserContainer>
        <UserHeader />
        <UserMain>
          <h2 className={styles.name}>Купить подписку</h2>
          <SubList subscriptions={subscriptions} />
        </UserMain>
      </UserContainer>
      <Footer />
    </>
  ) : (
    <p>Forbidden</p>
  );
};

export default subscription;

import Footer from "@/components/Blocks/Footer/Footer";
import UserHeader from "@/components/Blocks/Header/UserHeader/UserHeader";
import UserMain from "@/components/Blocks/Main/UserMain/UserMain";
import UserContainer from "@/components/Containers/UserContainer/UserContainer";
import { NextPage } from "next";
import React, { useEffect, useState } from "react";
import styles from "./../components/Blocks/Main/UserMain/UserMain.module.css";
import { useDispatch, useSelector } from "react-redux";
import { setToken } from "@/redux/tokenSlice";
import { useRouter } from "next/router";
import Head from "next/head";
import { GET_SELF } from "@/utils/graphql/query/queries";
import { useLazyQuery } from "@apollo/client";

interface userPageProps {
  token: string;
}

const user: NextPage<userPageProps> = () => {
  const dispatch = useDispatch();
  const router = useRouter();

  let token;

  const [getSelf, { loading, error, data }] = useLazyQuery(GET_SELF);

  const [email, setEmail] = useState<string>("");
  const [phone, setPhone] = useState<string>("");
  const [isAuth, setIsAuth] = useState<boolean>(false);

  function getTokenExpiration(token: any) {
    try {
      const jwt = require("jsonwebtoken");
      const decodedToken = jwt.decode(token);
      const expirationTime = decodedToken ? decodedToken.exp : null;
      return expirationTime;
    } catch (error) {
      console.error("Ошибка при получении времени жизни токена.");
      return null;
    }
  }

  const tokenIsValid = (token: string) => {
    return token !== "" && Date.now() < getTokenExpiration(token) * 1000;
  };

  useEffect(() => {
    token = localStorage.getItem("token");
    if (token && tokenIsValid(token)) {
      dispatch(setToken(token));
      getSelf({
        context: {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      });
      setIsAuth(true);
    } else {
      localStorage.removeItem("token");
      dispatch(setToken(""));
      setIsAuth(false);
      router.push("/login");
    }
  }, []);

  useEffect(() => {
    if (!loading) {
      if (data?.me) {
        setEmail(data.me.email);
        setPhone(data.me.phone);
      }
    }
  }, [loading]);

  return isAuth ? (
    <>
      <Head>
        <title>Parcus | Пользователь</title>
        <link rel="icon" href="/Frame 22.png" />
      </Head>
      <UserContainer>
        <UserHeader />
        <UserMain>
          <h2 className={styles.name}>Настройки</h2>
          <section>
            <form action="" className={styles.info}>
              <div className={styles.info__item}>
                <p>Ваш номер телефона</p>
                <input type="tel" value={phone} disabled />
              </div>
              <div className={styles.info__item}>
                <p>Ваша электронная почта</p>
                <input type="email" value={email} disabled />
              </div>
              <button type="button" className={styles.save}>
                Сохранить изменения
              </button>
            </form>
          </section>
        </UserMain>
      </UserContainer>
      <Footer />
    </>
  ) : (
    <p>Forbidden</p>
  );
};

export default user;

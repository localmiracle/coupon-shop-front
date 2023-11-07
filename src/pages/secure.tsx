import Coupons from "@/components/Blocks/elements/Admin/Coupons/Coupons";
import Panel from "@/components/Blocks/elements/Admin/Panel/Panel";
import AdminContainer from "@/components/Containers/AdminContainer/AdminContainer";
import AdminForm from "@/components/UI/Forms/AdminForm/AdminForm";
import Subscriptions from "@/components/Blocks/elements/Admin/Subscriptions/Subscriptions";
import { NextPage } from "next";
import React, { useEffect, useState } from "react";
import Organisations from "@/components/Blocks/elements/Admin/Organisations/Organisations";
import Head from "next/head";
import axios from "axios";
import $adminApi from "@/http/adminClient";
import { tokenIsValid } from "@/http/utils";

const adminPage: NextPage = () => {
  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false);
  const [token, setToken] = useState<string>("");

  useEffect(() => {
    const token = localStorage.getItem("adminToken");
    setToken(token ? token : "");
  }, []);

  useEffect(() => {
    if (tokenIsValid(token)) {
      localStorage.setItem("adminToken", token);
      $adminApi.defaults.headers.common["Authorization"] = `Bearer ${token}`;
      setIsLoggedIn(true);
    } else {
      localStorage.removeItem("adminToken");
      delete $adminApi.defaults.headers.common["Authorization"];
      setIsLoggedIn(false);
    }

    return () => {
      delete $adminApi.defaults.headers.common["Authorization"];
      setIsLoggedIn(false);
    };
  }, [token]);

  const handleLogOut = () => {
    localStorage.removeItem("adminToken");
    setIsLoggedIn(false);
  };
  return (
    <>
      <Head>
        <title>Parcus | Администратор</title>
        <link rel="icon" href="/Frame 22.png" />
      </Head>
      <AdminContainer>
        <Panel
          isLoggedIn={isLoggedIn}
          handleLogOut={handleLogOut}
          token={token}
          setToken={setToken}
        />
      </AdminContainer>
    </>
  );
};

export default adminPage;

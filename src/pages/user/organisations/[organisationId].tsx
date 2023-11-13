import Footer from "@/components/Blocks/Footer/Footer";
import UserHeader from "@/components/Blocks/Header/UserHeader/UserHeader";
import UserMain from "@/components/Blocks/Main/UserMain/UserMain";
import UserContainer from "@/components/Containers/UserContainer/UserContainer";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import styles from "./../../../styles/titles.module.css";
import { gql, useQuery } from "@apollo/client";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@/redux/store";
import { NextPage } from "next";
import SwitchButtons from "@/components/UI/Buttons/SwitchButtons/SwitchButtons";
import UsersTable from "@/components/Blocks/elements/UsersTable/UsersTable";
import { setToken } from "@/redux/tokenSlice";
import Head from "next/head";
import apiClient from "@/http/client";

interface orgPageProps {
  token: string;
}

const OrganisationPage: NextPage<orgPageProps> = ({ token }) => {
  const dispatch = useDispatch();
  let status: string;
  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      dispatch(setToken(token));
      status = "authenticated";
    } else {
      status = "unauthenticated";
    }
    if (status === "unauthenticated") {
      router.push("/login");
    }
  }, []);

  const active = useSelector((state: RootState) => state.active.active);
  const router = useRouter();
  const [organisation, setOrganisation] = useState<any>({});

  useEffect(() => {
    const getOrganization = async () => {
      try {
        const { data } = await apiClient.get("/organizationInfo");
        const org = data.find((o) => o.id === router.query.organisationId);
        setOrganisation(org);
      } catch (e) {
        console.log(e);
      }
    };
    getOrganization();
  }, []);

  return (
    <>
      <Head>
        <link rel="icon" href="/Frame 22.png" />
      </Head>
      <UserContainer>
        <UserHeader />
        <UserMain>
          {organisation && Object.keys(organisation).length > 0 && (
            <>
              {" "}
              <h2 className={styles.name}>{organisation.name}</h2>
              <SwitchButtons />
              {active === "people" ? (
                <UsersTable members={organisation.members} token={token} />
              ) : (
                <div>Список акций....</div>
              )}
            </>
          )}
        </UserMain>
      </UserContainer>
      <Footer />
    </>
  );
};

export default OrganisationPage;

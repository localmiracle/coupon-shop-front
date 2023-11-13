import React, { FC, useEffect, useState } from "react";
import LocationOnOutlinedIcon from "@mui/icons-material/LocationOnOutlined";
import Image from "next/image";
import styles from "./OrganistaionsList.module.css";
import { gql, useQuery } from "@apollo/client";
import { useRouter } from "next/router";
import { useSelector } from "react-redux";
import { RootState } from "@/redux/store";
import apiClient from "@/http/client";

const OrganisationsList: FC = () => {
  const token = useSelector((state: RootState) => state.token.token);
  const router = useRouter();
  const navToOrganisation = (organisationId: string) => {
    router.push(`/user/organisations/${organisationId}`);
  };

  const [organisations, setOrganisations] = useState<any[]>([]);

  useEffect(() => {
    const getOrganizations = async () => {
      try {
        const { data } = await apiClient.get("/organizationInfo");
        setOrganisations(data);
      } catch (e) {
        console.log(e);
      }
    };
    getOrganizations();
  }, []);

  return (
    <div className={styles.orgs}>
      {organisations.length > 0 ? (
        organisations.map((organisation: any) => (
          <div
            className={styles.org__item}
            key={organisation.id}
            onClick={() => navToOrganisation(organisation.id)}
          >
            <h3>{organisation.name}</h3>
              <Image
                src={organisation.content_url}
                width={209}
                height={213}
                alt={""}
                className={styles.org_image}
              />
            <div className={styles.address}>
              <LocationOnOutlinedIcon style={{ fontSize: "14px" }} />
              <p>{organisation.address}</p>
            </div>
          </div>
        ))
      ) : (
        <p className={styles.notfound}>
          Вы не являетесь участником какой-либо организации или её владельцем.
        </p>
      )}
    </div>
  );
};

export default OrganisationsList;

import React, { FC } from 'react'
import LocationOnOutlinedIcon from '@mui/icons-material/LocationOnOutlined';
import Image from 'next/image'
import styles from './OrganistaionsList.module.css'
import { gql, useQuery } from '@apollo/client';
import { useRouter } from 'next/router';
import { useSelector } from 'react-redux';
import { RootState } from "@/redux/store";

const OrganisationsList:FC = () => {
  const token = useSelector((state: RootState) => state.token.token);
  const router = useRouter()
  const navToOrganisation = (organisationId: string) =>{
    router.push(`/user/organisations/${organisationId}`);
  }

  const getOrganization = gql`
  query getOrganization{
    getOrganization {
      id
      name
      orgn
      kpp
      inn
      ownerId
      createdAt
      updatedAt
   }
  } 
`
  const { loading, error, data } = useQuery(getOrganization, {
    context: {
      headers: {
        Authorization: `Bearer ${token}`
      },
    }
  });
  const organisations = data?.getOrganization ? data?.getOrganization : null;
  return (

    <div className={styles.orgs}>
        {organisations && Array.isArray(organisations) && organisations.length > 0 ? (
    organisations.map((organisation: any) => (
      <div className={styles.org__item} key={organisation.id} onClick={() => navToOrganisation(organisation.id)}>
        <h3>{organisation.name}</h3>
        <Image src={''} alt={''} />
        <div className={styles.address}>
          <LocationOnOutlinedIcon style={{fontSize:'10px'}}/>
          <p>Address...</p>
        </div>
      </div>
    ))
  ) : organisations && !Array.isArray(organisations) ? (
    <div className={styles.org__item} key={organisations.id} onClick={() => navToOrganisation(organisations.id)}>
      <h3>{organisations.name}</h3>
      <Image src={''} alt={''} />
      <div className={styles.address}>
        <LocationOnOutlinedIcon style={{fontSize:'10px'}}/>
        <p>Address...</p>
      </div>
    </div>
  ) : (
    <p className={styles.notfound}>Вы не являетесь участником какой-либо организации
    или её владельцем.</p>
  )}
    </div>
  )
}

export default OrganisationsList;
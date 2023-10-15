import Footer from '@/components/Blocks/Footer/Footer';
import UserHeader from '@/components/Blocks/Header/UserHeader/UserHeader';
import UserMain from '@/components/Blocks/Main/UserMain/UserMain';
import UserContainer from '@/components/Containers/UserContainer/UserContainer';
import { useRouter } from 'next/router';
import React, { useEffect } from 'react'
import styles from './../../../styles/titles.module.css'
import { gql, useQuery } from '@apollo/client';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '@/redux/store';
import { NextPage } from 'next';
import SwitchButtons from '@/components/UI/Buttons/SwitchButtons/SwitchButtons';
import UsersTable from '@/components/Blocks/elements/UsersTable/UsersTable';
import { setToken } from '@/redux/tokenSlice';

interface orgPageProps{
  token:string
}

const OrganisationPage:NextPage<orgPageProps> = ({token}) => {
  const dispatch = useDispatch()
  let status:string;
  useEffect(() => {
    const token = localStorage.getItem('token')
    if (token){
      dispatch(setToken(token))
      status = 'authenticated'
    } else {
      status = 'unauthenticated'
    }
    if (status === 'unauthenticated'){
      router.push('/login')
    }
  }, [])



    const active = useSelector((state:RootState) => state.active.active)
    const router = useRouter();
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
    <>
    <UserContainer>
        <UserHeader />
        <UserMain> 

            <h2 className={styles.name}> {loading ? (
          'Загрузка...'
        ) : error ? (
          `Ошибка! ${error.message}`
        ) : organisations ? (
          organisations.name
        ) : (
          "Организация не найдена")}
          </h2>
          <SwitchButtons />
          {active === 'people' ? <UsersTable token={token}/> : <div>Список акций....</div>}
        </UserMain>
    </UserContainer>
    <Footer />
    </>
  )
}

export default OrganisationPage
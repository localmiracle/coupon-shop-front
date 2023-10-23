import Footer from '@/components/Blocks/Footer/Footer'
import UserHeader from '@/components/Blocks/Header/UserHeader/UserHeader'
import UserMain from '@/components/Blocks/Main/UserMain/UserMain'
import UserContainer from '@/components/Containers/UserContainer/UserContainer'
import React, { useEffect } from 'react'
import styles from './../../styles/titles.module.css'
import { NextPage } from 'next'
import SubList from '@/components/Blocks/elements/Subs/SubList'
import { useDispatch, useSelector } from 'react-redux'
import { useQuery } from '@apollo/client'
import { GET_SUBSCRIPTIONS } from '@/utils/graphql/query/queries'
import { setToken } from '@/redux/tokenSlice'
import { useRouter } from 'next/router'
import Head from 'next/head'

const subscription:NextPage = () => {
  const router = useRouter()
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


  return (
    <>
    <Head>
      <link rel="icon" href="/Frame 22.png" />
    </Head>
    <UserContainer>
        <UserHeader />
        <UserMain> 
            <h2 className={styles.name}>Купить подписку</h2>
            <SubList />
        </UserMain>
    </UserContainer>
    <Footer />
    </>
  )
}

export default subscription
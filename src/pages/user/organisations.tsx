import Footer from '@/components/Blocks/Footer/Footer'
import UserHeader from '@/components/Blocks/Header/UserHeader/UserHeader'
import UserMain from '@/components/Blocks/Main/UserMain/UserMain'
import Organisations from '@/components/Blocks/elements/Organisations/Organisations'
import UserContainer from '@/components/Containers/UserContainer/UserContainer'
import { NextPage } from 'next'
import React, { useEffect } from 'react'
import styles from './../../styles/titles.module.css'
import { RootState } from '@/redux/store'
import { useDispatch, useSelector } from 'react-redux'
import { setToken } from '@/redux/tokenSlice'
import { useRouter } from 'next/router'
import Head from 'next/head'

interface orgPageProps{
  token: string;
}

const organisations:NextPage<orgPageProps> = ({token}) => {
  const dispatch = useDispatch()
  const router = useRouter()
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
  const jwt = token;
  return (
    <>
    <Head>
      <link rel="icon" href="/Frame 22.png" />
    </Head>
    <UserContainer>
        <UserHeader />
        <UserMain> 
            <h2 className={styles.name}>Мои организации</h2>
            <Organisations token={jwt} />
        </UserMain>
    </UserContainer>
    <Footer />
    </>
  )
}

export default organisations
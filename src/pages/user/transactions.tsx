import Footer from '@/components/Blocks/Footer/Footer'
import UserHeader from '@/components/Blocks/Header/UserHeader/UserHeader'
import UserMain from '@/components/Blocks/Main/UserMain/UserMain'
import Table from '@/components/Blocks/elements/TransactionsTable/Table'
import UserContainer from '@/components/Containers/UserContainer/UserContainer'
import { NextPage } from 'next'
import React, { useEffect } from 'react'
import styles from './../../styles/titles.module.css'
import { useDispatch, useSelector } from 'react-redux'
import { RootState } from '@/redux/store'
import { setToken } from '@/redux/tokenSlice'
import { useRouter } from 'next/router'
import Head from 'next/head'



const Transactions:NextPage = ({}) => {
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
  return (
    <>
    <Head>
      <link rel="icon" href="/Frame 22.png" />
    </Head>
    <UserContainer>
        <UserHeader />
        <UserMain> 
            <h2 className={styles.name}>Транзакции</h2>
            <Table/>
        </UserMain>
    </UserContainer>
    <Footer />
    </>
  )
}

export default Transactions
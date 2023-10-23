import Footer from '@/components/Blocks/Footer/Footer';
import HomeHeader from '@/components/Blocks/Header/HomeHeader/HomeHeaderElements/HomeHeader';
import HomeMain from '@/components/Blocks/Main/HomeMain/HomeMain';
import HomeContainer from '@/components/Containers/HomeContainer/HomeContainer';
import { NextPage } from 'next'

import Head from 'next/head';
import React, { useEffect, useState } from 'react'

const HomePage:NextPage = () => {
  const [token, setToken] = useState<string | null>('')
  const [productList, setProductList] = useState<any>(null) 
  useEffect(() => {
    const systemToken = localStorage.getItem('token')
    setToken(systemToken)
     const getCoupons = async() => {
      const response = await fetch('http://parcus.shop/api/coupons/standard', 
      {
               
      })
      const data = await response.json()
      setProductList(data)

    }
    getCoupons()
  }, [])
  
  
 
   
      
  
  return (
    <div style={{display: 'flex', flexDirection: 'column', justifyContent: 'space-between'}}>
        <Head>
            <title>Parcus | Главная</title>
            <meta name="description" content="ShopSmart - твоё интернет хранилище подписок" />
            <link rel="icon" href="/Frame 22.png" />
        </Head>
        
        <HomeHeader />
        <HomeContainer >
            <HomeMain productList={productList}/> 
        </HomeContainer>
        <Footer />

  </div>
  )
}

export default HomePage;   
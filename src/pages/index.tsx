import Footer from '@/components/Blocks/Footer/Footer';
import HomeHeader from '@/components/Blocks/Header/HomeHeader/HomeHeaderElements/HomeHeader';
import HomeMain from '@/components/Blocks/Main/HomeMain/HomeMain';
import HomeContainer from '@/components/Containers/HomeContainer/HomeContainer';
import { NextPage } from 'next'

import Head from 'next/head';
import React from 'react'

const HomePage:NextPage = () => {
  return (
    <>
        <Head>
            <title>ShopSmart | Главная</title>
            <meta name="description" content="ShopSmart - твоё интернет хранилище подписок" />
            <link rel="icon" href="/testIcon.png" />
        </Head>
        <HomeHeader />
        <HomeContainer>
            
            
            <HomeMain /> 
        </HomeContainer>
        <Footer />
    </>
  )
}

export default HomePage;   
import LoginContainer from '@/components/Containers/LoginContainer/LoginContainer'
import FormLogin from '@/components/UI/Forms/FormLogin/FormLogin'
import { NextPage } from 'next'

import Head from 'next/head'

import React from 'react'

const login:NextPage = () => {
  return (
    <>
      <Head>
        <link rel="icon" href="/testIcon.png" />
      </Head>
      <LoginContainer >
        <FormLogin />
      </LoginContainer>
    </>
  )
}

export default login
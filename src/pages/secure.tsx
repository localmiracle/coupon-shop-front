import Coupons from '@/components/Blocks/elements/Admin/Coupons/Coupons'
import Panel from '@/components/Blocks/elements/Admin/Panel/Panel'
import AdminContainer from '@/components/Containers/AdminContainer/AdminContainer'
import AdminForm from '@/components/UI/Forms/AdminForm/AdminForm'
import Subscriptions  from '@/components/Blocks/elements/Admin/Subscriptions/Subscriptions'
import { NextPage } from 'next'
import React, { useEffect, useState } from 'react'
import Organisations from '@/components/Blocks/elements/Admin/Organisations/Organisations'
import Head from 'next/head'
import axios from 'axios'
import { API_URL } from '@/http'




const adminPage:NextPage = () => {
  const [status, setStatus] = useState<boolean>(false)
  const [token, setToken] = useState<string  | null>(null)
  const refreshData = async ()=>{

  }
  const IsAuth = async() =>{
    try{
      const response = await axios.get(`${API_URL}/auth/refresh`,{withCredentials:true})
      console.log(response);
      localStorage.setItem('admitToken', response.data.accessToken)
      setStatus(true)
    } catch(e:any){
      console.log(e.response?.data?.message);
    }
  }
  // useEffect(()=>{
  //   const time = localStorage.getItem('time')
  //   const currentTime = Math.floor(Date.now()/1000)
  //   if (time){
  //     if (currentTime > parseInt(time)){
  //       IsAuth()
  //     }
  //   }
    
  // },[])
  useEffect(()=>{
    const adminToken = localStorage.getItem('adminToken')
        if (adminToken){
          IsAuth()
          setStatus(true)
          setToken(localStorage.getItem('adminToken'))
        } else {
          setStatus(false)
        }
  },[])
    
  
    const handleSignOut = () =>{
      localStorage.removeItem('adminToken')
      location.reload()
    }
  return (
    <>
      <Head>
        <title>Parcus | Администратор</title>
        <link rel="icon" href="/Frame 22.png" />
      </Head>
      <AdminContainer>
        {status ? 
          <>
            <button type='button' onClick={handleSignOut}>Выйти</button>
            <Panel>
              <Coupons token={token}></Coupons>
              <Subscriptions token={token}/>
              <Organisations token={token}/>
            </Panel>
          </>
        :
          <AdminForm />
        }
        
      </AdminContainer>
    </>
  )
}

export default adminPage
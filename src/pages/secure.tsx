import Coupons from '@/components/Blocks/elements/Admin/Coupons/Coupons'
import Panel from '@/components/Blocks/elements/Admin/Panel/Panel'
import AdminContainer from '@/components/Containers/AdminContainer/AdminContainer'
import AdminForm from '@/components/UI/Forms/AdminForm/AdminForm'
import Subscriptions  from '@/components/Blocks/elements/Admin/Subscriptions/Subscriptions'
import { NextPage } from 'next'
import React, { useEffect, useState } from 'react'


const adminPage:NextPage = () => {
  const [status, setStatus] = useState<boolean>(false)
  const [token, setToken] = useState<string  | null>(null)
  const refreshData = async ()=>{

  }
  useEffect(()=>{
    const time = localStorage.getItem('time')
    const currentTime = Math.floor(Date.now()/1000)
    if (time){
      if (currentTime > parseInt(time)){
        
      }
    }
    
  },[])
  useEffect(()=>{
    const adminToken = localStorage.getItem('adminToken')
        if (adminToken){
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
    <AdminContainer>
      {status ? 
        <>
          <button type='button' onClick={handleSignOut}>Выйти</button>
          <Panel>
            <Coupons token={token}></Coupons>
            <Subscriptions token={token}/>
          </Panel>
        </>
       :
        <AdminForm />
      }
       
    </AdminContainer>
  )
}

export default adminPage
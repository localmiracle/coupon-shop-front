import AddCoupons from '@/components/Blocks/elements/Admin/Coupons/AddCoupons/AddCoupons'
import Coupons from '@/components/Blocks/elements/Admin/Coupons/Coupons'
import Panel from '@/components/Blocks/elements/Admin/Panel/Panel'
import Subcriptions from '@/components/Blocks/elements/Admin/Subscriptions/Subcriptions'
import AdminContainer from '@/components/Containers/AdminContainer/AdminContainer'
import AdminForm from '@/components/UI/Forms/AdminForm/AdminForm'
import { NextPage } from 'next'
import React, { useEffect, useState } from 'react'


const adminPage:NextPage = () => {
  const [status, setStatus] = useState<boolean>(false)
  const [token, setToken] = useState<string  | null>(null)
  
  useEffect(()=>{
     const adminToken = localStorage.getItem('adminToken')
    if (adminToken){
      setStatus(true)
      setToken(localStorage.getItem('adminToken'))
    } else {
      setStatus(false)
    }
  }, [])
    const handleSignOut = () =>{
      localStorage.clear()
      location.reload()
    }
  return (
    <AdminContainer>
      {status ? 
        <>
          <button type='button' onClick={handleSignOut}>Выйти</button>
          <Panel>
            <Coupons token={token}></Coupons>
            <Subcriptions token={token}/>
          </Panel>
        </>
       :
        <AdminForm />
      }
       
    </AdminContainer>
  )
}

export default adminPage
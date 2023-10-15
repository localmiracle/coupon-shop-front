import Coupons from '@/components/Blocks/elements/Admin/Coupons/Coupons'
import Panel from '@/components/Blocks/elements/Admin/Panel/Panel'
import AdminContainer from '@/components/Containers/AdminContainer/AdminContainer'
import AdminForm from '@/components/UI/Forms/AdminForm/AdminForm'
import Form from '@/components/UI/Forms/Forms/Form'
import { NextPage } from 'next'
import React, { useEffect, useState } from 'react'


const adminPage:NextPage = () => {
  const [status, setStatus] = useState<boolean>(false)
  useEffect(()=>{
    const token = localStorage.getItem('adminToken')
    if (token){
      setStatus(true)
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
            <Coupons></Coupons>  
          </Panel>
        </>


       : <AdminForm />}
       
    </AdminContainer>
  )
}

export default adminPage
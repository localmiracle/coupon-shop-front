import React, { FC, useEffect, useState } from 'react'
import SubForm from './SubscriptionForm/SubForm';
import SubList from './SubList/SubList';

interface SubProps{
    token: string | null;
}

const Subscriptions:FC<SubProps> = ({token}) => {
    const [subs, setSubs] = useState<any>([])
    const [isDeleted, setIsDeleted] = useState<boolean>(false)
    const [isEdited, setIsEdited] = useState<boolean>(false)
    useEffect(() => {
       const getSubscriptions = async() => {
        
        const response = await fetch('http://parcus.shop/admin/subscription',
        {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`,
            },
        
            
        })
        const data = await response.json()
        setSubs(data)
        }
        getSubscriptions()
    }, [isEdited, isDeleted])
    
    
   
  return (
    <div>
        <h4>Создать подписку</h4>
        <SubForm token={token}/>
        <h4>Подписки</h4>
        {/* <button onClick={getSubscriptions}>test</button> */}
        <SubList subs={subs} setIsDeleted={setIsDeleted} setIsEdited={setIsEdited}/>
    </div>
  )
}

export default Subscriptions
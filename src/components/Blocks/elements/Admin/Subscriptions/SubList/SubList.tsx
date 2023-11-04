import React, { FC, useEffect, useState } from 'react'
import styles from './SubList.module.css'
import SubLevel1 from '../../../SubLevel1/SubLevel1';
import SubLevel2 from '../../../SubLevel2/SubLevel2';
import SubLevel3 from '../../../SubLevel3/SubLevel3';
import Modal from '@/components/UI/Modals/Modal';
import SubForm from '../SubscriptionForm/SubForm';
import EditForm from '../EditForm/EditForm';
interface SubListProps{
    subs: any;
    setIsDeleted: any;
    setIsEdited: any
}

const SubList:FC<SubListProps> = ({subs, setIsDeleted, setIsEdited }) => {
    const [isAdmin, setIsAdmin] = useState<boolean>(false)
    const [adminToken, setAdminToken] = useState<string>('')
    const [isEdit, setIsEdit] = useState<boolean>(false)
    const [isDelete, setIsDelete] = useState<boolean>(false)
    const [subId, setSubId] = useState<string>('')
    const [success, setSuccess] = useState<string>('')
    const [isAdded, setIsAdded] = useState<boolean>(false)
    const [data, setData] = useState<any>()
    useEffect(() => {
      const token = localStorage.getItem('adminToken')
      if (token){
        setIsAdmin(true)
        setAdminToken(token)
      } else {
        setIsAdmin(false)
      }
    }, [])
    const handleDeleteOpen = (subId:any) =>{
        setSubId(subId)
        setIsDelete(true)
    }
    const handleDeleteSub = async(subId:any) => {
        const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}:${process.env.NEXT_PUBLIC_API_PORT_ADMIN}/admin/subscription/${subId}`,
        {
            method: "DELETE",
            headers: {
            "Content-Type": "application/json",
             Authorization: `Bearer ${adminToken}`,
            }, 
          }
        )
        setSuccess('Подписка удалена')
        setTimeout(() => {  
            setIsDelete(!isDelete)
            setSuccess('')
            setSubId('')
            setIsDeleted(true)
          }, 3000);
          setTimeout(() => {
            setIsDeleted(false)
          }, 4000);
    }

    

    const handleEditOpen = async(subId:any) =>{
        setSubId(subId)
        setIsEdit(true)
    }
  const subscribes = subs
  return (
    <div>
        {Array.isArray(subscribes)? subscribes.map((subscribe:any)=>{
            if(subscribe.level === 1){
                return(<SubLevel1
                handleEditSub={(subId:any)=>handleEditOpen(subscribe.id)}
                handleDeleteSub={(subId:any)=>handleDeleteOpen(subscribe.id)} 
                key={subscribe.id}
                id={subscribe.id}
                name={subscribe.name}
                description={subscribe.description}
                price={subscribe.price}
                isAdmin={isAdmin} />)
            }
            if (subscribe.level === 2){
               return( <SubLevel2
                handleEditSub={(subId:any)=>handleEditOpen(subscribe.id)} 
                handleDeleteSub={(subId:any)=>handleDeleteOpen(subscribe.id)}
                id={subscribe.id}
                key={subscribe.id}
                name={subscribe.name}
                description={subscribe.description}
                price={subscribe.price}
                isAdmin={isAdmin}
                />)
            }
            if (subscribe.level === 3){
               return( <SubLevel3
                handleEditSub={(subId:any)=>handleEditOpen(subscribe.id)}
                handleDeleteSub={(subId:any)=>handleDeleteOpen(subscribe.id)} 
                id={subscribe.id}
                key={subscribe.id}
                name={subscribe.name}
                description={subscribe.description}
                price={subscribe.price}
                isAdmin={isAdmin}
                />)
            }
        }) : <div>Подписки не найдены</div>}
        {isEdit? 
        <Modal modalOpen={isEdit} setModalOpen={setIsEdit}>
            <EditForm subId={subId} 
            setIsEdit={setIsEdit} 
            setIsEdited={setIsEdited} 
            token={adminToken} data={subs}/>
        </Modal> 
        : 
        null
        }
        {isDelete? 
            <Modal modalOpen={isDelete} setModalOpen={setIsDelete}>
                    <div style={{background: 'white', padding: '15px'}}>
                    <h4>Вы уверены, что хотите удалить товар ${subId}?</h4>
                    {success? <p style={{color: 'green'}}>{success}</p> : null}
                    <button style={{background:'red'}} onClick={()=>handleDeleteSub(subId)}>Удалить</button>
                    <button onClick={()=>setIsDelete(!isDelete)}>Отмена</button>
          </div>
            </Modal>
            : 
            null
        }
    </div>
  )
}

export default SubList
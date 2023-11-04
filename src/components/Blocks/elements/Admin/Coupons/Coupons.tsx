import React, { FC, useEffect, useState } from 'react'
import ProductList from '../../ProductList/ProductList'
import AddCoupons from './AddCoupons/AddCoupons';
import styles from './Coupons.module.css'
import Modal from '@/components/UI/Modals/Modal';
import CouponForm from './CouponForm/CouponForm';

interface CouponProps{
    token: string | null;
}

const Coupons:FC<CouponProps> = ({token}) => {
    const [newProductList, setNewProductList] = useState<[] | undefined>([]) 
    const [open, setOpen] = useState<boolean>(false)
    const [id, setId] = useState<string>('')
    const [success, setSuccess] = useState<string>('')
    const [isEdit, setIsEdit] = useState<boolean>(false)
    const [isAdded, setIsAdded] = useState<boolean>(false)
    const [isDeleted, setIsDeleted] = useState<boolean>(false)
    const [isEdited, setIsEdited] = useState<boolean>(false)
    useEffect(() => {
      const getCoupons = async() => {
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}:${process.env.NEXT_PUBLIC_API_PORT_ADMIN}/admin/coupon`, 
      {
        
          method: "GET",
          headers: {
          "Content-Type": "application/json",
           Authorization: `Bearer ${token}`,
          },        
      })
      const data = await response.json()
      // В Data мы получаем массив объектов, у которых в первом поле идет ссылка, на которую 
      //необходимо отправить запрос для получения картинки 
      setNewProductList(data)
      }
      getCoupons();
    }, [isAdded,isDeleted,isEdited])
    
    const handleEditOpen = async (productId: any) => {
      setIsEdit(true)
      setId(productId)
    };

    const handleDeleteOpen = async (productId: any) => {
        setOpen(true)
        setId(productId)
    };
    const handleDeleteProduct = async (productId: any) => {
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}:${process.env.NEXT_PUBLIC_API_PORT_ADMIN}/admin/coupon/${productId}`,
      {
        method: "DELETE",
        headers: {
        "Content-Type": "application/json",
         Authorization: `Bearer ${token}`,
        }, 
      }
      )
      setSuccess('Товар успешно удален')
      setTimeout(() => {  
        setOpen(!open)
        setSuccess('')
        setId('')
        setIsDeleted(true)
      }, 3000);
      setTimeout(() => {
        setIsDeleted(false)
      }, 4000);
  };
    
  
    return (
      <div className={styles.coupons}>
        <h2 style={{textAlign: 'center'}}>Coupons</h2>
        <AddCoupons token={token} setIsAdded={setIsAdded}/>
        <h2>Все товары:</h2>
        { open ? 
        <Modal modalOpen={open} setModalOpen={setOpen}>
          <div style={{background: 'white', padding: '15px'}}>
            <h4>Вы уверены, что хотите удалить товар ${id}?</h4>
            {success? <p style={{color: 'green'}}>{success}</p> : null}
            <button style={{background:'red'}} onClick={()=>handleDeleteProduct(id)}>Удалить</button>
            <button onClick={()=>setOpen(!open)}>Отмена</button>
          </div>
          </Modal> 
          : null }
        {
          isEdit?
          <Modal modalOpen={isEdit} setModalOpen={()=>isEdit}>
           <CouponForm token={token} coupon={id} 
           data={newProductList} setIsEdit={setIsEdit} setIsEdited={setIsEdited} />
          </Modal>
          : null
        }
        <ProductList 
        productList={newProductList} 
        handleDeleteProduct={(productId:any)=>handleDeleteOpen(productId)}
        handleEditProduct={(productId:any)=>handleEditOpen(productId)}
        />
      </div>
    );
  };
  
export default Coupons

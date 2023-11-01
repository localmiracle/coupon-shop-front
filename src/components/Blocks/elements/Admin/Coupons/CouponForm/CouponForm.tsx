import React, { useState, useEffect, FC } from "react";
import styles from './CouponForm.module.css'
import CloseIcon from '@mui/icons-material/Close';

interface CouponFormProps{
    token:any;
    coupon: any;
    data: any;
    setIsEdit: any;
    setIsEdited: any;
}

const CouponForm:FC<CouponFormProps> =({ token, coupon, data, setIsEdit,setIsEdited }) =>{
  
  const [name, setName] = useState<string>('')
  const [description, setDescription] = useState<string>('')
  const [price, setPrice] = useState<string>('')
  const [level, setLevel] = useState<string>('')
  const [newName, setNewName] = useState<string>('')
  const [newDescription, setNewDescription] = useState<string>('')
  const [newPrice, setNewPrice] = useState<string>('')
  const [newLevel, setNewLevel] = useState<string>('')
  const [success, setSuccess] = useState<string>('')
  useEffect(() => {
    for (let i = 0; i < data.length; i++){
      if (data[i].id === coupon){
        console.log(data[i])
        setName(data[i].name)
        setDescription(data[i].description)
        setPrice(data[i].price)
        setLevel(data[i].level)
      } else {
        continue
      }
    }
    
  }, [])

  const handleChangeName = (e:any) =>{
    setNewName(e.target.value)
  }
  const handleChangeDescription = (e:any) =>{
    setNewDescription(e.target.value)
  }
  const handleChangeLevel = (e:any) =>{
    setNewLevel(e.target.value)
  }
  const handleChangePrice = (e:any) =>{
    setNewPrice(e.target.value)
  }

  const changeData = async (e:any) => {
    e.preventDefault()
    const dataName = newName? newName : name;
    const dataDescription = newDescription? newDescription : description;
    const dataPrice = newPrice? parseInt(newPrice,10) : parseInt(price,10);
    const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/admin/coupon/${coupon}`,
    {
      method: "PUT",
      headers: {
      "Content-Type": "application/json",
       Authorization: `Bearer ${token}`,
      }, 
      body: JSON.stringify({
        name: dataName,
        description: dataDescription,
        price: dataPrice,
      })
    })
    setSuccess('Изменения применены!')
    const res = response.json()
    setTimeout(() => {
      setIsEdited(true)
      setIsEdit(false)
    }, 3000);
    setTimeout(() => {
      setIsEdited(false)
      setSuccess('')
    }, 4000);
  }
  
  return (
    <form className={styles.editForm}>
        <CloseIcon style={{color: 'red', cursor: 'pointer', fontSize: '30px'}} onClick={()=>setIsEdit(false)}/>
        <div className={styles.formwrapper}>
            <h3>Выбранный купон:</h3>
            <p>Наименование: {name}</p>
            <input type="text" 
            placeholder="Изменить наименование.."
            value={newName}
            onChange={handleChangeName}/>
            <p>Описание:{description}</p>
            <input type="text" 
            placeholder="Изменить описание.."
            value={newDescription}
            onChange={handleChangeDescription}/>
            <p>Цена:{price}</p>
            <input type="text" 
            placeholder="Изменить цену.."
            value={newPrice}
            onChange={handleChangePrice}/>
           
            {success ? <p style={{color: 'green'}}>{success}</p> : null}
            <button onClick={changeData}>Изменить</button>
            
        </div>
    </form>
  );
}

export default CouponForm;
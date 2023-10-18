import React, { FC, useState } from 'react'
import styles from './addcoupouns.module.css'

interface AddCouponsProps{
    token: string | null;
    setIsAdded: any;
}


const AddCoupons:FC<AddCouponsProps> = ({token, setIsAdded}) => {
    const [image, setImage] = useState<File | null>(null)
    const [value, setValue] = useState<string>('')
    const [success, setSuccess] = useState<string>('')
    const [description, SetDescription] = useState<string>('')
    const [level, setLevel] = useState<string>('')
    const [price, setPrice] = useState<string>('')
    const handleChangeValue = (e:any) =>{
        setValue(e.target.value)
    }  
    const handleChangeDescription = (e:any) => {
        SetDescription(e.target.value)
    }
    const handleChangeLevel = (e:any) =>{
        setLevel(e.target.value)
    }
    const handleChangePrice = (e:any) =>{
        setPrice(e.target.value)
    }
    const handleImageChange = (e: any) => {
        if (e.target.files && e.target.files.length > 0) {
          const file = e.target.files[0];
          setImage(file);
        }
    };
    const createCoupon = async(e: React.FormEvent) => {
        e.preventDefault();
        const formData = new FormData();
        if(image){
            formData.append("file", image);
        }
        formData.append("name", value);
        formData.append("description", description);
        formData.append("price", price);
        formData.append("level", level);
        const response = await fetch('http://parcus.shop/admin/coupon',
        {
            method: "POST",
            headers: {
             Authorization: `Bearer ${token}`,
            },
            body: formData
        }
        )
        setValue('')
        SetDescription('')
        setPrice('')
        setLevel('')
        setImage(null)
        setSuccess('Товар успешно добавлен!')
        setTimeout(() => {
            setSuccess('')
            setIsAdded(true)
        }, 3000);
        setTimeout(() => {
            setIsAdded(false)
        }, 4000);
    }


  return (
    <form action="" className={styles.formadd}>
        <h2>Создание купона</h2>
        <h4>Прикрепите фотографию</h4>
        <input type="file" name="photo" accept="image/*" onChange={handleImageChange}></input>
        <h4>Введите название</h4>
        <input type="text" value={value} onChange={handleChangeValue}/>
        <h4>Введите описание</h4>
        <input type="text" value={description} onChange={handleChangeDescription}/>
        <h4>Укажите уровень купона</h4>
        <input type="text" value={level} onChange={handleChangeLevel}/>
        <h4>Укажите цену</h4>
        <input type="text" value={price} onChange={handleChangePrice}/>
        {success? <p style={{color: 'green'}}>{success}</p> : null}
        <button onClick={createCoupon}>Создать</button>
    </form>
  )
}

export default AddCoupons
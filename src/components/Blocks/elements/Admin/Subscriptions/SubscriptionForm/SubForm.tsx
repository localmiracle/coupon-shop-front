import React, { FC, useState } from 'react'
import styles from './Sub.module.css'
interface SubFormProps{
    token: string | null;
}

const SubForm:FC<SubFormProps> = ({token}) => {
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
     const createSubcription = async(e: React.FormEvent) => {
        e.preventDefault();
        const dataLevel = parseInt(level, 10)
        const dataPrice = parseInt(price, 10);
        
        const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/admin/subscription`,
        {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`,
            },
            body: JSON.stringify({
                name: value,
                description: description,
                price: dataPrice,
                level: dataLevel
            })
            
        })
        setValue('')
        SetDescription('')
        setPrice('')
        setLevel('')
        setSuccess('Подписка успешно добавлена!')
        setTimeout(() => {
            setSuccess('')
        }, 3000);
    }
  return (
    <form action="" className={styles.formsub}>
            <p>Введите название</p>
            <input type="text" value={value} onChange={handleChangeValue}/>
            <p>Введите описание</p>
            <input type="text" value={description} onChange={handleChangeDescription}/>
            <p>Укажите цену</p>
            <input type="text" value={price} onChange={handleChangePrice}/>
            <p>Укажите уровень подписки</p>
            <input type="text" value={level} onChange={handleChangeLevel}/>
            {success ? <p style={{color:'green'}}>{success}</p> : null}
            <button onClick={createSubcription}>Создать подписку</button>
    </form>
  )
}

export default SubForm
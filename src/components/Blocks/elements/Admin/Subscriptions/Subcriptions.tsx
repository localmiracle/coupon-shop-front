import React, { FC, useState } from 'react'

interface SubProps{
    token: string | null;
}

const Subcriptions:FC<SubProps> = ({token}) => {
    
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
    
    const createCoupon = async(e: React.FormEvent) => {
        e.preventDefault();
        const response = await fetch('http://parcus.shop/admin/subscription',
        {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`,
            },
            body: JSON.stringify({
                name: value,
                description: description,
                price: price,
                level: level
            })
            
        }
        )
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
    <div>
        <h3>Подписки</h3>
        <h4>Создать подписку</h4>
        <form action="">
            <p>Введите название</p>
            <input type="text" value={value} onChange={handleChangeValue}/>
            <p>Введите описание</p>
            <input type="text" />
            <p>Укажите цену</p>
            <input type="text" />
            <p>Укажите уровень подписки</p>
            <input type="text" />
        </form>
    </div>
  )
}

export default Subcriptions
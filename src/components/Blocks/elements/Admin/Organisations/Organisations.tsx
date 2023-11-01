import React, { FC, useEffect, useState } from 'react'
import styles from './Organisations.module.css'

interface OrganisationsProps{
    token: string | null
}


const Organisations:FC<OrganisationsProps> = ({token}) => {
    const [value, setValue] = useState<string>('')
    const [name, setName] = useState<string>('')
    const [email, setEmail] = useState<string>('')
    const [level, setLevel] = useState<string>('')
    const [success, setSuccess] = useState<string>('')
    const [orgs, setOrgs] = useState<any>()
    const [show, setShow] = useState<boolean>(false)
    const [orgById, setOrgById] = useState<any>()
    useEffect(() => {
      const getOrgsList = async () =>{
        const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/admin/organization`,{
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${token}`
            },

        })
        const res = await response.json()
        setOrgs(Array.from(res))
        
      }
      getOrgsList()
      
    }, [])
    

    const handleChangeValue = (e:any)=>{
        setValue(e.target.value)
    }
    const handleChangeName = (e:any)=>{
        setName(e.target.value)
    }
    const handleChangeEmail = (e:any)=>{
        setEmail(e.target.value)
    }
    const handleChangeLevel = (e:any)=>{
        setLevel(e.target.value)
    }

    const createOrganization = async(e:any) =>{
        e.preventDefault()
        const dataLevel = parseInt(level,10)
        const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/admin/organization`,
        {
            method: "POST",
              headers: {
                "Content-Type": "application/json",
                'Authorization': `Bearer ${token}`
              },
              body: JSON.stringify({
                name: name,
                email_admin: email,
                levelSubscription: dataLevel,
               }),
        })
        const res = await response.json()
        setSuccess('Организация успешно создана!')
        setTimeout(() => {
            setEmail('')
            setLevel('')
            setName('')
            setSuccess('')
        }, 4000);
        
    }

    const showList = ()=>{
        setShow(!show)
    }

    const getOrganisationById = async() =>{
        const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/admin/organization/${value}`,
            {
                method: "GET",
                  headers: {
                    "Content-Type": "application/json",
                    'Authorization': `Bearer ${token}`
                  },
            })
        const res = await response.json()
        setOrgById(res)
        setValue('')
    }
  return (
    <div>
        <h2>Организации</h2>
        <p>Создать организацию</p>
        <form action="" className={styles.form}>
            <p>Введите название организации</p>
            <input type="text" value={name} onChange={handleChangeName}/>
            <p>Введите электронную почту администратора</p>
            <input type="email" value={email} onChange={handleChangeEmail}/>
            <p>Введите уровень подписки</p>
            <input type="text" value={level} onChange={handleChangeLevel}/>
            {success ? <p style={{color: 'green'}}>{success}</p> : null}
            <button type='button' onClick={createOrganization}>Создать организацию</button>
        </form>
        <h2>Список организаций</h2>
        <button onClick={showList}>Посмотреть</button> 
        {show? orgs.map((org:any)=>{
            return(
            <div key={org.id} className={styles.orgs}>
                <h3>{org.name}</h3>
                <h4>{org.id}</h4>
            </div>)
        }) : <p>Организации не найдены</p>}

        <p>Найти организацию</p>
        <input style={{padding: '10px', borderRadius: '10px'}} 
        type="text" value={value} onChange={handleChangeValue} 
        placeholder='Введите Id организации'/>
        <button onClick={getOrganisationById}>Найти</button>
        {
            orgById? 
            <form action="">
                <h2>{orgById.name}</h2>
                <p>Изменить название</p>
                <input type="text" name="" id="" />
                <h3></h3>
            </form>
            : null
        }
    </div>
  )
}

export default Organisations
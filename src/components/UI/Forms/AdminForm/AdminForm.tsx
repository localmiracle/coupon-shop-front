import React, { useState } from 'react'
import styles from './AdminForm.module.css'
import Input from '../../Inputs/Input'
import { useRouter } from 'next/router'

const AdminForm = () => {
    const [adminToken, setAdminToken] = useState<string>('') 

    const [login,setLogin] = useState<string>('')
    const [password,setPassword] = useState<string>('')
    const handleLogin = (e:any) =>{
        setLogin(e.target.value)
    }
    const handlePassword = (e:any) =>{
        setPassword(e.target.value)
    } 
    const authAdmin = async(e:React.FormEvent) =>{ 
        e.preventDefault()
        try {
          const response = await fetch(
            "http://95.163.228.158/admin/auth/sing-in",
            {
              method: "POST",
              headers: {
                "Content-Type": "application/json",
              },
              body: JSON.stringify({ login: login, password: password }),
            },
          );
          const data = await response.json()
          if (data){
            localStorage.setItem('adminToken', data.access_token)
            setAdminToken(data.access_token)
          }
        } catch(error) {
          console.error(error)
        } 
        setTimeout(() => {
          location.reload()
        }, 5000);
        
    }
  return (
    <>
    <div className={styles.admin}>
        <form action="">
            <div>
                <h2 style={{textAlign: 'center'}}>Вход</h2>
                <Input type='text' value={login} onChange={handleLogin}/>
                <Input type='text' value={password} onChange={handlePassword}/>
                {adminToken ? <p style={{color: 'green'}}>Успешный вход...</p> : null}
                <button onClick={authAdmin} 
                >Войти</button>
            </div>
            
        </form>
    </div>
    </>
  )
}

export default AdminForm
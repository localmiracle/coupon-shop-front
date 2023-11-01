import React, { useState } from 'react'
import styles from './AdminForm.module.css'
import Input from '../../Inputs/Input'
const jwt = require('jsonwebtoken');

const AdminForm = () => {
    
    const [adminToken, setAdminToken] = useState<string>('') 
    const [error, setError] = useState<string>('')
    const [login,setLogin] = useState<string>('')
    const [password,setPassword] = useState<string>('')
    const handleLogin = (e:any) =>{
        setLogin(e.target.value)
    }
    const handlePassword = (e:any) =>{
        setPassword(e.target.value)
    } 
    function getTokenExpiration(token:any) {
      try {
        const decodedToken = jwt.decode(token);
        const expirationTime = decodedToken ? decodedToken.exp : null;
        return expirationTime;
      } catch (error) {
        console.error('Ошибка при получении времени жизни токена:', );
        return null;
      }
    }
    const authAdmin = async(e:React.FormEvent) =>{ 
        e.preventDefault()
        try {
          const response = await fetch(
            `${process.env.NEXT_PUBLIC_API_URL}/admin/auth/sing-in`,
            {
              method: "POST",
              headers: {
                "Content-Type": "application/json",
              },
              body: JSON.stringify({ login: login, password: password }),
            },
          );
          const data = await response.json()
          const token = data.access_token
          const expiration = getTokenExpiration(token);
          localStorage.setItem('time', expiration)
          if (data.access_token){
            localStorage.setItem('adminToken', data.access_token)
            setAdminToken(data.access_token)
          } else {
            setError('Неверные данные')
          }
        } catch(error) {
          console.error(error)
        } 
        setTimeout(() => {
          location.reload()
        }, 3000);
        
    }
  return (
    <>
    <div className={styles.admin}>
        <form action="">
            <div>
                <h2 style={{textAlign: 'center'}}>Вход</h2>
                <Input type='text' value={login} onChange={handleLogin}/>
                <Input type='password' value={password} onChange={handlePassword}/>
                {adminToken ? <p style={{color: 'green'}}>Успешный вход...</p> : null}
                {error ? <p style={{color: 'red'}}>{error}</p> : null}
                <button onClick={authAdmin} 
                >Войти</button>
            </div>
            
        </form>
    </div>
    </>
  )
}

export default AdminForm
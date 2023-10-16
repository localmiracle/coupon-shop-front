import React, { useEffect, useRef, useState } from 'react'
import styles from './FormLogin.module.css'
import { messages } from '@/messages/messages'
import { setErrors, setSuccess } from '@/redux/messagesSlice'
import { setPhone, setCode, setEmail } from '@/redux/phoneSlice'
import { RootState } from '@/redux/store'
import { setToken } from '@/redux/tokenSlice'
import { useDispatch, useSelector } from 'react-redux'
import Verification from '../../VerificationInput/Verification'
import { error } from 'console'
import { useRouter } from 'next/router'
import { setValues } from '@/redux/valueSlice'
import ArrowBackIcon from '@mui/icons-material/ArrowBack';

const FormLogin = () => {
  
  //
  const router = useRouter();
  //Состояния
  const dispatch = useDispatch()
  const phone = useSelector((state:RootState)=> state.phone.phone)
  const email = useSelector((state:RootState) => state.phone.email)
  const token = useSelector((state:RootState)=> state.token.token)
  const code = useSelector((state:RootState) => state.phone.code)
  const values = useSelector((state: RootState) => state.values.values);
  const errors = useSelector((state:RootState) => state.messages.errors)
  const success = useSelector((state:RootState) => state.messages.success)
  const [isEmail, setIsEmail] = useState<boolean>(false);
  const [channel, setChannel] = useState('phone')
  //
  //Обнулить состояния при размонтировании компонента (при переходе на другую страницу)
  useEffect(() => {
    return () => {
      dispatch(setPhone(''));
      dispatch(setEmail(''));
      dispatch(setToken(''));
      dispatch(setCode(''));
      dispatch(setErrors(''));
    };
  }, []);
  //Регулярка +валидация
  const isValidPhone = /^(\+7|7|8)?[\s-]?\(?[489][0-9]{2}\)?[\s-]?[0-9]{3}[\s-]?[0-9]{2}[\s-]?[0-9]{2}$/.test(phone);
  
  const validateEmail = (email: string): boolean => {
    // Регулярное выражение для проверки формата email
    const emailRegex = /^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$/;
    return emailRegex.test(email);
  };

  // Выбор авторизации
  const handleChoiceAuth = () => {
    setIsEmail(!isEmail)
    if(isEmail){
      dispatch(setPhone(''))
      setChannel('phone') 
    }
    if(!isEmail){
      dispatch(setEmail(''))
      setChannel('email')
    }
    
  }
  // Обновление состояний у инпутов
  const handleChangeNumberPhone = (e:React.ChangeEvent<HTMLInputElement>) =>{
      // const input = e.target.value.replace(/\D/g, "");
      dispatch(setPhone(e.target.value))
  }
  const handleChangeCode = (e:React.ChangeEvent<HTMLInputElement>) =>{
      const input = e.target.value.replace(/\D/g, "");
      dispatch(setCode(input))
  }
  const handleChangeEmail = (e:React.ChangeEvent<HTMLInputElement>) =>{
    dispatch(setEmail(e.target.value))
    
  }
  //Запросы(отправка номера + получение первого токена(отправка OTP))
  const authRequest = async (e: React.FormEvent) => {
      e.preventDefault()
      if(isEmail){
        if(validateEmail(email)=== false){
          dispatch(setErrors('Введите корректный адрес электронной почты'))
        } else{
          dispatch(setErrors(''))
        }
      }
     
      if(!isEmail){
         if (!isValidPhone) {
            dispatch(setErrors('Введите корректный номер телефона'));
            return
          }
          else if (phone.length !== 10) {
            dispatch(setErrors('Введите 10 цифр в номере телефона'));
            return;
          } else {
            dispatch(setErrors(''))
          }
      }
      const resource = email ? email : phone;
      try {
          const response = await fetch('http://parcus.shop/api/auth', {
              method: 'POST',
              headers: {
              'Content-Type': 'application/json',
              },
              body: JSON.stringify({ resource: resource, channel: channel}),
          });
          const data = await response.json();
          dispatch(setToken(data.token)) 
          
          if (response.status === 400){
            dispatch(setErrors('Пользователя не существует. Зарегистрируйтесь через номер телефона!'))
          }
        } catch (error) {
          console.error(messages.WRONG_REQUEST, error);
          
        }
  }
  //Повторный запрос OTP code
  const handleResendCode = async (e: React.FormEvent) => {
    e.preventDefault();
    dispatch(setErrors(''))
    dispatch(setValues(['','','','']))    
    try {
      const response = await fetch('hhttp://parcus.shop/api/otp/send', {
        method: 'POST',
        headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({ phone: phone }),
      });
      const data = await response.json();
      dispatch(setToken(data.token))
      if (response.status === 201){
          dispatch(setErrors(response.statusText))
        } 
      } catch (error) {
        console.error(messages.WRONG_REQUEST, error);
      }
  } 

  const authVerify = async (e: React.FormEvent) =>{
    e.preventDefault();
    const code = values.join('')
    const response = await fetch(
      "http://parcus.shop/api/otp/verify",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ code: code }),
      },
    );
    if (response.status === 400){
      dispatch(setErrors("Ошибка отправки запроса"))
    }
    if (response.status === 200){
      const otpVerifyResult = await response.json();
      const systemToken = otpVerifyResult.token;
      dispatch(setToken(systemToken))
      localStorage.setItem('token', systemToken);
      dispatch(setSuccess('Успешный вход! Переадресация...'))
      setTimeout(()=>{
        router.push('/')
      }, 5000)
      
    }
  }

  const handleBack = () => {
    if (token) {
      dispatch(setToken(''));
    } else {
      router.push('/');
    }
  }
  return (
    <form onSubmit={authRequest} className={styles.formLogin}>
        <div className={styles.back}><ArrowBackIcon onClick={handleBack} style={{fontSize: '30px'}}/></div>
        <h1>ShopSmart</h1>
        { token 
        ? 
        <>
        {isEmail ? 
        <p className={styles.otp}>На Вашу электронную почту отправлено письмо с кодом</p>
        : 
        <p className={styles.otp}>На Ваш номер телефона отправлено SMS с кодом</p>
        }
        <p className={styles.grey}>Введите его ниже</p> 
        <div className={styles.verif}>
          <Verification errors={errors}/>
        </div>
          { errors === 'Неверный код' ? <h3 style={{color: 'red'}}>{errors}</h3> : null}
          { success  ? <h3 style={{color: 'green'}}>{success}</h3> : null}
        <div className={styles.resend}>
          <p>Не пришёл код?</p> 
          <p onClick={handleResendCode}>Отправить заново</p>
        </div>
        <button
            onClick={authVerify}
          className={styles.form_btn}
          type='button'>Войти</button>
        </>
        
        : 
        <>
        <div className={styles.title}>
          <h2 style={{maxWidth: '162px'}}>Войти или</h2>
          <h2>зарегистрироваться</h2>
        </div>
        <div className={styles.choice}>
            <div 
            className={isEmail ? styles.choice__item : `${styles.choice__item} ${styles.active}`}
            onClick={handleChoiceAuth}>
                Телефон
            </div>
            <div 
            className={isEmail ? `${styles.choice__item} ${styles.active}` : styles.choice__item }
            onClick={handleChoiceAuth}>
                Почта
            </div>
        </div>
          
        {errors ? <p style={{color: 'red'}}>{errors}</p> : null}
        {isEmail? 
        <>
        <div className={styles.verif}>
            
            <input style={ errors? {border: '1px solid red'} : {border: '1px solid #BBB'}}
            maxLength={50}
            type="text"
            value={email} 
            onChange={handleChangeEmail} 
            placeholder='Email' 
            className={styles.email}/>
        </div>
        <button 
        type='button'
        onClick={authRequest}
        className={styles.form_btn}>Продолжить</button>
        </>
        :<>
          <div className={styles.verif}>
              <p>+7</p>
              <input style={ errors? {border: '1px solid red'} : {border: '1px solid #BBB'}}
              className={styles.input}
              maxLength={15}
              pattern="[0-9]*"
              type="tel"
              value={phone} 
              onChange={handleChangeNumberPhone} 
              placeholder='_ _ _  _ _ _  _ _  _ _' />
          </div>
          <button 
          type='button'
          onClick={authRequest}
          className={styles.form_btn}>Продолжить</button>
        </>
        }
        </>  
        }
        
    </form>
  )
}

export default FormLogin
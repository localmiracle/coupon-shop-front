import React, { FC } from 'react'
import styles from './input.module.css'
interface InputProps {
    type:string;
    value: string;
    onChange: (e:any) => void;
    placeholder?: string;
    width?: number;
    size?: number;
    color?: ()=>string;
}

const Input:FC<InputProps> = ({type,value,onChange, placeholder,width, size, color}) => {
  return (
    <input 
    type={type}
    value={value}
    onChange={onChange}
    placeholder={placeholder}
    className={styles.input}
    style={{maxWidth: `${width}px`, fontSize: `${size}px`, border: `1px solid ${color}`}}
    />
  )
}

export default Input
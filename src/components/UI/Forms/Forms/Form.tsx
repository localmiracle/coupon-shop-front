import React, { FC } from 'react'
import styles from './form.module.css'
import CloseIcon from '@mui/icons-material/Close';
import { setModalOpen } from '@/redux/modalReducer';
import { useDispatch } from 'react-redux';


interface FormProps{
  modalOpen?: boolean;
  children: React.ReactNode;
  onSubmit?: (e: React.FormEvent) => Promise<void>;
}

const Form:FC<FormProps> = ({modalOpen, children, onSubmit}) => {
    const dispatch = useDispatch()
  return (
    <form onSubmit={onSubmit} action="" className={styles.form}>
        <CloseIcon onClick={()=>dispatch(setModalOpen(!modalOpen))} className={styles.closebtn}/>
        {children}
    </form>
  )
}

export default Form
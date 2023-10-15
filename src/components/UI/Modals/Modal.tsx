import React, { FC } from 'react'
import styles from './modal.module.css'

interface ModalProps{
    modalOpen: boolean;
    setModalOpen: (e:any) => void;
    children:   React.ReactNode;
}

const Modal:FC<ModalProps> = ({modalOpen, setModalOpen, children}) => {
  return (
    <div className={`${styles.modal} ${modalOpen? styles.active : ''}`}>
        <div onClick={e => e.stopPropagation()}>
        {children}
        </div>
    </div>
  )
}

export default Modal
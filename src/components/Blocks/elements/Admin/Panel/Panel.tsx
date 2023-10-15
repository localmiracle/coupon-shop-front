import React, { FC } from 'react'
import styles from './Panel.module.css'

interface PanelProps{
    children: React.ReactNode
}

const Panel:FC<PanelProps> = ({children}) => {

  return (
    <div className={styles.panel}>
        {children}
    </div>
  )
}

export default Panel
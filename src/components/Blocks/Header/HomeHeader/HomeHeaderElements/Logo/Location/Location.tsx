import React, { FC } from 'react'
import LocationOnOutlinedIcon from '@mui/icons-material/LocationOnOutlined';
import styles from './location.module.css'

interface LocationProps {
    city: string;
}

const Location:FC<LocationProps> = ({city}) => {
  return (
    <div className={styles.location}>
        <LocationOnOutlinedIcon style={{fontSize: 'small', display: 'block'}}/>
        <p>{city}</p>
    </div>
  )
}

export default Location
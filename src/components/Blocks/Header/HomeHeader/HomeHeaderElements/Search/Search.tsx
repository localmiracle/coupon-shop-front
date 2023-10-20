import React, { FC } from 'react'
import SearchIcon from '@mui/icons-material/Search';
import styles from './search.module.css'

const Search:FC = () => {

    // Логика поиска товаров(с запросами)

  return (
    <div>
        <input type="text" className={styles.input}/>
        <SearchIcon onClick={()=>console.log('Поиск...')}
        style={{ 
        borderRadius: '0px 10px 10px 0px', 
        display: 'block',
        cursor: 'pointer',
        fontSize: '30px',
        backgroundColor: 'rgba(235, 94, 40, 1)',
        color: 'white'
        }}/>
    </div>
  )
}

export default Search
import React, { FC } from 'react'
import SearchIcon from '@mui/icons-material/Search';


const Search:FC = () => {

    // Логика поиска товаров(с запросами)

  return (
    <div>
        <input type="text" style={{border: '1px solid #CCC5B9', paddingLeft: '15px', paddingTop: '6px', paddingBottom: '6px'}}/>
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
import React, { FC, useContext, useEffect } from 'react'
import styles from './HomeHeader.module.css'
import MenuIcon from '@mui/icons-material/Menu';
import { useDispatch, useSelector } from 'react-redux';
import { ModalState, setModalOpen } from '@/redux/modalReducer';
import { RootState } from '@/redux/store';
import Logo from './Logo/Logo';
import Location from './Logo/Location/Location';
import Search from './Search/Search';
import Authorization from './Authorization/Authorization';


const HomeHeader:FC = () => {

    const dispatch = useDispatch()
    const modalOpen = useSelector((state:RootState) => state.modal.modalOpen);

    const handleToggleModal = () => {
      dispatch(setModalOpen(!modalOpen));
    };

  return (
    <header>
        <div className={styles.header__container}>
            <div className={styles.header__logo}>
                <Logo name='ShopSmart'/>  
                <Location city={'Москва'}/>
            </div>
            <div className={styles.header__search}>
                <MenuIcon style={{display: 'block', fontSize: '30px', cursor: 'pointer'}}/>
                <Search />
            </div>
            <Authorization handleToggleModal={handleToggleModal}/>
            {/* <SignInModal modalOpen={modalOpen} setModalOpen={handleToggleModal}/> */}
        </div>
    </header>
  )
}

export default HomeHeader
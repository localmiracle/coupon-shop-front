import Image from 'next/image';
import React, { FC } from 'react'
import Logotype from './../../../../../../../public/Логотип.png'
import { useRouter } from 'next/router';

interface LogoProps{
    name?: string;
}

const Logo:FC<LogoProps> = ({name}) => {
  const router = useRouter()
  const handleRedirect =() =>{
    router.push('/')
  }
  return (
    <Image style={{cursor: 'pointer'}} onClick={handleRedirect} src={Logotype} alt={'/'} width={138} height={24}>

    </Image>
    // <Link href='/' style={{
    //     fontFamily: 'Inter', 
    //     fontSize: '32px', 
    //     fontWeight: '700',
    //     color: '#EB5E28'}}
    //     >{name}</Link>
  )
}

export default Logo
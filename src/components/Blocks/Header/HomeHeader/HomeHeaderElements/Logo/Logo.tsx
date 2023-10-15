import Link from 'next/link'
import React, { FC } from 'react'

interface LogoProps{
    name: string;
}

const Logo:FC<LogoProps> = ({name}) => {
  return (
    <Link href='/' style={{
        fontFamily: 'Inter', 
        fontSize: '32px', 
        fontWeight: '700',
        color: '#EB5E28'}}
        >{name}</Link>
  )
}

export default Logo
import React, { FC, useState } from 'react'
import styles from './Organisations.module.css'
import OrganisationsList from './OrganisationsList/OrganisationsList'

interface organisationsProps{
  token: string;
}

const Organisations:FC<organisationsProps> = ({token}) => {

  return (
    <>
     
      <OrganisationsList token={token}/>
      
    </>
  )
}

export default Organisations
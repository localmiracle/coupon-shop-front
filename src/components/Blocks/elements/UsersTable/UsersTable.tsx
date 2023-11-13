import React, { FC } from 'react'
import styles from './UserTable.module.css'
import { GET_ORGANISATION_USERS, GET_TRANSACTION } from '@/utils/graphql/query/queries';
import { useQuery } from '@apollo/client';

interface UsersTableProps{
    token: string;
    members: any[];
}

const UsersTable:FC<UsersTableProps> = ({token, members}) => {

  return (
    <div className={styles.table__wrapper}>
      <table className={styles.table}>
      <thead >
        <tr>
          <th className={styles.th}>ID</th>
          {/* <th className={styles.th}>Номер</th> */}
          <th className={styles.th}>Почта</th>
          <th className={styles.th}>ID Организации</th>
          <th className={styles.th}>Роль</th>
        </tr>
      </thead>
      <tbody>
        {members && members.length > 0 ? members.map((member:any) => (
          <tr key={member.id}>
            <td className={styles.td}>{member.id}</td>
            {/* <td className={styles.td}>{member.phone}</td> */}
            <td className={styles.td}>{member.email}</td>
            <td className={styles.td}>{member.organization_ID}</td>
            <td className={styles.td}>{member.role}</td>
          </tr>
        ))
        : "Пользователи не найдены!"}
      </tbody>
    </table>
  </div>
  )
}

export default UsersTable
import React, { FC } from 'react'
import styles from './UserTable.module.css'
import { GET_ORGANISATION_USERS, GET_TRANSACTION } from '@/utils/graphql/query/queries';
import { useQuery } from '@apollo/client';

interface UsersTableProps{
    token: string;
}

const UsersTable:FC<UsersTableProps> = ({token}) => {
    const { loading, error, data } = useQuery(GET_ORGANISATION_USERS, {
        context: {
          headers: {
            Authorization: `Bearer ${token}`
          },
        }
      });
    const users = data? data.getOrganizationUsers : null;
  return (
    <div className={styles.table__wrapper}>
      <table className={styles.table}>
      <thead >
        <tr>
          <th className={styles.th}>ID</th>
          <th className={styles.th}>Номер</th>
          <th className={styles.th}>Почта</th>
          <th className={styles.th}>ID Организации</th>
          <th className={styles.th}>Роль</th>
        </tr>
      </thead>
      <tbody>
        {users ? users.map((user:any) => (
          <tr key={user.id}>
            <td className={styles.td}>{user.id}</td>
            <td className={styles.td}>{user.phone}</td>
            <td className={styles.td}>{user.email}</td>
            <td className={styles.td}>{user.organizationId}</td>
            <td className={styles.td}>{user.roles}</td>
          </tr>
        ))
        : "Пользователи не найдены!"}
      </tbody>
    </table>
  </div>
  )
}

export default UsersTable
import React, { FC, useEffect, useState } from 'react'
import styles from './Table.module.css'
import { useQuery } from '@apollo/client';
import { GET_TRANSACTION } from '@/utils/graphql/query/queries';


const Table:FC = () => {
  const { loading, error, data } = useQuery(GET_TRANSACTION, {
    context: {
      headers: {
        Authorization: `Bearer ${'test'}`
      },
    }
  });
  const transactions = data?.getTransactions || [];
  
  return (
    <div className={styles.table__wrapper}>
      <table className={styles.table}>
      <thead >
        <tr>
          <th className={styles.th} >ID</th>
          <th className={styles.th}>Время</th>
          <th className={styles.th}>Сумма</th>
          <th className={styles.th}>Статус</th>
        </tr>
      </thead>
      <tbody>
        {transactions.map((transaction:any) => (
          <tr key={transaction.id}>
            <td className={styles.td}>{transaction.id}</td>
            <td className={styles.td}>{transaction.createdAt}</td>
            <td className={styles.td}>{transaction.value.toFixed(1)}</td>
            { transaction.status === true? 
            <td className={styles.td }><p className={styles.success}>Успешно</p></td> : 
            <td className={styles.td}><p className={styles.error}>Не успешно</p></td>
            }
          </tr>
        ))
        }
      </tbody>
    </table>
  </div>
  )
}

export default Table
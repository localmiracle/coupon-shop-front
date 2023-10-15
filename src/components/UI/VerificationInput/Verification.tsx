import React, { FC, useEffect, useRef, useState } from 'react'
import styles from './verification.module.css'
import { useDispatch, useSelector } from 'react-redux';
import { setCode } from '@/redux/phoneSlice';
import { RootState } from '@/redux/store';
import { setValues, updateValue } from '@/redux/valueSlice';

interface VerificationProps{
    errors?: string;
}

const Verification:FC<VerificationProps> = ({errors}) => {
    const values = useSelector((state: RootState) => state.values.values);
    
    const inputRefs = useRef<Array<React.RefObject<HTMLInputElement>>>(
      Array(4).fill(null).map(() => useRef<HTMLInputElement>(null))
    );
  
    useEffect(() => {
      
      inputRefs.current[0]?.current?.focus();
    }, []);
  
    const handleChange = (
        e: React.ChangeEvent<HTMLInputElement>,
        index: number
      ) => {
        const inputValue = e.target.value;
        const isCellEmpty = values[index] === "";
    
        const currentCharacter = isCellEmpty ? inputValue.replace(/[^0-9]/g, "") : inputValue;
    
        // Обновляем значение для текущего инпута
        dispatch(updateValue({ index, value: currentCharacter }));

        if (!currentCharacter && index > 0) {
          // Переходим к предыдущему инпуту при удалении всех символов из текущей ячейки
          inputRefs.current[index - 1]?.current?.focus();
        } else if (currentCharacter.length === 1 && index < values.length - 1) {
          // Переходим к следующему инпуту при вводе символа, если это не последняя ячейка
          inputRefs.current[index + 1]?.current?.focus();
        }
      };
      
      const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>, index: number) => {
        if (e.key === "Backspace" && inputRefs.current[index]?.current) {
          e.preventDefault(); // Отменяем стандартное поведение удаления символа
          const newValues = [...values]; // Создаем копию массива values
      
          // Заменяем значение ячейки на пустую строку
          newValues[index] = "";
      
          dispatch(setValues(newValues)); // Обновляем состояние values
      
          // Переходим к предыдущей ячейке, только если индекс не равен 0
          if (index > 0) {
            inputRefs.current[index - 1]?.current?.focus();
          }
        }
      };
  
    const otpCode = values.join(""); // Объединяем все значения в одну строку
    const dispatch = useDispatch()
    dispatch(setCode(otpCode))
    return (
      <div className={styles.inputs}>
        {values.map((value, index) => (
          <input
            key={index}
            ref={inputRefs.current[index]}
            type="tel"
            pattern="[0-9]"
            maxLength={1}
            value={value}
            onChange={e => handleChange(e, index)}
            onKeyDown={e => handleKeyDown(e, index)}
            className={errors ? `${styles.input} ${styles.error}` : styles.input}
          />
        ))}
    
      </div>
    );
  };

export default Verification
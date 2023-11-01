import React, { FC, useEffect, useRef, useState } from "react";
import styles from "./LoginCode.module.css";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@/redux/store";
import { setToken } from "@/redux/tokenSlice";
import { useRouter } from "next/router";
import { gql } from "@apollo/client";
import { initializeApollo } from "@/utils/apollo/client";
import { setSuccess } from "@/redux/messagesSlice";

interface LoginCodeProps {
  errors: string;
}

const client = initializeApollo();

const LoginCode: FC<LoginCodeProps> = ({ errors }) => {
  const [values, setValues] = useState<string[]>(Array(7).fill(""));
  const dispatch = useDispatch();
  const token = useSelector((state: RootState) => state.token.token);
  const inputRefs = useRef<Array<React.RefObject<HTMLInputElement>>>(
    Array(7)
      .fill(null)
      .map(() => useRef<HTMLInputElement>(null))
  );
  const router = useRouter();
  const success = useSelector((state: RootState) => state.messages.success);
  useEffect(() => {
    inputRefs.current[0]?.current?.focus();
  }, []);
  const ME_QUERY = gql`
    query Me {
      me {
        email
        phone
      }
    }
  `;

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    index: number
  ) => {
    const inputValue = e.target.value;
    const isCellEmpty = values[index] === "";

    const currentCharacter = isCellEmpty
      ? inputValue.replace(/[^0-9]/g, "")
      : inputValue;

    // Обновляем значение для текущего инпута
    setValues((prevValues) => {
      const newValues = [...prevValues];
      newValues[index] = currentCharacter;
      return newValues;
    });

    if (!currentCharacter && index > 0) {
      // Переходим к предыдущему инпуту при удалении всех символов из текущей ячейки
      inputRefs.current[index - 1]?.current?.focus();
    } else if (currentCharacter.length === 1 && index < values.length - 1) {
      // Переходим к следующему инпуту при вводе символа, если это не последняя ячейка
      inputRefs.current[index + 1]?.current?.focus();
    }
  };
  const authRequest = async () => {
    const code = values.join("");
    const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/auth`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ resource: code, channel: "code" }),
    });
    const res = await response.json();
    if (response.status === 200) {
      dispatch(setToken(res.token));
      localStorage.setItem("token", res.token);
      dispatch(setSuccess("Успешно! Переадресация.."));
    }
    const { data } = await client.query<{ me: any }>({
      query: ME_QUERY,
      context: {
        headers: {
          Authorization: `Bearer ${res.token}`,
        },
      },
    });
    const user = data.me;
    if (user.phone || user.email) {
      router.push("/");
    } else {
      localStorage.setItem("special", "7code");
      router.push("/user");
    }
  };
  const handleKeyDown = (
    e: React.KeyboardEvent<HTMLInputElement>,
    index: number
  ) => {
    if (e.key === "Backspace" && inputRefs.current[index]?.current) {
      e.preventDefault(); // Отменяем стандартное поведение удаления символа
      const newValues = [...values]; // Создаем копию массива values

      // Заменяем значение ячейки на пустую строку
      newValues[index] = "";

      setValues(newValues); // Обновляем состояние values

      // Переходим к предыдущей ячейке, только если индекс не равен 0
      if (index > 0) {
        inputRefs.current[index - 1]?.current?.focus();
      }
    }
  };

  const handleKeyUp = (
    e: React.KeyboardEvent<HTMLInputElement>,
    index: number
  ) => {
    if (e.key !== "Backspace" && e.target instanceof HTMLInputElement) {
      const inputValue = e.target.value;
      const currentCharacter = inputValue.replace(/[^0-9]/g, "");

      setValues((prevValues) => {
        const newValues = [...prevValues];
        newValues[index] = currentCharacter;
        return newValues;
      });

      if (currentCharacter.length === 1 && index < values.length - 1) {
        inputRefs.current[index + 1]?.current?.focus();
      }

      if (index === values.length - 1 && currentCharacter.length === 1) {
        authRequest();
        // Здесь вы можете добавить логику отправки запроса на сервер для авторизации
        // вызовите функцию или метод, который отправляет запрос с значениями values.join("")
      }
    }
  };
  return (
    <>
      <div className={styles.inputs}>
        {values.map((value, index) => (
          <input
            key={index}
            ref={inputRefs.current[index]}
            type="tel"
            pattern="[0-9]"
            maxLength={1}
            value={value}
            onChange={(e) => handleChange(e, index)}
            onKeyDown={(e) => handleKeyDown(e, index)}
            onKeyUp={(e) => handleKeyUp(e, index)}
            className={
              errors ? `${styles.input} ${styles.error}` : styles.input
            }
          />
        ))}
      </div>
      {success ? <p style={{ color: "green" }}>{success}</p> : null}
    </>
  );
};

export default LoginCode;

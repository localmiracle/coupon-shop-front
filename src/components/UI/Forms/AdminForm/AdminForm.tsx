import React, { FC, useState } from "react";
import styles from "./AdminForm.module.css";
import Input from "../../Inputs/Input";

interface AdminFormProps {
  setToken: (token: string) => void;
}

const AdminForm: FC<AdminFormProps> = ({ setToken }) => {
  const [error, setError] = useState<string>("");
  const [login, setLogin] = useState<string>("");
  const [password, setPassword] = useState<string>("");

  const handleLogin = (e: any) => {
    setLogin(e.target.value);
  };

  const handlePassword = (e: any) => {
    setPassword(e.target.value);
  };

  const authAdmin = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}:${process.env.NEXT_PUBLIC_API_PORT_ADMIN}/admin/auth/sing-in`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ login: login, password: password }),
        }
      );
      const data = await response.json();
      const token = data.access_token;
      if (token) {
        setToken(token);
      } else {
        setError("Неверные данные");
      }
    } catch (error) {
      console.error(error);
    }
  };
  
  return (
    <>
      <div className={styles.admin}>
        <form action="">
          <div>
            <h2 style={{ textAlign: "center" }}>Вход</h2>
            <Input type="text" value={login} onChange={handleLogin} />
            <Input type="password" value={password} onChange={handlePassword} />
            {error ? <p style={{ color: "red" }}>{error}</p> : null}
            <button onClick={authAdmin}>Войти</button>
          </div>
        </form>
      </div>
    </>
  );
};

export default AdminForm;

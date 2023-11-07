import React, { useEffect, useRef, useState } from "react";
import styles from "./FormLogin.module.css";
import { messages } from "@/messages/messages";
import { setErrors, setSuccess } from "@/redux/messagesSlice";
import { setPhone, setCode, setEmail } from "@/redux/phoneSlice";
import { RootState } from "@/redux/store";
import { setToken } from "@/redux/tokenSlice";
import { useDispatch, useSelector } from "react-redux";
import Verification from "../../VerificationInput/Verification";
import { error } from "console";
import { useRouter } from "next/router";
import { setValues } from "@/redux/valueSlice";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import Logo from "@/components/Blocks/Header/HomeHeader/HomeHeaderElements/Logo/Logo";
import LoginCode from "../../LoginCode/LoginCode";
import Cancel from "./../../../../../public/cancel.png";
import Logotype from "./../../../../../public/Логотип.png";
import Image from "next/image";

const FormLogin = () => {
  //
  const router = useRouter();
  //Состояния
  const dispatch = useDispatch();
  const phone = useSelector((state: RootState) => state.phone.phone);
  const email = useSelector((state: RootState) => state.phone.email);
  const token = useSelector((state: RootState) => state.token.token);
  const code = useSelector((state: RootState) => state.phone.code);
  const values = useSelector((state: RootState) => state.values.values);
  const errors = useSelector((state: RootState) => state.messages.errors);
  const success = useSelector((state: RootState) => state.messages.success);
  const [isEmail, setIsEmail] = useState<boolean>(false);
  const [channel, setChannel] = useState("phone");
  const [special, setSpecial] = useState<boolean>(false);
  const [isAgreementChecked, setIsAgreementChecked] = useState<boolean>(false);

  const isSpecial = () => {
    setSpecial(true);
  };

  //Обнулить состояния при размонтировании компонента (при переходе на другую страницу)
  useEffect(() => {
    return () => {
      dispatch(setPhone(""));
      dispatch(setEmail(""));
      dispatch(setToken(""));
      dispatch(setCode(""));
      dispatch(setErrors(""));
    };
  }, []);

  useEffect(() => {
    if (code.length === 4) authVerify();
    if (code.length < 4 && errors) dispatch(setErrors(""));
  }, [code]);

  //Регулярка +валидация
  const isValidPhone =
    /^(\+7|7|8)?[\s-]?\(?[489][0-9]{2}\)?[\s-]?[0-9]{3}[\s-]?[0-9]{2}[\s-]?[0-9]{2}$/.test(
      phone
    );

  const validateEmail = (email: string): boolean => {
    // Регулярное выражение для проверки формата email
    const emailRegex = /^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$/;
    return emailRegex.test(email);
  };

  // Выбор авторизации
  const handleChoiceAuth = () => {
    setIsEmail(!isEmail);
    dispatch(setErrors(""));
    dispatch(setPhone(""));
    dispatch(setEmail(""));
    if (isEmail) {
      setChannel("phone");
    } else {
      setChannel("email");
    }
  };
  // Обновление состояний у инпутов
  const handleChangeNumberPhone = (e: React.ChangeEvent<HTMLInputElement>) => {
    // const input = e.target.value.replace(/\D/g, "");
    dispatch(setPhone(e.target.value));
  };
  const handleChangeCode = (e: React.ChangeEvent<HTMLInputElement>) => {
    const input = e.target.value.replace(/\D/g, "");
    dispatch(setCode(input));
  };
  const handleChangeEmail = (e: React.ChangeEvent<HTMLInputElement>) => {
    dispatch(setEmail(e.target.value));
  };
  //Запросы(отправка номера + получение первого токена(отправка OTP))
  const authRequest = async (e: React.FormEvent) => {
    e.preventDefault();
    let sendable = true;

    if (isEmail) {
      if (validateEmail(email) === false) {
        dispatch(setErrors("Введите корректный адрес электронной почты"));
        sendable = false;
      } else {
        dispatch(setErrors(""));
      }
    }

    if (!isEmail) {
      if (!isValidPhone) {
        dispatch(setErrors("Введите корректный номер телефона"));
        sendable = false;
        return;
      } else if (phone.length !== 10) {
        dispatch(setErrors("Введите 10 цифр в номере телефона"));
        sendable = false;
        return;
      } else {
        dispatch(setErrors(""));
      }
    }

    if (sendable) {
      const resource = email ? email : phone;
      try {
        const response = await fetch(
          `${process.env.NEXT_PUBLIC_API_URL}:${process.env.NEXT_PUBLIC_API_PORT}/api/auth`,
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({ resource: resource, channel: channel }),
          }
        );
        const data = await response.json();
        dispatch(setToken(data.token));

        if (response.status === 400) {
          dispatch(
            setErrors(
              "Пользователя не существует. Зарегистрируйтесь через номер телефона!"
            )
          );
        }
      } catch (error) {
        console.error(messages.WRONG_REQUEST, error);
      }
    }
  };
  //Повторный запрос OTP code
  const handleResendCode = async (e: React.FormEvent) => {
    e.preventDefault();
    dispatch(setErrors(""));
    dispatch(setValues(["", "", "", ""]));
    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}:${process.env.NEXT_PUBLIC_API_PORT}/api/otp/send`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({ phone: phone }),
        }
      );
      const data = await response.json();
      dispatch(setToken(data.token));
      if (response.status === 201) {
        dispatch(setErrors(response.statusText));
      }
    } catch (error) {
      console.error(messages.WRONG_REQUEST, error);
    }
  };

  const submitAvailable = () => {
    return (
      isAgreementChecked &&
      ((email !== "" && validateEmail(email)) ||
        (phone !== "" && phone.length === 10 && isValidPhone))
    );
  };

  const authVerify = async () => {
    const code = values.join("");
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}:${process.env.NEXT_PUBLIC_API_PORT}/api/otp/verify`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ code: code }),
      }
    );
    if (response.status === 400) {
      dispatch(setErrors("Неверный код"));
    }
    if (response.status === 200) {
      const otpVerifyResult = await response.json();
      const systemToken = otpVerifyResult.token;
      dispatch(setToken(systemToken));
      localStorage.setItem("token", systemToken);
      dispatch(setSuccess("Успешный вход! Переадресация..."));
      setTimeout(() => {
        router.push("/");
      }, 1000);
    }
  };

  const handleBack = () => {
    router.push("/");
  };

  const handleBackToAuth = () => {
    dispatch(setToken(""));
    dispatch(setEmail(""));
    dispatch(setPhone(""));
    dispatch(setErrors(""));
    setSpecial(false);
  };

  return (
    <form onSubmit={authRequest} className={styles.formLogin}>
      <Image
        src={Cancel}
        alt={"/"}
        className={styles.cancel}
        onClick={handleBack}
      />
      {token || special ? (
        <div className={styles.back}>
          <svg
            onClick={handleBackToAuth}
            xmlns="http://www.w3.org/2000/svg"
            width="31"
            height="31"
            viewBox="0 0 35 35"
            fill="none"
          >
            <path
              d="M33 17.5H2"
              stroke="#403D39"
              stroke-width="3"
              stroke-linecap="round"
              stroke-linejoin="round"
            />
            <path
              d="M17.5 33L2 17.5L17.5 2"
              stroke="#403D39"
              stroke-width="3"
              stroke-linecap="round"
              stroke-linejoin="round"
            />
          </svg>
        </div>
      ) : null}
      <Image
        style={{ cursor: "pointer" }}
        src={Logotype}
        alt={"/"}
        width={201}
        height={35}
        onClick={handleBack}
      />

      {special ? (
        <>
          <p className={styles.special}>
            Впишите Ваш индвидуальный код в поле ввода ниже
          </p>
          <LoginCode errors={errors} />
        </>
      ) : token ? (
        <div className={styles.form_wrapper}>
          {isEmail ? (
            <p className={styles.otp}>
              На Вашу электронную почту отправлено письмо с кодом
            </p>
          ) : (
            <p className={styles.otp}>
              На Ваш номер телефона отправлено SMS с кодом
            </p>
          )}
          <p className={styles.grey}>Введите его ниже</p>

          <Verification errors={errors} />

          {errors ? (
            <h3 style={{ color: "red", marginBottom: "10px" }}>{errors}</h3>
          ) : null}
          {success ? (
            <h3 style={{ color: "green", marginBottom: "10px" }}>{success}</h3>
          ) : null}
          <div className={styles.resend}>
            <p>Не пришёл код?</p>
            <p onClick={handleResendCode}>Отправить заново</p>
          </div>
        </div>
      ) : (
        <>
          <div className={styles.form_wrapper}>
            <div className={styles.title}>
              <h2>Войти или зарегистрироваться</h2>
            </div>
            <div className={styles.choice}>
              <div
                className={
                  isEmail
                    ? styles.choice__item
                    : `${styles.choice__item} ${styles.active}`
                }
                onClick={() => {
                  isEmail ? handleChoiceAuth() : {};
                }}
              >
                <div>Телефон</div>
              </div>
              <div
                className={
                  isEmail
                    ? `${styles.choice__item} ${styles.active}`
                    : styles.choice__item
                }
                onClick={() => {
                  isEmail ? {} : handleChoiceAuth();
                }}
              >
                Почта
              </div>
            </div>

            {isEmail ? (
              <>
                <input
                  className={styles.verif_email}
                  style={
                    errors
                      ? { border: "1px solid red", marginBottom: "12px" }
                      : { border: "1px solid #BBB", marginBottom: "30px" }
                  }
                  maxLength={50}
                  type="text"
                  value={email}
                  onChange={handleChangeEmail}
                  placeholder="Email"
                  onKeyDown={(e) => {
                    if (e.key === "Enter") e.preventDefault();
                  }}
                />
              </>
            ) : (
              <>
                <div
                  className={styles.verif}
                  style={
                    errors
                      ? { border: "1px solid red", marginBottom: "12px" }
                      : { border: "1px solid #BBB", marginBottom: "30px" }
                  }
                >
                  <div>+7</div>
                  <input
                    maxLength={15}
                    pattern="[0-9]*"
                    required
                    type="tel"
                    value={phone}
                    onChange={handleChangeNumberPhone}
                    onKeyDown={(e) => {
                      if (e.key === "Enter") e.preventDefault();
                    }}
                    placeholder="123-456-78-90"
                  />
                </div>
              </>
            )}
            {errors ? <p className={styles.error}>{errors}</p> : null}
            <p className={styles.auth_code} onClick={isSpecial}>
              Авторизироваться через индивидуальный код
            </p>
            <div className={styles.checkbox_group}>
              <input
                type="checkbox"
                checked={isAgreementChecked}
                onChange={() => {
                  setIsAgreementChecked(!isAgreementChecked);
                }}
                id="agreement"
              />
              <label htmlFor="agreement">
                Я согласен(а) на&nbsp;
                <span style={{ color: "#403C36" }}>
                  обработку персональных данных
                </span>
              </label>
            </div>
          </div>
          <button
            type="button"
            onClick={authRequest}
            className={styles.form_btn}
            style={
              submitAvailable()
                ? {
                    backgroundColor: "#403d39",
                    borderColor: "#CCC5B9",
                    cursor: "pointer",
                  }
                : {
                    backgroundColor: "#DEDAD2",
                    borderColor: "#DBD6CC",
                    cursor: "default",
                  }
            }
            disabled={!submitAvailable()}
          >
            Продолжить
          </button>
        </>
      )}
    </form>
  );
};

export default FormLogin;

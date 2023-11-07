const jwt = require("jsonwebtoken");

export function getTokenExpiration(token: any) {
    try {
      const jwt = require("jsonwebtoken");
      const decodedToken = jwt.decode(token);
      const expirationTime = decodedToken ? decodedToken.exp : null;
      return expirationTime;
    } catch (error) {
      console.error("Ошибка при получении времени жизни токена.");
      return false;
    }
  }

export const tokenIsValid = (token: string | null) => {
    return token !== null && token !== "" && getTokenExpiration(token) && Date.now() < getTokenExpiration(token) * 1000;
  };
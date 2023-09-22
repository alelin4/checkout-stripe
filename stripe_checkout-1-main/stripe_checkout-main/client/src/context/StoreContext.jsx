import { createContext, useState } from "react";

export const StoreContext = createContext();

// eslint-disable-next-line react/prop-types
const StoreContextProvider = ({ children }) => {
  // State variables
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [email, setEmail] = useState('');
  const [data, setData] = useState({});
  const [user, setUser] = useState('');
  const [invalidUser, setInvalidUser] = useState('');
  const [register, setRegister] = useState('');

  // Login function
  const login = async () => {
    try {
      const response = await fetch("/api/user/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({ username: username, password: password })
      });

      const data = await response.json();

      setInvalidUser(response.status === 401);
      setData(data);
    } catch (error) {
      console.log(error);
    }
  };

  // Registration function
  const registration = async () => {
    try {
      const response = await fetch('/api/user/register', {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({ username: username, password: password, email: email })
      });

      setUser(response.status === 404);
      setRegister(response.status === 200);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <StoreContext.Provider
      value={{
        username,
        setUsername,
        password,
        setPassword,
        email,
        setEmail,
        data,
        login,
        invalidUser,
        register,
        user,
        registration
      }}
    >
      {children}
    </StoreContext.Provider>
  );
};

export default StoreContextProvider;

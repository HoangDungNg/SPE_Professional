import { createContext, useState } from "react";

const UserContext = createContext({ name: "", auth: false });

function UserProvider({ children }) {
  const [user, setUser] = useState({
    username: "",
    name: "",
    role: "",
    auth: false,
    msg: "",
  });

  const login = (username, password) => {
    fetch("/login", {
      headers: {
        Accept: "application/json, text/plain, */*",
        "Content-Type": "application/json",
      },
      method: "POST",
      body: JSON.stringify({ username, password }),
    })
      .then((res) => res.json())
      .then((data) => {
        // console.log("retrieved data: " + JSON.stringify(data.role));

        setUser((user) => ({
          username: data.username,
          name: data.name,
          role: data.role,
          auth: data.user,
          msg: data.msg,
        }));

        //   data.role === "Lecturer" ? setlecturerRole(true) : setStudentRole(true);
        //   data.role === "Lecturer"
        //     ? setLecturerData({ username: data.username, role: data.role, user: data.user })
        //     : setStudentData({ username: data.username, role: data.role, user: data.user });
      });
  };

  const logout = () => {
    setUser((user) => ({
        username: '',
        name: '',
        role: '',
        auth: false,
        msg: '',
    }));
  };

  return (
    <UserContext.Provider value={{ user, login, logout }}>
      {children}
    </UserContext.Provider>
  );
}

export { UserProvider, UserContext };

import { observer } from "mobx-react-lite";
import React, { useContext, useEffect, useRef, useState } from "react";
import "./App.css";
import LoginForm from "./components/LoginForm";
import { ContextStore } from "./index";
import { IUser } from "./models/IUser";
import UserService from "./services/UserService";
import { LocalStorageKeys } from "./enums/storages";

function App() {
  const { store } = useContext(ContextStore);
  const [users, setUsers] = useState<IUser[]>([]);
  console.log("App");

  const firstRender = useRef(true);
  useEffect(() => {
    if (firstRender.current) {
      if (localStorage.getItem(LocalStorageKeys.accessToken)) {
        store.checkAuth();
      }
    }
    return () => {
      firstRender.current = false;
    };
  }, [store]);

  async function getUsers() {
    try {
      const response = await UserService.fetchUsers();
      setUsers(response.data);
    } catch (e) {
      console.log("getUsers", e);
    }
  }

  if (store.isLoading) {
    return <div>Загрузка</div>;
  }

  if (!store.isAuth) {
    return <LoginForm />;
  }

  return (
    <div className="App">
      <h1>
        {store.isAuth
          ? `Пользователь авторизован ${store.user.email}`
          : "АВТОРИЗУЙТЕСЬ!"}
      </h1>
      <h2>
        {store.user.isActivated
          ? `Пользователь активирован`
          : "Пользователь не активирован!"}
      </h2>
      <button onClick={() => store.logout()}>Выйти</button>
      <div>
        <button onClick={() => getUsers()}>Получить пользователей</button>
      </div>
      {users.map((user) => (
        <div key={user.email}>{user.email}</div>
      ))}
    </div>
  );
}

export default observer(App);

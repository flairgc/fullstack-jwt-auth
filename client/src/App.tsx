import { observer } from "mobx-react-lite";
import React, { useContext, useEffect, useRef, useState  } from "react";
import "./App.css";
import LoginForm from "./components/LoginForm";
import { ContextStore } from "./index";
import { IUser } from "./models/IUser";
import UserService from "./services/UserService";
import { LocalStorageKeys } from "./enums/storages";
import UserList from "./components/UserList";

function App() {
  const { store } = useContext(ContextStore);

  const firstRender = useRef(true);
  useEffect(() => {
    if (firstRender.current) {
      if (localStorage.getItem(LocalStorageKeys.accessToken)) {
        store.checkAuth().then();
      }
    }
    return () => {
      firstRender.current = false;
    };
  }, [store]);

  const isFirstRender = useRef(true);
  useEffect(() => {
    if (isFirstRender.current) {
      // код
    }
    return () => {
      firstRender.current = false;
    };
  }, []);

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
      <UserList />
    </div>
  );
}

export default observer(App);

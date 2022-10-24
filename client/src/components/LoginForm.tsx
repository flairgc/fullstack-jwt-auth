import React, { FC, useContext, useState } from "react";
import {observer} from "mobx-react-lite";
import { ContextStore } from "../index";

const LoginForm: FC = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const { store } = useContext(ContextStore);

  return (
    <div style={{ padding: 20 }}>
      <div>flair.gc@yandex.ru</div>
      <input
        onChange={(e) => setEmail(e.target.value)}
        type="email"
        placeholder="Email"
        name={email}
        autoComplete="on"
      />
      <input
        onChange={(e) => setPassword(e.target.value)}
        type="password"
        placeholder="Пароль"
      />
      <button onClick={() => store.login(email, password)}>Логин</button>
      <button onClick={() => store.registration(email, password)}>
        Регистрация!
      </button>
    </div>
  );
};

export default observer(LoginForm);

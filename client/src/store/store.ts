import { makeAutoObservable } from "mobx";
import { IUser } from "../models/IUser";
import AuthService from "../services/AuthService";
import { getRefreshedTokens } from "../http";
import { LocalStorageKeys } from "../enums/storages";

export default class Store {
  user = {} as IUser;
  isAuth = false
  isLoading = false;

  constructor() {
    makeAutoObservable(this);
  }

  setAuth(bool: boolean) {
    this.isAuth = bool;
  }

  setUser(user: IUser) {
    this.user = user;
  }

  setLoading(bool: boolean) {
    this.isLoading = bool;
  }

  async login(email: string, password: string) {
    try {
      const response = await AuthService.login(email, password);
      console.log('login', response);
      localStorage.setItem(LocalStorageKeys.accessToken, response.data.accessToken);
      this.setAuth(true);
      this.setUser(response.data.user);
    } catch (e: any) {
      console.log(e.response?.data?.message );
    }
  };

  async registration(email: string, password: string) {
    try {
      const response = await AuthService.registration(email, password);
      console.log('registration', response);
      localStorage.setItem(LocalStorageKeys.accessToken, response.data.accessToken);
      this.setAuth(true);
      this.setUser(response.data.user);
    } catch (e: any) {
      console.log(e.response?.data?.message );
    }
  };

  async logout() {
    try {
      const response = await AuthService.logout();
      console.log('logout', response);
      localStorage.removeItem(LocalStorageKeys.accessToken);
      this.setAuth(false);
      this.setUser({} as IUser);
    } catch (e: any) {
      console.log(e.response?.data?.message );
    }
  };

  async checkAuth() {
    this.setLoading(true);
    try {
      const response = await getRefreshedTokens();
      console.log('checkAuth', response);
      localStorage.setItem(LocalStorageKeys.accessToken, response.data.accessToken);
      this.setAuth(true);
      this.setUser(response.data.user);
    } catch (e: any) {
      console.log(e.response?.data?.message);
    } finally {
      this.setLoading(false);
    }
  }
}
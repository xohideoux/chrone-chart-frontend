import { makeAutoObservable } from 'mobx';
import { User } from '../types';

export default class UserStore {
  _isAuth: boolean;
  _user: User | null

  constructor() {
    this._isAuth = false;
    this._user = null;

    makeAutoObservable(this);
  }

  setAuth(value: boolean) {
    this._isAuth = value
  }

  setUser(value: User | null) {
    this._user = value
  }

  get isAuth() {
    return this._isAuth;
  }

  get user() {
    return this._user
  }

}
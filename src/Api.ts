import type { CardData, CardFormData, UserData, UserFormData } from "./types.js";

interface ApiConfig {
  baseUrl: string;
  headers: Record<string, string>;
}

export class Api {
  private _baseUrl: string;
  private _headers: Record<string, string>;

  constructor({ baseUrl, headers }: ApiConfig) {
    this._baseUrl = baseUrl;
    this._headers = headers;
  }

  private _checkResponse<T>(res: Response): Promise<T> {
    if (res.ok) {
      return res.json();
    }
    throw new Error(`Error: ${res.status}`);
  }

  getUserInfo(): Promise<UserData> {
    return fetch(`${this._baseUrl}/users/me`, {
      headers: this._headers,
    }).then((res) => this._checkResponse<UserData>(res));
  }

  getInitialCards(): Promise<CardData[]> {
    return fetch(`${this._baseUrl}/cards`, {
      headers: this._headers,
    }).then((res) => this._checkResponse<CardData[]>(res));
  }

  updateUserInfo(data: UserFormData): Promise<UserData> {
    return fetch(`${this._baseUrl}/users/me`, {
      method: "PATCH",
      headers: this._headers,
      body: JSON.stringify(data),
    }).then((res) => this._checkResponse<UserData>(res));
  }

  addCard(data: CardFormData): Promise<CardData> {
    return fetch(`${this._baseUrl}/cards/`, {
      method: "POST",
      headers: this._headers,
      body: JSON.stringify(data),
    }).then((res) => this._checkResponse<CardData>(res));
  }

  likeCard(cardId: string): Promise<CardData> {
    return fetch(`${this._baseUrl}/cards/${cardId}/likes`, {
      method: "PUT",
      headers: this._headers,
    }).then((res) => this._checkResponse<CardData>(res));
  }

  unlikeCard(cardId: string): Promise<CardData> {
    return fetch(`${this._baseUrl}/cards/${cardId}/likes`, {
      method: "DELETE",
      headers: this._headers,
    }).then((res) => this._checkResponse<CardData>(res));
  }

  deleteCard(cardId: string): Promise<unknown> {
  return fetch(`${this._baseUrl}/cards/${cardId}`, {
    method: "DELETE",
    headers: this._headers,
  }).then((res) => this._checkResponse<unknown>(res));
}

updateAvatar(avatar: string): Promise<UserData> {
  return fetch(`${this._baseUrl}/users/me/avatar`, {
    method: "PATCH",
    headers: this._headers,
    body: JSON.stringify({ avatar }),
  }).then((res) => this._checkResponse<UserData >(res));
}
}

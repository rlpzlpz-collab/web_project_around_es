interface ApiConfig {
  baseUrl: string;
  headers: Record<string, string>;
}

export interface User {
  name: string;
  about: string;
  avatar: string;
  _id: string;
}

export interface ApiCard {
  isLiked: boolean;
  _id: string;
  name: string;
  link: string;
  owner: string;
  createdAt: string;
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

  getUserInfo(): Promise<User> {
    return fetch(`${this._baseUrl}/users/me`, {
      headers: this._headers,
    }).then((res) => this._checkResponse<User>(res));
  }

  getInitialCards(): Promise<ApiCard[]> {
    return fetch(`${this._baseUrl}/cards`, {
      headers: this._headers,
    }).then((res) => this._checkResponse<ApiCard[]>(res));
  }

  updateUserInfo({
    name,
    about,
  }: {
    name: string;
    about: string;
  }): Promise<User> {
    return fetch(`${this._baseUrl}/users/me`, {
      method: "PATCH",
      headers: this._headers,
      body: JSON.stringify({ name, about }),
    }).then((res) => this._checkResponse<User>(res));
  }

  addCard({ name, link }: { name: string; link: string }): Promise<ApiCard> {
    return fetch(`${this._baseUrl}/cards/`, {
      method: "POST",
      headers: this._headers,
      body: JSON.stringify({ name, link }),
    }).then((res) => this._checkResponse<ApiCard>(res));
  }

  likeCard(cardId: string): Promise<ApiCard> {
    return fetch(`${this._baseUrl}/cards/${cardId}/likes`, {
      method: "PUT",
      headers: this._headers,
    }).then((res) => this._checkResponse<ApiCard>(res));
  }

  unlikeCard(cardId: string): Promise<ApiCard> {
    return fetch(`${this._baseUrl}/cards/${cardId}/likes`, {
      method: "DELETE",
      headers: this._headers,
    }).then((res) => this._checkResponse<ApiCard>(res));
  }

  deleteCard(cardId: string): Promise<unknown> {
  return fetch(`${this._baseUrl}/cards/${cardId}`, {
    method: "DELETE",
    headers: this._headers,
  }).then((res) => this._checkResponse<unknown>(res));
}

updateAvatar(avatar: string): Promise<User> {
  return fetch(`${this._baseUrl}/users/me/avatar`, {
    method: "PATCH",
    headers: this._headers,
    body: JSON.stringify({ avatar }),
  }).then((res) => this._checkResponse<User>(res));
}
}

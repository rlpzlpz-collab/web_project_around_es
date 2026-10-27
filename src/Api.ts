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

  private async _checkResponse<T>(res: Response): Promise<T> {
    if (res.ok) {
      return await res.json();
    }
    throw new Error(`Error: ${res.status}`);
  }

  async getUserInfo(): Promise<UserData> {
    const res = await fetch(`${this._baseUrl}/users/me`, {
      headers: this._headers,
    });
    return await this._checkResponse<UserData>(res);
  }

  async getInitialCards(): Promise<CardData[]> {
    const res = await fetch(`${this._baseUrl}/cards`, {
      headers: this._headers,
    });
    return await this._checkResponse<CardData[]>(res);
  }

  async updateUserInfo(data: UserFormData): Promise<UserData> {
    const res = await fetch(`${this._baseUrl}/users/me`, {
      method: "PATCH",
      headers: this._headers,
      body: JSON.stringify(data),
    });
    return await this._checkResponse<UserData>(res);
  }

  async addCard(data: CardFormData): Promise<CardData> {
    const res = await fetch(`${this._baseUrl}/cards/`, {
      method: "POST",
      headers: this._headers,
      body: JSON.stringify(data),
    });
    return await this._checkResponse<CardData>(res);
  }

  async likeCard(cardId: string): Promise<CardData> {
    const res = await fetch(`${this._baseUrl}/cards/${cardId}/likes`, {
      method: "PUT",
      headers: this._headers,
    });
    return await this._checkResponse<CardData>(res);
  }

  async unlikeCard(cardId: string): Promise<CardData> {
    const res = await fetch(`${this._baseUrl}/cards/${cardId}/likes`, {
      method: "DELETE",
      headers: this._headers,
    });
    return await this._checkResponse<CardData>(res);
  }

  async deleteCard(cardId: string): Promise<unknown> {
    const res = await fetch(`${this._baseUrl}/cards/${cardId}`, {
      method: "DELETE",
      headers: this._headers,
    });
    return await this._checkResponse<unknown>(res);
  }

  async updateAvatar(avatar: string): Promise<UserData> {
    const res = await fetch(`${this._baseUrl}/users/me/avatar`, {
      method: "PATCH",
      headers: this._headers,
      body: JSON.stringify({ avatar }),
    });
    return await this._checkResponse<UserData>(res);
  }
}

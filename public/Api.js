export class Api {
    _baseUrl;
    _headers;
    constructor({ baseUrl, headers }) {
        this._baseUrl = baseUrl;
        this._headers = headers;
    }
    async _checkResponse(res) {
        if (res.ok) {
            return await res.json();
        }
        throw new Error(`Error: ${res.status}`);
    }
    async getUserInfo() {
        const res = await fetch(`${this._baseUrl}/users/me`, {
            headers: this._headers,
        });
        return await this._checkResponse(res);
    }
    async getInitialCards() {
        const res = await fetch(`${this._baseUrl}/cards`, {
            headers: this._headers,
        });
        return await this._checkResponse(res);
    }
    async updateUserInfo(data) {
        const res = await fetch(`${this._baseUrl}/users/me`, {
            method: "PATCH",
            headers: this._headers,
            body: JSON.stringify(data),
        });
        return await this._checkResponse(res);
    }
    async addCard(data) {
        const res = await fetch(`${this._baseUrl}/cards/`, {
            method: "POST",
            headers: this._headers,
            body: JSON.stringify(data),
        });
        return await this._checkResponse(res);
    }
    async likeCard(cardId) {
        const res = await fetch(`${this._baseUrl}/cards/${cardId}/likes`, {
            method: "PUT",
            headers: this._headers,
        });
        return await this._checkResponse(res);
    }
    async unlikeCard(cardId) {
        const res = await fetch(`${this._baseUrl}/cards/${cardId}/likes`, {
            method: "DELETE",
            headers: this._headers,
        });
        return await this._checkResponse(res);
    }
    async deleteCard(cardId) {
        const res = await fetch(`${this._baseUrl}/cards/${cardId}`, {
            method: "DELETE",
            headers: this._headers,
        });
        return await this._checkResponse(res);
    }
    async updateAvatar(avatar) {
        const res = await fetch(`${this._baseUrl}/users/me/avatar`, {
            method: "PATCH",
            headers: this._headers,
            body: JSON.stringify({ avatar }),
        });
        return await this._checkResponse(res);
    }
}

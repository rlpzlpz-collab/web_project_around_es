export class Card {
    _name;
    _link;
    _templateSelector;
    _handleCardClick;
    _element;
    _imageElement;
    _titleElement;
    _likeButton;
    _deleteButton;
    constructor({ name = "Sin título", link = "./images/placeholder.jpg" }, templateSelector, handleCardClick) {
        this._name = name;
        this._link = link;
        this._templateSelector = templateSelector;
        this._handleCardClick = handleCardClick;
        this._element = this._getTemplate();
        this._imageElement = this._query(".card__image");
        this._titleElement = this._query(".card__title");
        this._likeButton = this._query(".card__like-button");
        this._deleteButton = this._query(".card__delete-button");
    }
    getCardElement() {
        this._imageElement.src = this._link;
        this._imageElement.alt = this._name;
        this._titleElement.textContent = this._name;
        this._setEventListeners();
        return this._element;
    }
    _getTemplate() {
        const template = document.querySelector(this._templateSelector);
        const card = template?.content.querySelector(".card");
        if (!card) {
            throw new Error(`No se encontró la plantilla ${this._templateSelector}`);
        }
        return card.cloneNode(true);
    }
    _query(selector) {
        const el = this._element.querySelector(selector);
        if (!el) {
            throw new Error(`No se encontró ${selector} en la tarjeta`);
        }
        return el;
    }
    _setEventListeners() {
        this._likeButton.addEventListener("click", this._handleLikeClick);
        this._deleteButton.addEventListener("click", this._handleDeleteClick);
        this._imageElement.addEventListener("click", this._handleImageClick);
    }
    _handleLikeClick = () => {
        this._likeButton.classList.toggle("card__like-button_is-active");
    };
    _handleDeleteClick = () => {
        this._element.remove();
    };
    _handleImageClick = () => {
        this._handleCardClick(this._name, this._link);
    };
}

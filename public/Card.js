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
    _id;
    _isLiked;
    _handleLike;
    _handleDelete;
    _isOwner;
    constructor({ name = "Sin título", link = "./images/placeholder.jpg", _id, isLiked = false, owner }, templateSelector, handleCardClick, handleLike, handleDelete, isOwner) {
        this._name = name;
        this._link = link;
        this._id = _id;
        this._isOwner = isOwner;
        this._isLiked = isLiked;
        this._handleLike = handleLike;
        this._templateSelector = templateSelector;
        this._handleCardClick = handleCardClick;
        this._handleDelete = handleDelete;
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
        this._renderLike();
        this._setEventListeners();
        if (!this._isOwner) {
            this._deleteButton.remove();
        }
        return this._element;
    }
    _renderLike() {
        this._likeButton.classList.toggle("card__like-button_is-active", this._isLiked);
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
        if (!this._id)
            return;
        this._handleLike(this._id, this._isLiked)
            .then((card) => {
            this._isLiked = card.isLiked ?? false;
            this._renderLike();
        })
            .catch((err) => console.log(err));
    };
    _handleDeleteClick = () => {
        this._handleDelete(this._id ?? "", this._element);
    };
    _handleImageClick = () => {
        this._handleCardClick(this._name, this._link);
    };
}

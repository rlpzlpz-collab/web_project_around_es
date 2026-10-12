export interface CardData {
  name?: string;
  link?: string;
}

export class Card {
  private _name: string;
  private _link: string;
  private _templateSelector: string;
  private _handleCardClick: (name: string, link: string) => void;
  private _element: HTMLElement;
  private _imageElement: HTMLImageElement;
  private _titleElement: HTMLElement;
  private _likeButton: HTMLButtonElement;
  private _deleteButton: HTMLButtonElement;

  constructor(
    { name = "Sin título", link = "./images/placeholder.jpg" }: CardData,
    templateSelector: string,
    handleCardClick: (name: string, link: string) => void
  ) {
    this._name = name;
    this._link = link;
    this._templateSelector = templateSelector;
    this._handleCardClick = handleCardClick;

    this._element = this._getTemplate();
    this._imageElement = this._query<HTMLImageElement>(".card__image");
    this._titleElement = this._query<HTMLElement>(".card__title");
    this._likeButton = this._query<HTMLButtonElement>(".card__like-button");
    this._deleteButton = this._query<HTMLButtonElement>(".card__delete-button");
  }

  public getCardElement(): HTMLElement {
    this._imageElement.src = this._link;
    this._imageElement.alt = this._name;
    this._titleElement.textContent = this._name;
    this._setEventListeners();
    return this._element;
  }

  private _getTemplate(): HTMLElement {
    const template = document.querySelector<HTMLTemplateElement>(
      this._templateSelector
    );
    const card = template?.content.querySelector<HTMLElement>(".card");
    if (!card) {
      throw new Error(`No se encontró la plantilla ${this._templateSelector}`);
    }
    return card.cloneNode(true) as HTMLElement;
  }

  private _query<T extends HTMLElement>(selector: string): T {
    const el = this._element.querySelector<T>(selector);
    if (!el) {
      throw new Error(`No se encontró ${selector} en la tarjeta`);
    }
    return el;
  }

  private _setEventListeners(): void {
    this._likeButton.addEventListener("click", this._handleLikeClick);
    this._deleteButton.addEventListener("click", this._handleDeleteClick);
    this._imageElement.addEventListener("click", this._handleImageClick);
  }

  private _handleLikeClick = (): void => {
    this._likeButton.classList.toggle("card__like-button_is-active");
  };

  private _handleDeleteClick = (): void => {
    this._element.remove();
  };

  private _handleImageClick = (): void => {
    this._handleCardClick(this._name, this._link);
  };
}
export class Popup {
  protected _popup: HTMLElement;

  constructor(popupSelector: string) {
    const popup = document.querySelector<HTMLElement>(popupSelector);
    if (!popup) {
      throw new Error(`No se encontró el popup ${popupSelector}`);
    }
    this._popup = popup;
  }

  public open(): void {
    this._popup.classList.add("popup_is-opened");
    document.addEventListener("keydown", this._handleEscClose);
  }

  public close(): void {
    this._popup.classList.remove("popup_is-opened");
    document.removeEventListener("keydown", this._handleEscClose);
  }

  public setEventListeners(): void {
    const closeButton =
      this._popup.querySelector<HTMLButtonElement>(".popup__close");
    closeButton?.addEventListener("click", () => this.close());

    this._popup.addEventListener("click", (evt: MouseEvent) => {
      if (evt.target === evt.currentTarget) {
        this.close();
      }
    });
  }

  private _handleEscClose = (evt: KeyboardEvent): void => {
    if (evt.key === "Escape") {
      this.close();
    }
  };
}

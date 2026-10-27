export interface UserInfoSelectors {
  nameSelector: string;
  jobSelector: string;
}

export interface UserData {
  name: string;
  job: string;
}

export class UserInfo {
  private _nameElement: HTMLElement;
  private _jobElement: HTMLElement;

  constructor({ nameSelector, jobSelector }: UserInfoSelectors) {
    const nameElement = document.querySelector<HTMLElement>(nameSelector);
    const jobElement = document.querySelector<HTMLElement>(jobSelector);
    if (!nameElement || !jobElement) {
      throw new Error(
        "No se encontraron los elementos de información del usuario",
      );
    }
    this._nameElement = nameElement;
    this._jobElement = jobElement;
  }

  public getUserInfo(): UserData {
    return {
      name: this._nameElement.textContent ?? "",
      job: this._jobElement.textContent ?? "",
    };
  }

  public setUserInfo({ name, job }: UserData): void {
    this._nameElement.textContent = name;
    this._jobElement.textContent = job;
  }
}

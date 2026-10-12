export class UserInfo {
    _nameElement;
    _jobElement;
    constructor({ nameSelector, jobSelector }) {
        const nameElement = document.querySelector(nameSelector);
        const jobElement = document.querySelector(jobSelector);
        if (!nameElement || !jobElement) {
            throw new Error("No se encontraron los elementos de información del usuario");
        }
        this._nameElement = nameElement;
        this._jobElement = jobElement;
    }
    getUserInfo() {
        return {
            name: this._nameElement.textContent ?? "",
            job: this._jobElement.textContent ?? "",
        };
    }
    setUserInfo({ name, job }) {
        this._nameElement.textContent = name;
        this._jobElement.textContent = job;
    }
}

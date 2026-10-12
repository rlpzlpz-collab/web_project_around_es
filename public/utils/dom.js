export function getElement(selector) {
    const element = document.querySelector(selector);
    if (!element) {
        throw new Error(`No se encontró el elemento ${selector}`);
    }
    return element;
}

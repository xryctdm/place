export class AvatarForm {

    constructor(selector, popup, validationMessage, afterSaveHandler) {
        this.selector = selector;
        this.popup = popup;
        this.validationMessage = validationMessage;
        this.afterSaveHandler = afterSaveHandler;
        this.submitButton = document.querySelector('.avatar-popup__button');
        this.addEventListener();
    }

    setData(data) {
        document.querySelector('.user-info__photo').setAttribute('style', `background-image: url(${data.avatar})`);
    }

    getValidateErrorAvatarField() {
        const avatar = document.querySelector('#avatar');

        if (avatar.validity.typeMismatch) {
            return this.validationMessage.linkError;
        } else if (avatar.value.length === 0) {
            return this.validationMessage.required;
        }
        return null;
    }

    validateAvatarField() {
        const errorAvatar = document.querySelector('#error-avatar');
        errorAvatar.textContent = this.getValidateErrorAvatarField();
    }

    isValidField() {
        return this.getValidateErrorAvatarField() === null;
    }

    validate() {
        if (this.isValidField()) {
            this.submitButton.removeAttribute('disabled');
            this.submitButton.classList.add('avatar-popup__button_enabled');
        } else {
            this.submitButton.setAttribute('disabled', true);
            this.submitButton.classList.remove('avatar-popup__button_enabled');
        }
    }

    save(event) {
        event.preventDefault();
        let addedAvatarLink = this.selector.elements.avatar;
        document.querySelector('.user-info__photo').setAttribute('style', `background-image: url(${addedAvatarLink.value})`);
        this.afterSaveHandler(addedAvatarLink.value);
        this.popup.close();
        document.forms.avatar.reset();
        this.submitButton.setAttribute('disabled', true);
        this.submitButton.classList.remove('avatar-popup__button_enabled');        
    }

    addEventListener() {
        this.submitButton.addEventListener('click', (event) => { this.save(event) });
        this.selector.addEventListener('input', () => { this.validate() });
        document.querySelector('#avatar').addEventListener('input', () => { this.validateAvatarField() });
    }
}
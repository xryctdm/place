
export class ProfileForm {

    constructor(selector, popup, validationMessage, afterSaveHandler) {
        this.popup = popup;
        this.selector = selector;
        this.validationMessage = validationMessage;
        this.submitButton = document.querySelector('.edit-popup__button');
        this.afterSaveHandler = afterSaveHandler;
        this.addEventListener();
    }

    setData(data) {
        document.querySelector('.user-info__name').textContent = data.name;
        document.querySelector('.user-info__job').textContent = data.about;
        document.querySelector('.edit-popup__input_type_name').setAttribute('value', data.name);
        document.querySelector('.edit-popup__input_type_job').setAttribute('value', data.about);
    }

    validate() {
        if (this.isValidFields()) {
            this.submitButton.removeAttribute('disabled');
            this.submitButton.classList.add('edit-popup__button_enabled');
        } else {
            this.submitButton.setAttribute('disabled', true);
            this.submitButton.classList.remove('edit-popup__button_enabled');
        }
    }

    isValidFields() {
        return this.getValidateErrorJobField() === null && this.getValidateErrorUsernameField() === null;
    }


    validateUsernameField() {
        const errorPlace = document.querySelector('#error-username');
        errorPlace.textContent = this.getValidateErrorUsernameField();
    }

    validateJobField() {
        const errorLink = document.querySelector('#error-job');
        errorLink.textContent = this.getValidateErrorJobField();
    }

    getValidateErrorUsernameField() {
        const username = document.querySelector('#username');

        if (username.value.length === 0) {
            return this.validationMessage.required;
        } else if (username.value.length < 2 || username.value.length > 30) {
            return this.validationMessage.wrongLength;
        }

        return null;
    }

    getValidateErrorJobField() {
        const job = document.querySelector('#job');

        if (job.value.length === 0) {
            return this.validationMessage.required;
        } else if (job.value.length < 2 || job.value.length > 30) {
            return this.validationMessage.wrongLength;
        }

        return null;
    }


    save(event) {
        event.preventDefault();
        const userInfoName = document.querySelector('.user-info__name');
        const userInfoJob = document.querySelector('.user-info__job');
        const addedName = this.selector.elements.name;
        const addedJob = this.selector.elements.job;

        userInfoName.textContent = addedName.value;
        userInfoJob.textContent = addedJob.value;

        this.popup.close();

        this.afterSaveHandler(addedName.value, addedJob.value);
    }

    addEventListener() {
        this.submitButton.addEventListener('click', (event) => { this.save(event) });
        this.selector.addEventListener('input', () => { this.validate() });
        document.querySelector('#username').addEventListener('input', () => { this.validateUsernameField() });
        document.querySelector('#job').addEventListener('input', () => { this.validateJobField() });
    }
}
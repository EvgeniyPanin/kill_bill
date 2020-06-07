class FormValidator {
  constructor(form, errors) {
    this.form = form;
    this.inputs = [...form.querySelectorAll('input')];
    this.submitButton = form.querySelector('button');
    this.errorMessages = errors;
    this.errorsObj = {};
    this.inputs.forEach(input => {
      this.errorsObj[input.id] = this.form.querySelector(`#${input.id}-error`);
    })
  }
  isValidity = (input) => {
    input.setCustomValidity("");

    if (input.validity.valueMissing) {
      input.setCustomValidity(this.errorMessages.textErrorEmptyString);
      return false
    }

    if (input.validity.tooShort || input.validity.tooLong) {
      input.setCustomValidity(this.errorMessages.textErrorLength);
      return false
    }

    if (input.validity.typeMismatch && input.type === 'url') {
      input.setCustomValidity(this.errorMessages.textErrorURL);
      return false
    }

    return input.checkValidity();
  }

  checkFormValidity(form) {
    return [...this.inputs].every((input) => this.isValidity(input));
  }

  toggleInputError(field) {
    const errorElem = this.errorsObj[field.id];

    //обновляем кастомную ошибку валидации
    this.isValidity(field);

    errorElem.textContent = field.validationMessage;
  }

  handlerInputForm = (evt) => {
    const form = this.form;
    const valid = this.checkFormValidity(form);
    this.toggleInputError(evt.target);

    this.setSubmitButtonState(valid);
  }

  setSubmitButtonState(state) {
    if (state) {
      this.submitButton.removeAttribute('disabled');
      this.submitButton.classList.remove('popup__button_disabled');
    } else {
      this.submitButton.setAttribute('disabled', 'disabled');
      this.submitButton.classList.add('popup__button_disabled');
    }
  }

  setEventListeners() {
    this.inputs.forEach(input => {
      input.addEventListener('input', this.handlerInputForm);
    })

    const cleanErrors = () => {
      for (let key in this.errorsObj) {
        this.form.reset();
        this.errorsObj[key].textContent = '';
      }
    }

    return cleanErrors;
  }
}
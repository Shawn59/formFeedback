import {observable, action, computed} from "mobx"
import Validator from 'validatorjs';
import moment from "moment";
import config from "../config";

class ClientNameStore {
    @observable form = {
        fio: {
            name: 'fio', // имя в DOM
            bdName: 'fieldFio', // название доп поле в таблице
            value: '', // значение по умолчанию
            rules: 'required', // правило валидации
            error: false, // текст ошибки
        },
        telephone: {
            name: 'telephone',
            bdName: 'fieldTelephone',
            value: '',
            rules: 'required',
            error: false,
        },
        countries: {
            name: 'countries',
            bdName: 'field_5',
            value: 1,
            rules: '',
            error: false,
        },
        doorsAndWindows: {
            name: 'doorsAndWindows',
            bdName: 'field_12',
            value: 0,
            rules: '',
            error: false,
        },
        stairs: {
            name: 'stairs',
            bdName: 'field_13',
            value: 0,
            rules: '',
            error: false,
        },
        installDate: {
            name: 'installDate',
            bdName: 'field_14',
            value: moment().unix(),
            rules: '',
            error: false,
            isValid: 0
        },
        message: {
            name: 'message',
            bdName: 'field_15',
            value: '',
            rules: '',
            error: false
        },
    };

    @observable isValidForm = false;
    @observable validatorForm = false;
    @observable iAgree = false;
    @observable isRequestSuccess = false;

    @action setField = (name, value) => {
        if (this.form[name]) {
            this.form[name].value = value;

            this.validatorForm = this.getValidation();
            this.validatorForm.passes();
            this.form[name].error = this.validatorForm.errors.first(name);
        }
    };

    @action setIAgree = (name, value) => {
        this.iAgree = value;
    };

    @action setValidInstallDate = (value) => {
        this.form.installDate.isValid = value;
    };

    @computed get getValidForm() {
        let isValidForm = this.validatorForm ? this.validatorForm.passes() : false;
        return Boolean(isValidForm && this.iAgree && this.form.installDate.isValid);
    };

    getParamsValidation = (key) => {
        let data = {};

        for (let property in this.form) {
            if (this.form[property].rules) {
                data[this.form[property].name] = this.form[property][key];
            }
        }

        return data;
    };

    getValidation = () => {
        let validation = new Validator(
            this.getParamsValidation('value'),
            this.getParamsValidation('rules'),
            {
                required: {
                    string: ''
                },
            }
        );

        return validation;
    };

    submitForm = () => {
        let formData = new FormData();
        for (let property in this.form) {
            formData.append(this.form[property].bdName, this.form[property].value)
        }

        fetch(config.crmDomain, {
            method: 'POST',
            body: formData,
        }).then(response => {
                if (response.status !== 200) {
                    console.log('Looks like there was a problem. Status Code: ' +
                        response.status);
                    return;
                }

                response.json().then(data => {
                    if (data.result === 'success') {
                        this.isRequestSuccess = true;
                    } else {
                        alert(data.errors[0]);
                    }
                });
            }).catch(function(err) {
                console.log('Fetch Error :-S', err);
            });
    }
}

export default new ClientNameStore();
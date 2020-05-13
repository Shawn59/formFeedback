import React, {Fragment} from "react";
import {Box, Button, Grid} from "@material-ui/core";
import {withStyles} from '@material-ui/core/styles';
import style from "../main.scss";
import {observer} from "mobx-react";
import clientNameStore from "../stores/clientNameStore";
import InputText from '../controls/inputText';
import Select from '../controls/select';
import Checkbox from '../controls/checkbox';
import Typography from '@material-ui/core/Typography';
import TextArea from "../controls/inputTextArea";
import DatePicker from "../controls/datePicker";
import Logo from "../img/logo.svg";
import Recaptcha from 'react-google-invisible-recaptcha';
import Config from "../config";

const CssBoxForm = withStyles({
    root: {
        display: 'flex',
        flexDirection: 'column',
        width: '320px',
        padding: '30px 40px 26px',
        background: 'rgba(0,0,0,.5)',

        '@media(max-width: 680px)': {
            width: '100%',
            padding: '10px 20px',
            background: 'transparent',
        }
    }
})(Box);

const CssBoxInput = withStyles({
    root: {
        marginBottom: 10,
        width: '100%'
    }
})(Box);

const CssBoxCheckbox = withStyles({
    root: {
        display: 'flex',
        flexWrap: 'wrap',
        marginBottom: 20
    }
})(Box);

const CssBoxLink = withStyles({
    root: {
        display: 'flex',
        flexDirection: 'column',
        flexWrap: 'wrap',
        marginTop: 10,
        marginLeft: 30,

        '& a': {
            color: 'white',
            fontSize: 12,
            marginBottom: 10
        }
    }
})(Box);

const CssButton = withStyles({
    root: {
        color: 'white',
        border: '1px solid rgba(255, 255, 255, 0.6)',
        width: '100%',
        height: 44,

        '&.MuiButton-root.Mui-disabled': {
            border: '1px solid rgba(255, 255, 255, 0.2)',
            color: 'rgba(255, 255, 255, 0.2)'
        }
    }
})(Button);

const CssTypography = withStyles({
    root: {
        color: '#F9F9F9'
    }
})(Typography);

const CssRequisitesTypography = withStyles({
    root: {
        fontSize: 12,
        '@media(max-width: 680px)': {
            textAlign: 'center',
        }
    }
})(Typography);

const CssGrid = withStyles({
    root: {
        display: 'flex',
        width: '100%',
    }
})(Grid);

const CssMainFormGrid = withStyles({
    root: {
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
        minHeight: '100vh',
        
        '@media(max-width: 680px)': {
            width: '100%',
        }
    }
})(Grid);

const CssBoxLogo = withStyles({
    root: {
        marginRight: 50,
        '@media(max-width: 680px)': {
            display: 'none'
        }
    }
})(Box);

const CssBoxInfo = withStyles({
    root: {
        marginLeft: 140,
        display: 'flex',
        flexDirection: 'column',
        marginTop: 18,

        '& a': {
            color: 'white',
            lineHeight: '24px',
            textDecoration: 'none'
        },

        '@media(max-width: 680px)': {
            display: 'none'
        }
    }
})(Box);

const CssBoxInfoIsMobile = withStyles({
    root: {
        display: 'flex',
        flexDirection: 'column',
        marginTop: 18,

        '& a': {
            color: 'white',
            lineHeight: '24px',
            textDecoration: 'none'
        },
    }
})(Box);

const CssBoxFooter = withStyles({
    root: {
        display: 'flex',
        margin: '10px 0px',
        color: 'white',

        '& a': {
            color: 'white',
            textDecoration: 'underline',
            marginRight: 38
        },

        '@media(max-width: 680px)': {
            flexDirection: 'column',
            padding: '10px 20px',
            fontSize: 14,
            '& a': {
                marginBottom: 10
            }
        }
    }
})(Box);

const CssHeaderInfoBox = withStyles({
    root: {
        display: "none",

        '@media(max-width: 680px)': {
            display: 'flex',
            justifyContent: 'space-between',
            padding: '10px 20px',
        }
    }
})(Box);

const CssBoxContent = withStyles({
    root: {
        width: '100%',
        height: '100%'
    }
})(Box);

// страны
const countries = [
    {
        id: 1,
        value: 'Нет города',
    },
    {
        id: 2,
        value: 'Москва',
    },
    {
        id: 3,
        value: 'Санкт-Петербург',
    }
];

@observer
class ClientNameForm extends React.Component {

    constructor(props) {
        super(props);
        // не отправляю в запросе по просьбе заказчика
        this.sitekey = '6LdlIe8UAAAAAFVrjDPWvOkQlZ4YHGbqvTRM5QpR'// ключ капчи. Получить его можно тут https://www.google.com/recaptcha/admin/create
    }

    onSubmit = () => {
        if (this.recaptcha.execute) {
            // при успешно выполнении без ошибок вызовет колбек onResolved
            this.recaptcha.execute();
        }
    };

    // отработает после проверки капчи
    onResolved = () => {
        this.recaptcha.reset();
        // запрос аякс
        clientNameStore.submitForm();
    };

    getForm = () => {
        return (
            <CssBoxForm className={style.common_form}>
                <span className={style.title}>Форма связи</span>
                <CssBoxInput>
                    <InputText
                        label="Имя*"
                        name={clientNameStore.form.fio.name}
                        model={clientNameStore.form.fio.value}
                        error={clientNameStore.form.fio.error}
                        action={clientNameStore.setField}
                        theme="grey"
                    />
                </CssBoxInput>

                <CssBoxInput>
                    <InputText
                        label="Телефон*"
                        name={clientNameStore.form.telephone.name}
                        model={clientNameStore.form.telephone.value}
                        error={clientNameStore.form.telephone.error}
                        action={clientNameStore.setField}
                        theme="grey"
                    />
                </CssBoxInput>

                <CssBoxInput>
                    <Select
                        label="Страна"
                        name={clientNameStore.form.countries.name}
                        selectValue={clientNameStore.form.countries.value}
                        error={clientNameStore.form.countries.error}
                        action={clientNameStore.setField}
                        optionsData={countries} // массив из обьектов
                        optionValue={"id"} // внутреннее значение опций
                        optionName={"value"} // текстовое значение опций
                        theme="grey"
                    />
                </CssBoxInput>

                <CssBoxInput>
                    <CssTypography>Выберите пакет услуг: </CssTypography>
                    <CssBoxCheckbox>
                        <Checkbox
                            label="Двери и окна"
                            name={clientNameStore.form.doorsAndWindows.name}
                            action={clientNameStore.setField}
                        />
                        <Checkbox
                            label="Услуги"
                            name={clientNameStore.form.stairs.name}
                            action={clientNameStore.setField}
                        />
                    </CssBoxCheckbox>
                </CssBoxInput>

                <CssBoxInput>
                    <DatePicker
                        label="Дата установки"
                        name={clientNameStore.form.installDate.name}
                        model={clientNameStore.form.installDate.value}
                        error={clientNameStore.form.installDate.error}
                        action={clientNameStore.setField}
                        checkvalid={clientNameStore.setValidInstallDate}
                        isvalidate={clientNameStore.form.installDate.isValid}
                    />
                </CssBoxInput>

                <CssBoxInput>
                    <TextArea
                        label="Сообщение"
                        name={clientNameStore.form.message.name}
                        model={clientNameStore.form.message.value}
                        error={clientNameStore.form.message.error}
                        action={clientNameStore.setField}
                    />
                </CssBoxInput>

                <CssBoxInput>
                    <Checkbox
                        label="Я соглашаюсь с документами:"
                        name={"iAgree"}
                        action={clientNameStore.setIAgree}
                    />
                    <CssBoxLink>
                        <a href="https://yandex.ru/">Персональные данные</a>
                        <a href="https://yandex.ru/">Соглашение с клиентом</a>
                    </CssBoxLink>
                </CssBoxInput>

                <CssBoxInput>
                    <CssButton
                        disabled={!clientNameStore.getValidForm}
                        onClick={this.onSubmit}
                    >
                        Отправить
                    </CssButton>
                </CssBoxInput>
            </CssBoxForm>
        )
    };

    getMessageSuccess = () => {
        return (
            <CssBoxForm>
                <h1>Спасибо</h1>
                <p>Мы получили вашу заявку. Теперь нужно дождаться ответа (в течении 1-2 часов).</p>
                <p>Вы можете получить бесплатную консультацию по вопросам каждый четверг.</p>
                <p>Если остались вопросы, свяжитесь с нами по почте info@domain.com</p>
            </CssBoxForm>
        );
    };

    render() {
        return (
            <Fragment>
                <CssMainFormGrid>
                    <CssBoxContent>
                        <CssHeaderInfoBox>
                            <a href="https://yandex.ru/" target="_blank">
                                <img src={Logo}/>
                            </a>
                            <CssBoxInfoIsMobile>
                                <a href="tel:+79000000000">+7 923 654 102</a>
                                <a href="mailto:info@domain.com">info@domain.com</a>
                            </CssBoxInfoIsMobile>
                        </CssHeaderInfoBox>

                        <CssGrid>
                            <CssBoxLogo>
                                <a href="https://yandex.ru/" target="_blank">
                                    <img src={Logo}/>
                                </a>
                            </CssBoxLogo>

                            {clientNameStore.isRequestSuccess ? this.getMessageSuccess() : this.getForm()}

                            <CssBoxInfo>
                                <a href="tel:+79000000000">+7 923 654 102</a>
                                <a href="mailto:info@domain.com">info@domain.com</a>
                            </CssBoxInfo>
                        </CssGrid>

                        <Box>
                            <Recaptcha
                                ref={(ref) => this.recaptcha = ref}
                                sitekey={Config.captchaSiteKey}
                                onResolved={this.onResolved}
                                locale="ru"
                            />
                        </Box>
                    </CssBoxContent>
                    <CssBoxFooter>
                        <a href="http://google.com" target="_blank">Сайт Google</a>
                        <a href="http://google.com" target="_blank">Связаться с нами</a>
                        <a href="http://google.com" target="_blank">Новости компании</a>
                        <a href="http://google.com" target="_blank">Зарегистрироваться</a>

                        <CssRequisitesTypography>© 2020 Google inc.</CssRequisitesTypography>
                    </CssBoxFooter>
                </CssMainFormGrid>
            </Fragment>
        );
    }
}

export default ClientNameForm;
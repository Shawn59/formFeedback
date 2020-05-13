import React from 'react';
import MomentUtils from '@date-io/moment';
import moment from 'moment';
import {
    MuiPickersUtilsProvider,
    KeyboardDatePicker
} from '@material-ui/pickers';
import {withStyles} from '@material-ui/core/styles';
import {createMuiTheme, Box} from "@material-ui/core";
import {ThemeProvider} from "@material-ui/styles";
import {observer} from "mobx-react";
import mainStyle from "../main.scss";

let style = {
    labelColor: 'white',
    eye: 'rgba(255, 255, 255, 0.5)',
    labelColor_focused: 'white',
    inputBorderBottomColor: '#CBCCD0',
    inputTextColor: 'white',
    inputBorderBottomColor_hover: '1px solid rgba(255, 255, 255, 0.2)',
    inputBorderBottomColor_before: '1px solid #CBCCD0',
    inputBorderBottomColor_after: '2px solid white',
    inputMaxHeight: '19px',
    inputMinHeight: '19px',
    lineHeight: '19px',
    inputFontSize: '16px',
    errorColor: '#eb4444',
    fontSize: '14px',
    calendar: {
        toolbarBackgroundColor: '#555E6F',
        dayColor: 'rgba(0, 0, 0, 0.85)',
        daySelected: '#555E6F',
        dayDisabled: 'rgba(0, 0, 0, 0.25)',

        current: {
            color: 'red',
        },

        dialogAction: {
            color: 'red',
        },
    }
};

const materialTheme = createMuiTheme({
    overrides: {
        MuiPickersToolbar: {
            toolbar: {
                backgroundColor: style.calendar.toolbarBackgroundColor
            },
        },
        MuiPickersCalendarHeader: {
            switchHeader: {},
        },
        MuiPickersDay: {
            day: {
                color: style.calendar.dayColor,
            },
            daySelected: {
                backgroundColor: style.calendar.daySelected,
                "&:hover": {
                    backgroundColor: '#4A5265',
                }
            },
            dayDisabled: {
                color: 'red',
            },
            current: {
                color: 'white',
                backgroundColor: 'rgba(85, 94, 111, 0.12)',
            },
        },

        MuiPickersToolbarButton: {
            toolbarBtn: {
                width: '100%'
            }
        },

        MuiButton: {
            textPrimary: {
                color: '#4A5265',
            }
        },

        MuiDialogActions: {
            spacing: {
                display: 'none'
            }
        }
    },
});

let CssKeyboardDatePicker = "";
let CssBox = '';

// Дока https://material-ui-pickers.dev/api/KeyboardDatePicker

@observer
class DatePicker extends React.Component {

    constructor(props) {
        super(props);
        this.dataPikerRef = React.createRef();
        this.err = "";

        CssKeyboardDatePicker = withStyles({
                root: {

                    width: '100%',
                    flex: 1,
                    height: '100%',
                    paddingBottom: '20px',

                    '& .MuiInputLabel-root': {
                        color: 'rgba(255, 255, 255, 0.5)'
                    },

                    '& .MuiInput-underline:after': {
                        borderBottom: style.inputBorderBottomColor_after,
                    },

                    '& .MuiInputBase-root': {
                        fontSize: style.fontSize,
                        color: 'white'
                    },

                    '& .MuiInputBase-input': {
                        maxHeight: style.inputMaxHeight,
                        minHeight: style.inputMinHeight,
                    },

                    '& .MuiInput-underline:hover:not(.Mui-disabled):before': {
                        borderBottom: style.inputBorderBottomColor_hover,
                    },

                    '& .MuiInput-underline:before': {
                        borderBottom: style.inputBorderBottomColor_before,
                    },

                    '& .MuiInput-underline.Mui-error:after': {
                        transform: 'scaleX(1)',
                        borderBottomColor: style.errorColor
                    },

                    '& .MuiFormLabel-root.Mui-error': {
                        color: style.errorColor,
                    },

                    '& .MuiInputLabel-shrink': {
                        marginTop: '4px',
                        color: style.labelColor
                    },

                    '& .MuiInputAdornment-positionEnd': {
                        marginLeft: '2px'
                    },

                    '& .MuiFormLabel-root.Mui-focused': {
                        transform: 'translate(0px, 1.5px) scale(0.75) !important'
                    },

                    '& .MuiFormHelperText-root': {
                        color: 'rgb(235, 68, 68)',
                        position: "absolute",
                        marginTop: "50px",
                    },

                    '& .MuiIconButton-label': {
                        color: 'rgba(255, 255, 255, 0.6)',
                    },

                    '& img': {
                        borderRadius: '0px',
                    },
                },
            },
        )(KeyboardDatePicker);

        CssBox = withStyles({
            root: {
                width: '100%',
                outline: 'none',
                flex: 1,
            },
        })(Box);
    }

    render() {
        const {
            label,
            model,
            checkvalid,
            isvalidate,
            action,
            maxDate = moment('01.01.2100', 'DD.MM.YYYY').toDate(),
            minDate = moment('01.01.1900', 'DD.MM.YYYY').toDate(),
            minDateMessage = "Дата не может быть меньше '01.01.1900'",
            maxDateMessage = "Дата не может быть больше '01.01.2100'",
            format = "DD.MM.YYYY",
            ...rest
        } = this.props;

        let selectedDate = '';

        if (model) {
            if (model || model.isValid && model.isValid()) {
                selectedDate = !isNaN(+model) ? moment(+model * 1000).toDate() : moment(model, 'DD.MM.YYYY').toDate();
            }
        }

        const handleDateChange = (date) => {
            if (date) {
                this.props.action(this.props.name, date.unix());
            }
        };

        const handleDateBlur = (event) => {
            // почему то при выделенной всей даты onChange не срабатывает. Проблема библы, поэтому страхуемся.
            if (!event.currentTarget.value) {
                this.props.action(this.props.name, NaN);
            }
            changeFixPositionLabel();
        };

        const handleDateError = (error, data) => {
            this.err = error;
            this.props.checkvalid(error === "" && data ? 1 : 0);
            changeFixPositionLabel();
        };

        const changeFixPositionLabel = () => {
            let inputDate = this.dataPikerRef.current.querySelector('input');
            let labelDate = this.dataPikerRef.current.querySelector('label');
            if (inputDate && labelDate) {
                labelDate.style.color = this.err ? style.errorColor : style.labelColor;
                if (inputDate.defaultValue && !inputDate.classList.contains("MuiInputLabel-shrink")) {
                    labelDate.classList.add("MuiInputLabel-shrink");
                    labelDate.style.transform = "translate(0, 1.5px) scale(0.75)";
                    labelDate.style.marginTop = "4px";
                } else if (!inputDate.defaultValue) {
                    if (inputDate.classList.contains("MuiInputLabel-shrink")) {
                        labelDate.classList.remove("MuiInputLabel-shrink");
                    }
                    labelDate.style.transform = "translate(0px, 24px) scale(1)";
                    labelDate.style.marginTop = "4px";
                }
            }
        };

        return (
            <React.Fragment>
                <CssBox ref={this.dataPikerRef}>
                    <MuiPickersUtilsProvider utils={MomentUtils} locale={"ru"}>
                        <ThemeProvider theme={materialTheme}>
                            <CssKeyboardDatePicker
                                autoOk
                                animateYearScrolling
                                inputVariant='standard'
                                value={selectedDate}
                                format={format}
                                invalidDateMessage={"Дата введена некорректно. Пример '20.12.2020'"}
                                label={label}
                                views={["year", "month", "date"]}
                                onChange={(date) => handleDateChange(date)}
                                onBlur={handleDateBlur}
                                onError={handleDateError}
                                className={this.err ? mainStyle.dataPickerBorderError : ''}
                                maxDate={maxDate}
                                minDate={minDate}
                                minDateMessage={minDateMessage}
                                maxDateMessage={maxDateMessage}
                                {...rest}
                            />
                        </ThemeProvider>
                    </MuiPickersUtilsProvider>
                </CssBox>
            </React.Fragment>
        );
    }
}

export default DatePicker;

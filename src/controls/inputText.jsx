import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import {observer} from "mobx-react";
import Box from "@material-ui/core/Box/index";

// общие стили
let style = {
    errorColor: '#eb4444',
};

let CssTextField = '';
let CssBox = '';

// Разобраться, можно ли лишить проблему с фокусом, если сделать компонент функцией

@observer
export default class TextInput extends React.Component {

    constructor(props) {
        super(props);
        this.isAutoFocus = false;
        // общие стили

        switch (props.theme) {
            case 'grey': {
                style.labelColor = '#F9F9F9';
                style.labelColor_focused = '#F9F9F9';
                style.inputTextColor = 'white';
                style.inputBorderBottomColor_after = 'white';
                style.inputBorderBottomColor_hover = '1px solid rgba(255, 255, 255, 0.2)';
                style.inputBorderBottomColor_before = '1px solid rgba(255, 255, 255, 0.6)';
                style.fontSize = '15px';
                break;
            }
            default: {
                style.labelColor = 'rgba(255, 255, 255, 0.6)';
                style.labelColor_focused = 'white';
                style.inputTextColor = 'white';
                style.inputBorderBottomColor_after = 'white';
                style.inputBorderBottomColor_hover = '1px solid rgba(255, 255, 255, 0.2)';
                style.inputBorderBottomColor_before = '1px solid rgba(255, 255, 255, 0.6)';
                style.fontSize = 'inherit';
                break;
            }
        }

        CssTextField = withStyles({
            root: {
                width: '100%',
                outline: 'none',
                flex: 1,

                '& label.Mui-focused': {
                    color: style.labelColor_focused,
                },

                '& .MuiInput-underline:after': {
                    borderBottomColor: style.inputBorderBottomColor_after,
                },

                '& .MuiFormLabel-root': {
                    color: style.labelColor,
                },

                '& .MuiInputBase-root': {
                    color: style.inputTextColor,
                    fontSize: style.fontSize,
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
                    color: style.errorColor
                },

                '& .MuiInputLabel-shrink': {
                    marginTop: '4px'
                },

                '& .Mui-disabled': {
                    color: 'rgba(51, 51, 51, 0.6)'
                }
            },
        })(TextField);

        CssBox = withStyles({
            root: {
                width: '100%',
                outline: 'none',
                flex: 1,
            },
        })(Box);
    }

    handleBlur = (e) => {
        this.props.action(e.target.name, e.target.value);
    };

    handleChange = (e) => {
        this.props.action(e.target.name, e.target.value);
        // Пока что рабочий костыль. Не понятно почему реакт вместо того, чтобы перерисовывать, пересоздаёт компоненты в виртуальном дом дереве, внутри вьюх.
        // При чём последний из аналогичных компонентов судя по всему всётаки перерисовывается и фокус не теряет при первом вводе или потере фокуса(перерисовке)
        // Разобраться с этим позже, когда будет больше времени на анализ и желания :D.
        this.isAutoFocus = true;
    };

    render() {
        const {action, model, label, error, ...rest } = this.props;

        const inputPropsDefault = {
            maxLength: 255,
            autoComplete: 'off'
        };
        return (
            <React.Fragment>
                <CssBox>
                    <CssTextField
                        value={model}
                        label={label}
                        onChange={this.handleChange}
                        error={error !== false}
                        autoFocus={this.isAutoFocus}
                        {...rest}
                        onBlur={this.handleBlur}
                        inputProps={inputPropsDefault}
                    />
                    <div className={'errorCtrl'}
                         style={{
                             color: style.errorColor,
                             fontSize: '12px',
                             lineHeight: '14px',
                             overflow: 'hidden',
                             transition: 'opacity .3s, max-height .3s',
                             opacity: error ? 1 : 0,
                             marginTop: 0,
                             paddingTop: '5px',
                             minHeight: '15px',
                         }}> {error}
                    </div>
                </CssBox>
            </React.Fragment>
        );
    }
};

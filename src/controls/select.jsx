import React from 'react';
import InputLabel from '@material-ui/core/InputLabel/index';
import MenuItem from '@material-ui/core/MenuItem/index';
import FormControl from '@material-ui/core/FormControl/index';
import Select from '@material-ui/core/Select/index';
import {withStyles} from '@material-ui/core/styles';
import Input from '@material-ui/core/Input/index';
import Box from "@material-ui/core/Box/index";

const ControlledOpenSelect = (props) => {
    const [open, setOpen] = React.useState(false);
    const {optionsData, optionValue, theme, optionName, selectValue, action, label, error, ...rest} = props;

    let style = {
        labelColor: 'rgba(255, 255, 255, 0.6)',
        arrowColor: 'rgba(255, 255, 255, 0.6)',
        labelColor_focused: 'white',
        inputBorderBottomColor: 'white',
        inputTextColor: 'white',
        inputBorderBottomColor_hover: '1px solid rgba(255, 255, 255, 0.2)',
        inputBorderBottomColor_before: '1px solid rgba(255, 255, 255, 0.6)',
        disabledColor: 'rgba(51, 51, 51, 0.6)',
        errorColor: '#eb4444',
    };

    switch (theme) {
        case 'grey': {
            style.arrowColor = '#F9F9F9';
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
            style.arrowColor = 'rgba(255, 255, 255, 0.6)';
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

    const SelectFormControl = withStyles({

        root: {
            width: '100%',
            height: '100%',
            flex: 1,

            '& .MuiInputBase-root': {
                height: '32px',
                marginTop: '16px',
                color: style.inputTextColor,
                fontSize: style.fontSize,
            },

            '& label.Mui-focused': {
                color: style.labelColor_focused,
            },

            '& .MuiInput-underline:after': {
                borderBottomColor: style.inputBorderBottomColor_after,
            },

            '& .MuiFormLabel-root': {
                color: style.labelColor
            },

            '& .MuiInput-underline:hover:not(.Mui-disabled):before': {
                borderBottom: style.inputBorderBottomColor_hover,
            },

            '& .MuiInput-underline:before': {
                borderBottom: style.inputBorderBottomColor_before,
            },

            '& .MuiSelect-icon': {
                color: style.arrowColor
            },

            '& .MuiInputLabel-shrink': {
                marginTop: '4px'
            },

            '& .MuiSelect-select:focus': {
                backgroundColor: 'rgba(0, 0, 0, 0)'
            },

            '& .Mui-disabled': {
                color: style.disabledColor
            }
        }

    })(FormControl);

    const CssBox = withStyles({
        root: {
            width: '100%',
            outline: 'none',
            flex: 1,
        },
    })(Box);

    function handleChange(event) {
        action(event.target.name, event.target.value);
    }

    function handleClose(event) {
        setOpen(false);
    }

    function handleOpen() {
        setOpen(true);
    }

    return (
        <React.Fragment>
            <CssBox>
                <SelectFormControl>
                        <InputLabel>{label}</InputLabel>
                    <Select
                        error={error !== false}
                        open={open}
                        onOpen={handleOpen}
                        onClose={handleClose}
                        value={selectValue}
                        onChange={handleChange}
                        input={<Input/>}
                        {...rest}
                    >
                        {optionsData && optionsData.length > 0 && optionsData.map((item) => (
                            <MenuItem key={'option' + item[optionValue]} value={item[optionValue]}>
                                {item[optionName]}
                            </MenuItem>
                        ))}
                    </Select>

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
                         }}
                    >
                        {error}
                    </div>
                </SelectFormControl>
            </CssBox>
        </React.Fragment>
    );
};

export default ControlledOpenSelect;

import React from 'react';
import {withStyles} from '@material-ui/core/styles';
import { FormGroup, FormControlLabel } from '@material-ui/core';
import Checkbox from '@material-ui/core/Checkbox';
import CheckBoxOutlineBlankIcon from '@material-ui/icons/CheckBoxOutlineBlank';
import CheckBoxIcon from '@material-ui/icons/CheckBox';

const CssFormGroup = withStyles({
    root: {
        marginRight: 30,
        marginTop: 10,

        '& .MuiCheckbox-root': {
            color: '#C4C4C4',
            padding: 0
        },
        '& .MuiCheckbox-colorSecondary.Mui-checked': {
            color: '#5DBA40',
            '& .MuiIconButton-label': {
                backgroundColor: 'white',
            }
        },

        '& .MuiIconButton-label': {
            width: '15px',
            height: '15px'
        },

        '& .MuiSvgIcon-root': {
            fontSize: '26px',
        },

        '& .MuiTypography-root.MuiFormControlLabel-label.MuiTypography-body1': {
            marginLeft: '17px',
            fontSize: 15,
        },

        '& .MuiFormControlLabel-root': {
            marginLeft: 0,
            marginRight: 0
        }
    }
})(FormGroup);

const ControlledCheckbox = props => {
    const {label, theme, action, ...rest } = props;
    let themeType = theme || 'grey';
    let themeColor = {color: '#C4C4C4'};

    switch (themeType) {
        case 'grey':
            themeColor.color = '#C4C4C4';
            break;
        case 'red':
            themeColor.color = '#f44336';
            break;
    }

    const handleClick = (event) => {
        if (event.target.checked !== undefined) {
            action(event.target.name, event.target.checked);
        }
    };

    return (
        <CssFormGroup row>
            <FormControlLabel
                control={
                    <Checkbox
                        color="secondary"
                        icon={<CheckBoxOutlineBlankIcon/>}
                        checkedIcon={<CheckBoxIcon/>}
                        onClick={handleClick}
                        {...rest}
                    />
                }
                label={label}
            />
        </CssFormGroup>
    );
};

export default ControlledCheckbox;

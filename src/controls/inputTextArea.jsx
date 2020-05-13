import React, { PureComponent } from "react";
import { withStyles } from "@material-ui/core/styles";
import TextField from "@material-ui/core/TextField";

const labelStyle = {
    color: "#F9F9F9",
    fontSize: "15px",
    lineHeight: "16px",
    letterSpacing: "0.03em",
    width: "100%"
};

let CustomTextarea = "";

export default class InputTextarea extends PureComponent {
    constructor(props) {
        super(props);

        CustomTextarea = withStyles({
            root: {

                "& .MuiOutlinedInput-root": {
                    margin: "10px 0 5px",
                    padding: "8px",
                    color: 'white'
                },
                "& .MuiOutlinedInput-root.Mui-focused .MuiOutlinedInput-notchedOutline": {
                    border: "2px solid #CBCCD0 !important"
                },

                "& .MuiOutlinedInput-root:hover .MuiOutlinedInput-notchedOutline": {
                    border: "1px solid rgba(255, 255, 255, 0.2)"
                },

                "& .MuiOutlinedInput-root .MuiOutlinedInput-notchedOutline": {
                    border: "1px solid rgba(255, 255, 255, 0.6)"
                },

                "& .MuiOutlinedInput-root.Mui-error .MuiOutlinedInput-notchedOutline": {
                    borderColor: "#eb4444",
                    borderWidth: "2px"
                }
            }
        })(TextField);
    }

    handleBlur = e => {
        this.props.action(e.target.name, e.target.value, true);
    };

    handleChange = e => {
        this.props.action(e.target.name, e.target.value);
    };

    render() {
        const { label, model = "", name, error, disabled = false, inputProps } = this.props;
        const inputPropsDefault = {
            maxLength: 500
        };
        return (
            <React.Fragment>
                <label
                    style={{
                        color: labelStyle.color,
                        fontSize: labelStyle.fontSize,
                        lineHeight: labelStyle.lineHeight,
                        letterSpacing: labelStyle.letterSpacing,
                        width: labelStyle.width
                    }}
                >
                    {label}
                </label>
                <CustomTextarea
                    multiline
                    rows="7"
                    variant="outlined"
                    fullWidth
                    error={error !== false}
                    value={model}
                    name={name}
                    onBlur={this.handleBlur}
                    onChange={this.handleChange}
                    disabled={disabled}
                    inputProps={inputProps || inputPropsDefault}
                />
                <div
                    className={"errorCtrl"}
                    style={{
                        color: "#eb4444",
                        fontSize: "12px",
                        lineHeight: "14px",
                        overflow: "hidden",
                        transition: "opacity .3s, max-height .3s",
                        opacity: error ? 1 : 0,
                        marginTop: 0,
                        paddingTop: "5px",
                        minHeight: "15px"
                    }}
                >
                    {error}
                </div>
            </React.Fragment>
        );
    }
}

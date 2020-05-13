import React from "react";
import ClientForm from "./views/clientNameForm";
import {withStyles} from "@material-ui/core/styles";
import {Box} from "@material-ui/core";

const CssMainBox = withStyles({
    root: {
        display: 'flex',
        width: '100%',
        justifyContent: 'center',

        '@media(max-width: 680px)': {
            justifyContent: 'flex-start'
        }
    }
})(Box);

const App = () => {

    return (
        <React.Fragment>
            <CssMainBox>
                <ClientForm/>
            </CssMainBox>
        </React.Fragment>
    )
};

export default App;
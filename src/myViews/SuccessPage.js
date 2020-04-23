import React from 'react';
import { Button } from '@material-ui/core';
import { withRouter } from 'react-router-dom';

const SuccessPage = props => {
    return (
        <React.Fragment>
            <h3>Zahlung erfolgreich abgeschlossen! :)</h3>
            <Button onClick={() => props.history.push("/")} >Zurück zur Hauptseite</Button>
        </React.Fragment>
    )
}

export default withRouter(SuccessPage);
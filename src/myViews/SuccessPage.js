import React from "react";
// nodejs library that concatenates classes
import classNames from "classnames";
import { makeStyles } from "@material-ui/core/styles";
import { Link } from "@material-ui/core";
import Typography from "@material-ui/core/Typography";
import Button from "components/CustomButtons/Button.js";
// core components
import GridContainer from "components/Grid/GridContainer.js";
import GridItem from "components/Grid/GridItem.js";

const useStyles = makeStyles((theme) => ({
  root: {
    padding: theme.spacing(3, 2),
    height: 200,
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
  },
}));

const SuccessPage = () => {
  const classes = useStyles();

  return (
    <GridContainer>
      <GridItem
        md={8}
        sm={8}
        className={classNames(
          classes.mrAuto,
          classes.mlAuto,
          classes.textCenter
        )}
        style={{
          position: "absolute",
          left: "50%",
          top: "50%",
          transform: "translate(-50%, -50%)",
        }}
      >
        <Typography variant="h5" component="h3">
          Die Zahlung wurde erfolgreich abgeschlossen. Vielen Dank für Ihre
          Bestellung!
        </Typography>
        <br />
        <br />
        <Link href="/">
          <Button color="primary" size="lg" round>
            Zurück zur Hauptseite
          </Button>
        </Link>
      </GridItem>
    </GridContainer>
  );
};

export default SuccessPage;

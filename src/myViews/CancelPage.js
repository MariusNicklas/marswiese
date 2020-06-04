import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import { Link } from "@material-ui/core";
import Paper from "@material-ui/core/Paper";
import Typography from "@material-ui/core/Typography";
import Button from "components/CustomButtons/Button.js";

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

const CancelPage = () => {
  const classes = useStyles();

  return (
    <div>
      <Paper className={classes.root}>
        <Typography variant="h5" component="h3">
          Zahlung abgebrochen
        </Typography>
        <Link href="/">
          <Button color="primary" size="lg" round>
            Zurück zur Hauptseite
          </Button>
        </Link>
      </Paper>
    </div>
  );
};

export default CancelPage;

import React, { useContext } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableRow from "@material-ui/core/TableRow";
import Paper from "@material-ui/core/Paper";
import Button from "@material-ui/core/Button";
import DataContext from "./DataContext";

const useStyles = makeStyles({
  root: {
    width: "100%",
    overflowX: "auto"
  },
  table: {
    minWidth: 650
  }
});

function createData(name, value) {
  return { name, value };
}

export default function SummaryTable(props) {
  const classes = useStyles();

  const { state } = useContext(DataContext);

  const rows = [
    createData("Vorname", state.firstName),
    createData("Nachname", state.lastName),
    createData("Email", state.email),
    createData("Straße", state.street),
    createData("PLZ", state.zip),
    createData("Stadt", state.city)
  ];

  return (
    <React.Fragment>
      <Paper className={classes.root}>
        <Table className={classes.table} aria-label="simple table">
          <TableBody>
            {rows.map(row => (
              <TableRow key={row.name}>
                <TableCell component="th" scope="row">
                  {row.name}
                </TableCell>
                <TableCell align="left">{row.value}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </Paper>

      <Button variant="contained" color="primary" onClick={props.handleBack}>
        Zurück
      </Button>

      <Button
        variant="contained"
        color="primary"
        onClick={props.handleSubmit}
        disabled={props.isSubmitting}
      >
        Abschicken
      </Button>
    </React.Fragment>
  );
}

import React, { useContext, useEffect, useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import { getAllCampWeeks } from "../../../APIUtils";
import { Select, MenuItem, Grid } from "@material-ui/core/";
import CampCreationContext from "../CampCreationContext";
import campsStyle from "assets/jss/material-kit-pro-react/views/campsStyle.js";

const useStyles = makeStyles(campsStyle);

const CampPickWeek = () => {
  const classes = useStyles();

  const { state, dispatch } = useContext(CampCreationContext);
  const [weeks, setWeeks] = useState([]);

  useEffect(() => {
    (async () => {
      const campWeeksData = await getAllCampWeeks();
      setWeeks(campWeeksData.weeks);
    })();
  }, []);

  const formatDate = date => {
    var monthNames = [
      "Januar",
      "Februar",
      "März",
      "April",
      "Mai",
      "Juni",
      "Juli",
      "August",
      "September",
      "Oktober",
      "November",
      "Dezember"
    ];

    var day = date.getDate();
    var monthIndex = date.getMonth();
    var year = date.getFullYear();

    return day + ". " + monthNames[monthIndex] + " " + year;
  };

  return (
    <Grid container>
      <Grid item xs={12} md={6}>
        <Select
          className={classes.selectField}
          fullWidth
          onChange={e =>
            dispatch({
              type: "field-change",
              field: "week",
              value: e.target.value
            })
          }
          value={state.week ? state.week : "none"}
        >
          <MenuItem value="none" disabled>
            Woche auswählen
          </MenuItem>
          {weeks.map((week, index) => (
            <MenuItem key={index} value={week}>
              {formatDate(new Date(week[0])) +
                " - " +
                formatDate(new Date(week[week.length - 1]))}
            </MenuItem>
          ))}
        </Select>
      </Grid>
    </Grid>
  );
};

export default CampPickWeek;

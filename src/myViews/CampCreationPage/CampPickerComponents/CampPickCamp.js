import React, { useContext, useEffect, useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import { Select, MenuItem, Grid } from "@material-ui/core/";
import { getCampsByTimeInterval } from "../../../APIUtils";
import CampCreationContext from "../CampCreationContext";
import campsStyle from "assets/jss/material-kit-pro-react/views/campsStyle.js";

const useStyles = makeStyles(campsStyle);

const CampPickCamp = () => {
  const classes = useStyles();

  const { state, dispatch } = useContext(CampCreationContext);
  const [campsArray, setCampsArray] = useState([]);

  useEffect(() => {
    (async () => {
      if (state.week.length !== 0) {
        const allCamps = await getCampsByTimeInterval(
          state.week[0],
          state.week[state.week.length - 1]
        );
        setCampsArray(allCamps);
        console.log(allCamps);
      }
    })();
  }, [state.week]);

  return (
    <Grid container>
      <Grid item xs={12} md={6}>
        <Select
          className={classes.selectField}
          fullWidth
          value={state.campMorning ? state.campMorning : "none"}
          onChange={e =>
            dispatch({
              type: "field-change",
              field: "campMorning",
              value: e.target.value
            })
          }
        >
          <MenuItem value="none" disabled>
            Vormittagsprogramm wählen
          </MenuItem>
          {campsArray.map((camp, idx) =>
            camp.dayTime === "morning" ? (
              <MenuItem key={idx} value={camp.id}>
                {camp.campName +
                  " | " +
                  (camp.maxParticipants - camp.totalParticipants) +
                  " freie Plätze"}
              </MenuItem>
            ) : null
          )}
        </Select>
      </Grid>

      <Grid item xs={12} md={6}>
        <Select
          className={classes.selectField}
          fullWidth
          value={state.campAfternoon ? state.campAfternoon : "none"}
          onChange={e =>
            dispatch({
              type: "field-change",
              field: "campAfternoon",
              value: e.target.value
            })
          }
        >
          <MenuItem value="none" disabled>
            Nachmittagsprogramm wählen
          </MenuItem>
          {campsArray.map((camp, idx) =>
            camp.dayTime === "afternoon" ? (
              <MenuItem key={idx} value={camp.id}>
                {camp.campName +
                  " | " +
                  (camp.maxParticipants - camp.totalParticipants) +
                  " freie Plätze"}
              </MenuItem>
            ) : null
          )}
        </Select>
      </Grid>
    </Grid>
  );
};

export default CampPickCamp;

import React, { useContext } from "react";
import { makeStyles } from "@material-ui/core/styles";
import { Select, MenuItem, Grid } from "@material-ui/core/";
import CustomInput from "components/CustomInput/CustomInput";
import CampCreationContext from "./CampCreationContext";
import campsStyle from "assets/jss/material-kit-pro-react/views/campsStyle.js";

const useStyles = makeStyles(campsStyle);

const allergenics = [
  "Gluten",
  "Krebstiere",
  "Eier",
  "Fisch",
  "Erdnüsse",
  "Soja",
  "Milch",
  "Schalenfrüchte",
  "Sellerie",
  "Senf",
  "Sesam",
  "Schwefeldioxid",
  "Lupinen",
  "Weichtiere, Muscheln, Tintenfisch"
];

const PickChildAllergies = () => {
  const classes = useStyles();
  const { state, dispatch } = useContext(CampCreationContext);

  return (
    <Grid container>
      <Grid item key="diseases-input-grid-item" xs={12} md={6}>
        <CustomInput
          id="diseases-input"
          value={state.diseases}
          labelText="Krankheiten/Allergien"
          onChange={e =>
            dispatch({
              type: "field-change",
              field: "diseases",
              value: e.target.value
            })
          }
        />
      </Grid>

      <Grid item key="measures-input-grid-item" xs={12} md={6}>
        <CustomInput
          id="measures-input"
          value={state.measures}
          labelText="Maßnahmen"
          onChange={e =>
            dispatch({
              type: "field-change",
              field: "measures",
              value: e.target.value
            })
          }
        />
      </Grid>
      <Grid item xs={12} md={6}>
        <Select
          className={classes.selectField}
          id="select-child-dropdown"
          value={state.allergies}
          multiple
          onChange={e =>
            dispatch({
              type: "field-change",
              field: "allergies",
              value: e.target.value
            })
          }
          fullWidth
        >
          <MenuItem value="none" disabled>
            Allergie auswählen
          </MenuItem>
          {allergenics.map(allergenic => (
            <MenuItem key={allergenic} value={allergenic}>
              {allergenic}
            </MenuItem>
          ))}
        </Select>
      </Grid>
    </Grid>
  );
};

export default PickChildAllergies;

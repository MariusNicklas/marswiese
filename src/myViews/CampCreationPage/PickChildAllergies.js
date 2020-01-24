import React from "react";
import { Select, MenuItem, Grid } from "@material-ui/core/";

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
  const [allergy, setAllergy] = React.useState([]);

  const handleChange = e => {
    setAllergy(e.target.value);
  };

  return (
    <Grid container>
      <Grid item xs={12} md={6}>
        <Select
          id="select-child-dropdown"
          value={allergy}
          multiple
          onChange={handleChange}
          fullWidth
        >
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

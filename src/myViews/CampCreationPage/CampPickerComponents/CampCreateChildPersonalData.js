import React, { useState } from "react";
import CustomInput from "components/CustomInput/CustomInput";
import { Grid } from "@material-ui/core";

const CampCreateChildPersonalData = () => {
  const [personalData, setPersonalData] = useState({
    Vorname: "",
    Nachname: "",
    Geburtstag: ""
  });

  const handleChange = e => {
    setPersonalData({ [e.target.key]: e.target.value });
  };

  return (
    <Grid container>
      {Object.keys(personalData).map(entry => (
        <Grid item key={entry} xs={12} md={6}>
          <CustomInput
            key={entry}
            value={personalData.entry}
            labelText={entry}
            onChange={handleChange}
          />
        </Grid>
      ))}
    </Grid>
  );
};

export default CampCreateChildPersonalData;

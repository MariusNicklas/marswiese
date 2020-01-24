import React, { useState } from "react";
import CustomInput from "components/CustomInput/CustomInput";
import { Grid } from "@material-ui/core";

const CampCreateChildPersonalData = () => {
  const [adressData, setAdressData] = useState({
    Notfallrufnummer: "",
    Straße: "",
    Postleitzahl: "",
    Stadt: ""
  });

  const handleChange = e => {
    setAdressData({ [e.target.key]: e.target.value });
  };

  return (
    <Grid container>
      {Object.keys(adressData).map(entry => (
        <Grid item key={entry} xs={12} md={6}>
          <CustomInput
            key={entry}
            value={adressData.entry}
            labelText={entry}
            onChange={handleChange}
          />
        </Grid>
      ))}
    </Grid>
  );
};

export default CampCreateChildPersonalData;

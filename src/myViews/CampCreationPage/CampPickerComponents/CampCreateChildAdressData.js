import React, { useContext } from "react";
import CustomInput from "components/CustomInput/CustomInput";
import { Grid } from "@material-ui/core";
import campCreationContext from "../CampCreationContext";

const CampCreateChildPersonalData = () => {
  const { state, dispatch } = useContext(campCreationContext);

  return (
    <Grid container>
      <Grid item key="address-input-grid-item" xs={12} md={6}>
        <CustomInput
          key="address-input"
          value={state.address}
          labelText="Adresse"
          onChange={e =>
            dispatch({
              type: "field-change",
              field: "address",
              value: e.target.value
            })
          }
        />
      </Grid>

      <Grid item key="zip-input-grid-item" xs={12} md={6}>
        <CustomInput
          key="zip-input"
          value={state.zip}
          labelText="Postleitzahl"
          onChange={e =>
            dispatch({
              type: "field-change",
              field: "zip",
              value: e.target.value
            })
          }
        />
      </Grid>

      <Grid item key="city-input-grid-item" xs={12} md={6}>
        <CustomInput
          key="city-input"
          value={state.city}
          labelText="Stadt"
          onChange={e =>
            dispatch({
              type: "field-change",
              field: "city",
              value: e.target.value
            })
          }
        />
      </Grid>

      <Grid item key="emergency-number-input-grid-item" xs={12} md={6}>
        <CustomInput
          id="emergency-number-input"
          value={state.emergencyNumber}
          labelText="Notfallrufnummer"
          onChange={e =>
            dispatch({
              type: "field-change",
              field: "emergencyNumber",
              value: e.target.value
            })
          }
        />
      </Grid>
    </Grid>
  );
};

export default CampCreateChildPersonalData;

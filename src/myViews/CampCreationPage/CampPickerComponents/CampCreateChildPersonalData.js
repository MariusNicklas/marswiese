import React, { useContext } from "react";
import CustomInput from "components/CustomInput/CustomInput";
import { Grid } from "@material-ui/core";
import campCreationContext from "../CampCreationContext";

const CampCreateChildPersonalData = () => {
  const { state, dispatch } = useContext(campCreationContext);

  return (
    <Grid container>
      <Grid item key="first-name-input-grid-item" xs={12} md={6}>
        <CustomInput
          id="first-name-input"
          value={state.firstName}
          labelText="Vorname"
          onChange={e =>
            dispatch({
              type: "field-change",
              field: "firstName",
              value: e.target.value
            })
          }
        />
      </Grid>

      <Grid item key="last-name-input-grid-item" xs={12} md={6}>
        <CustomInput
          id="last-name-input"
          value={state.lastName}
          labelText="Nachname"
          onChange={e =>
            dispatch({
              type: "field-change",
              field: "lastName",
              value: e.target.value
            })
          }
        />
      </Grid>
      <Grid item key="birthday-input-grid-item" xs={12} md={6}>
        <CustomInput
          id="birthday-input"
          value={state.birthday}
          labelText="Geburtstag"
          onChange={e =>
            dispatch({
              type: "field-change",
              field: "birthday",
              value: e.target.value
            })
          }
        />
      </Grid>
    </Grid>
  );
};

export default CampCreateChildPersonalData;
